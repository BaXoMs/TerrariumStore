"use client";

import { useAllAppointments, useUpdateAppointmentStatus } from "@/hooks/useAppointments";
import type { Appointment } from "@/lib/types";

const STATUS_LABELS: Record<Appointment["status"], string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
  completada: "Completada",
};

const STATUS_COLORS: Record<Appointment["status"], string> = {
  pendiente:  "text-[var(--color-bamboo)] bg-[var(--color-bamboo-soft)]",
  confirmada: "text-[var(--color-lime)] bg-[var(--color-lime-soft)]",
  cancelada:  "text-[var(--color-vet)] bg-[var(--color-vet-soft)]",
  completada: "text-[var(--color-ink-soft)] bg-[var(--color-line)]",
};

const NEXT_STATUS: Partial<Record<Appointment["status"], { label: string; value: Appointment["status"] }[]>> = {
  pendiente:  [{ label: "Confirmar", value: "confirmada" }, { label: "Cancelar", value: "cancelada" }],
  confirmada: [{ label: "Completar", value: "completada" }, { label: "Cancelar", value: "cancelada" }],
};

export default function CitasAdminPage() {
  const { data: appointments = [], isLoading } = useAllAppointments();
  const updateStatus = useUpdateAppointmentStatus();

  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-1">Agenda de citas</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6">Gestión de todas las citas veterinarias</p>

      {isLoading ? (
        <div className="text-center py-12 text-[var(--color-ink-soft)]">Cargando...</div>
      ) : (
        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] bg-[var(--color-page)]">
                {["Paciente", "Mascota / Especie", "Fecha", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-soft)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-line)]">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-[var(--color-page)] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--color-ink)]">{apt.contact_name}</p>
                    <p className="text-xs text-[var(--color-ink-soft)]">{apt.contact_phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[var(--color-ink)]">{apt.pet_name}</p>
                    <p className="text-xs text-[var(--color-ink-soft)]">{apt.species}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-ink)]">
                    {new Date(apt.scheduled_at).toLocaleDateString("es-MX", {
                      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[apt.status]}`}>
                      {STATUS_LABELS[apt.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {NEXT_STATUS[apt.status]?.map((action) => (
                        <button
                          key={action.value}
                          id={`apt-${apt.id}-${action.value}`}
                          onClick={() => updateStatus.mutate({ id: apt.id, status: action.value })}
                          disabled={updateStatus.isPending}
                          className="text-xs px-2 py-1 rounded border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-lime)] hover:text-[var(--color-lime)] transition-colors disabled:opacity-50"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <p className="text-center py-12 text-[var(--color-ink-soft)] text-sm">No hay citas registradas.</p>
          )}
        </div>
      )}
    </div>
  );
}
