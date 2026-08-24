"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});
type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-page)]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-lime)] to-[#3d7a1e] flex items-center justify-center text-white font-display text-2xl mx-auto mb-3">
            T
          </div>
          <h1 className="font-display text-2xl text-[var(--color-ink)]">Iniciar sesión</h1>
          <p className="text-sm text-[var(--color-ink-soft)] mt-1">Terrarium Store</p>
        </div>

        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-6">
          <form onSubmit={handleSubmit((data) => login.mutateAsync(data))} className="flex flex-col gap-4">
            <Input label="Email" type="email" placeholder="tu@email.com" error={errors.email?.message} {...register("email")} />
            <Input label="Contraseña" type="password" placeholder="••••••••" error={errors.password?.message} {...register("password")} />
            {login.error && (
              <p className="text-xs text-[var(--color-error)]">{login.error.message}</p>
            )}
            <Button type="submit" variant="primary" size="md" loading={isSubmitting || login.isPending} className="w-full mt-1">
              Entrar
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--color-ink-soft)] mt-4">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-[var(--color-lime)] font-medium hover:underline">Regístrate</Link>
        </p>
        <p className="text-center text-sm text-[var(--color-ink-soft)] mt-2">
          <Link href="/" className="hover:underline">← Volver al sitio</Link>
        </p>
      </div>
    </div>
  );
}
