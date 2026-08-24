"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido (mín. 2 caracteres)"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: "Las contraseñas no coinciden",
  path: ["confirm"],
});

type RegisterForm = z.infer<typeof schema>;

export default function RegistroPage() {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-page)]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-lime)] to-[#3d7a1e] flex items-center justify-center text-white font-display text-2xl mx-auto mb-3">
            T
          </div>
          <h1 className="font-display text-2xl text-[var(--color-ink)]">Crear cuenta</h1>
          <p className="text-sm text-[var(--color-ink-soft)] mt-1">Terrarium Store</p>
        </div>

        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-6">
          <form
            onSubmit={handleSubmit((data) =>
              registerUser.mutateAsync({ name: data.name, email: data.email, password: data.password })
            )}
            className="flex flex-col gap-4"
          >
            <Input label="Nombre completo" placeholder="Ej. María García" error={errors.name?.message} {...register("name")} />
            <Input label="Email" type="email" placeholder="tu@email.com" error={errors.email?.message} {...register("email")} />
            <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" error={errors.password?.message} {...register("password")} />
            <Input label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña" error={errors.confirm?.message} {...register("confirm")} />
            {registerUser.error && (
              <p className="text-xs text-[var(--color-error)]">{registerUser.error.message}</p>
            )}
            <Button type="submit" variant="primary" size="md" loading={isSubmitting || registerUser.isPending} className="w-full mt-1">
              Crear cuenta
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--color-ink-soft)] mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-[var(--color-lime)] font-medium hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
