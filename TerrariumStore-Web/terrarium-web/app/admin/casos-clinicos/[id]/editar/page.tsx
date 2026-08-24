import Link from "next/link";
export default function EditarCasoPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-1">Editar caso clínico</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6">ID: {params.id}</p>
      <p className="text-sm text-[var(--color-ink-soft)]">Cargando datos del caso...</p>
      <div className="mt-4">
        <Link href="/admin/casos-clinicos" className="text-sm text-[var(--color-lime)] hover:underline">← Volver a casos clínicos</Link>
      </div>
    </div>
  );
}
