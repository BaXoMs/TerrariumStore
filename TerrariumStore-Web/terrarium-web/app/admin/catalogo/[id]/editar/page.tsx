import Link from "next/link";
export default function EditarAnimalPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-1">Editar animal</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6">ID: {params.id}</p>
      <p className="text-sm text-[var(--color-ink-soft)]">Cargando datos del animal...</p>
      <div className="mt-4">
        <Link href="/admin/catalogo" className="text-sm text-[var(--color-lime)] hover:underline">← Volver al catálogo</Link>
      </div>
    </div>
  );
}
