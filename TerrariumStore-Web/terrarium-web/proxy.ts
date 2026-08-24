import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATHS = ["/dashboard", "/admin"];
const CLIENT_PATHS = ["/perfil", "/mis-mascotas", "/mis-citas", "/favoritos"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("user_role")?.value;

  // Rutas de administración
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Rutas de cliente autenticado
  if (CLIENT_PATHS.some((p) => pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/perfil/:path*",
    "/mis-mascotas/:path*",
    "/mis-citas/:path*",
    "/favoritos/:path*",
  ],
};
