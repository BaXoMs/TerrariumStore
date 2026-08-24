"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "cliente" | "admin";
}

async function fetchCurrentUser(): Promise<SessionUser | null> {
  // Lee las cookies no-httpOnly para datos de UI
  if (typeof document === "undefined") return null;
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };
  const id = getCookie("user_id");
  const name = getCookie("user_name");
  const email = getCookie("user_email");
  const role = getCookie("user_role") as "cliente" | "admin" | null;
  if (!id || !email || !role || !name) return null;
  return { id, name, email, role };
}

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
  });

  const login = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? "Credenciales incorrectas");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      router.push("/catalogo");
    },
  });

  const register = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? "Error al registrarse");
      }
      return res.json();
    },
    onSuccess: () => router.push("/login?registered=1"),
  });

  const logout = useMutation({
    mutationFn: async () => {
      await fetch("/api/auth/logout", { method: "POST" });
    },
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
    },
  });

  return { user, isLoading, login, register, logout };
}
