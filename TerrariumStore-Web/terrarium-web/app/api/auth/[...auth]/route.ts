import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Proxy de auth — maneja login, logout y refresh de tokens.
 * Setea las cookies httpOnly para que el JS del cliente nunca vea los JWTs.
 *
 * POST /api/auth/login   → llama FastAPI /api/v1/auth/login
 * POST /api/auth/logout  → limpia cookies
 * POST /api/auth/refresh → renueva access_token
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ auth: string[] }> }
) {
  const { auth } = await params;
  const action = auth?.[0];
  const body = await request.json().catch(() => ({}));

  if (action === "login") {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Error de autenticación" }));
      return NextResponse.json(err, { status: res.status });
    }

    const data = await res.json();
    const response = NextResponse.json({ ok: true });

    // Seteamos los tokens como cookies httpOnly
    response.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60, // 15 min
    });
    response.cookies.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 días
    });
    // Cookies no-httpOnly para que el middleware pueda leer el rol
    response.cookies.set("user_role", data.user.role, { path: "/", maxAge: 30 * 24 * 60 * 60 });
    response.cookies.set("user_name", data.user.name, { path: "/", maxAge: 30 * 24 * 60 * 60 });
    response.cookies.set("user_email", data.user.email, { path: "/", maxAge: 30 * 24 * 60 * 60 });
    response.cookies.set("user_id", data.user.id, { path: "/", maxAge: 30 * 24 * 60 * 60 });

    return response;
  }

  if (action === "logout") {
    const response = NextResponse.json({ ok: true });
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("user_role");
    response.cookies.delete("user_name");
    response.cookies.delete("user_email");
    response.cookies.delete("user_id");
    return response;
  }

  if (action === "register") {
    const res = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  }

  if (action === "refresh") {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    if (!refreshToken) return NextResponse.json({ detail: "No hay refresh token" }, { status: 401 });

    const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) return NextResponse.json({ detail: "Token expirado" }, { status: 401 });

    const data = await res.json();
    const response = NextResponse.json({ ok: true });
    response.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });
    return response;
  }

  return NextResponse.json({ detail: "Acción no encontrada" }, { status: 404 });
}
