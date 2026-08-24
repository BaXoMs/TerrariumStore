"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const schema = z.object({
  title: z.string().min(1, "Título requerido"),
  species: z.string().min(1, "Especie requerida"),
  scientific_name: z.string().min(1, "Nombre científico requerido"),
  summary: z.string().min(20, "Resumen mínimo 20 caracteres"),
  body: z.string().min(100, "Contenido mínimo 100 caracteres"),
  source: z.string().optional(),
  tags: z.string().optional(),
});
type CaseForm = z.infer<typeof schema>;

export default function NuevoCasoPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CaseForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: CaseForm) => {
    try {
      await api.post("/api/v1/admin/clinical-cases", {
        ...data,
        tags: data.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [],
      });
      router.push("/admin/casos-clinicos");
    } catch (e: unknown) {
      alert("Error: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-1">Nuevo caso clínico</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6">El contenido se formateará automáticamente con las reglas de marca.</p>

      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input label="Título" placeholder="Ej. Metabolic Bone Disease en Pogona vitticeps" error={errors.title?.message} {...register("title")} />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Especie (nombre común)" placeholder="Ej. Dragón Barbudo" error={errors.species?.message} {...register("species")} />
            <Input label="Nombre científico" placeholder="Ej. Pogona vitticeps" error={errors.scientific_name?.message} {...register("scientific_name")} />
          </div>

          <Textarea label="Resumen" placeholder="Breve descripción del caso para el listado..." error={errors.summary?.message} {...register("summary")} />
          <Textarea
            label="Contenido completo (Markdown)"
            placeholder="**Presentación**&#10;...&#10;&#10;**Diagnóstico**&#10;...&#10;&#10;**Tratamiento**&#10;..."
            error={errors.body?.message}
            className="min-h-[200px] font-mono text-xs"
            rows={10}
            {...register("body")}
          />

          <Input label="Referencia bibliográfica" placeholder="Ej. Manual MSD Veterinary, 2022" error={errors.source?.message} {...register("source")} />
          <Input label="Etiquetas (separadas por coma)" placeholder="nutrición, pogona, MBD" {...register("tags")} />

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="danger" size="md" loading={isSubmitting}>Publicar caso</Button>
            <Button type="button" variant="secondary" size="md" href="/admin/casos-clinicos" as="a">Cancelar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
