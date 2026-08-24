import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type UserRole = "cliente" | "admin";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/**
 * Lee la sesión en Server Components desde las cookies httpOnly.
 * Devuelve null si no hay token.
 */
export async function getServerSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const role = cookieStore.get("user_role")?.value as UserRole | undefined;
  const name = cookieStore.get("user_name")?.value;
  const email = cookieStore.get("user_email")?.value;
  const id = cookieStore.get("user_id")?.value;

  if (!token || !role || !email || !id || !name) return null;

  return { id, name, email, role };
}

/**
 * Redirige a /login si no hay sesión o el rol no coincide.
 * Usar al inicio de Server Components protegidos.
 */
export async function requireSession(requiredRole?: UserRole): Promise<SessionUser> {
  const session = await getServerSession();
  if (!session) redirect("/login");
  if (requiredRole && session.role !== requiredRole) redirect("/login");
  return session;
}
