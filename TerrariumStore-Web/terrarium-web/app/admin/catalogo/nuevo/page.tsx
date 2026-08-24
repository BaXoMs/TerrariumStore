"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

const schema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  scientific_name: z.string().min(1, "Nombre científico requerido"),
  category_id: z.string().min(1, "Categoría requerida"),
  description: z.string().min(10, "Descripción requerida"),
  care_level: z.enum(["básico", "intermedio", "avanzado"]),
  price: z.coerce.number().min(1, "Precio requerido"),
  stock: z.coerce.number().min(0, "Stock requerido"),
});
type AnimalForm = z.infer<typeof schema>;

export default function NuevoAnimalPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AnimalForm>({
    resolver: zodResolver(schema) as any,
    defaultValues: { care_level: "básico", stock: 0 },
  });

  const onSubmit = async (data: AnimalForm) => {
    try {
      await api.post("/api/v1/admin/animals", data);
      router.push("/admin/catalogo");
    } catch (e: unknown) {
      alert("Error al crear animal: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-1">Agregar animal</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6">Nuevo animal al catálogo</p>

      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Nombre común" placeholder="Ej. Dragón Barbudo" error={errors.name?.message} {...register("name")} />
            <Input label="Nombre científico" placeholder="Ej. Pogona vitticeps" error={errors.scientific_name?.message} {...register("scientific_name")} />
          </div>

          <Input label="Categoría ID" placeholder="ID de categoría" error={errors.category_id?.message} {...register("category_id")} />

          <div>
            <label className="text-sm font-body font-medium text-[var(--color-ink)] block mb-1">Nivel de cuidado</label>
            <select
              {...register("care_level")}
              className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--color-line)] text-sm font-body bg-[var(--color-paper)] focus:outline-none focus:ring-2 focus:ring-[var(--color-lime)]"
            >
              <option value="básico">Básico</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Precio (MXN)" type="number" placeholder="1500" error={errors.price?.message} {...register("price")} />
            <Input label="Stock" type="number" placeholder="0" error={errors.stock?.message} {...register("stock")} />
          </div>

          <Textarea label="Descripción" placeholder="Describe el animal, su origen, temperamento y cuidados básicos..." error={errors.description?.message} {...register("description")} />

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" size="md" loading={isSubmitting}>Guardar</Button>
            <Button type="button" variant="secondary" size="md" href="/admin/catalogo" as="a">Cancelar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
