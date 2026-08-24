import type { Metadata } from "next";
import { AppointmentForm } from "@/components/catalog/AppointmentForm";

export const metadata: Metadata = {
  title: "Agendar Cita Veterinaria | Terrarium Store",
  description: "Agenda tu cita veterinaria para reptiles y animales exóticos en Puebla.",
};

export default function AgendarPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-vet)]">
        Veterinaria
      </span>
      <h1 className="font-display text-3xl text-[var(--color-ink)] mt-2 mb-1">Agendar cita</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-8">
        Completa el formulario y nos pondremos en contacto para confirmar. No se requiere cuenta.
      </p>
      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-6">
        <AppointmentForm />
      </div>
    </div>
  );
}
