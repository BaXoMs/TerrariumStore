"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useCreateAppointment, appointmentSchema, type AppointmentFormData } from "@/hooks/useAppointments";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string>("");
  const createAppointment = useCreateAppointment();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    const result = await createAppointment.mutateAsync(data);
    setAppointmentId(result.id);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[var(--color-lime-soft)] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} color="var(--color-lime)" />
        </div>
        <h2 className="font-display text-2xl text-[var(--color-ink)] mb-2">¡Cita registrada!</h2>
        <p className="text-sm text-[var(--color-ink-soft)] mb-1">
          Número de cita: <span className="font-mono font-semibold text-[var(--color-ink)]">{appointmentId}</span>
        </p>
        <p className="text-sm text-[var(--color-ink-soft)] max-w-md mx-auto mt-3">
          Nos pondremos en contacto para confirmar la fecha y hora. También puedes escribirnos por WhatsApp.
        </p>
        <Button
          variant="secondary"
          size="md"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Agendar otra cita
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Tu nombre completo"
          placeholder="Ej. María García"
          error={errors.contact_name?.message}
          {...register("contact_name")}
        />
        <Input
          label="Teléfono"
          type="tel"
          placeholder="Ej. 2221234567"
          error={errors.contact_phone?.message}
          {...register("contact_phone")}
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        error={errors.contact_email?.message}
        {...register("contact_email")}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Nombre de tu mascota"
          placeholder="Ej. Spike"
          error={errors.pet_name?.message}
          {...register("pet_name")}
        />
        <Input
          label="Especie"
          placeholder="Ej. Dragón barbudo"
          error={errors.species?.message}
          {...register("species")}
        />
      </div>

      <Textarea
        label="Motivo de consulta"
        placeholder="Describe brevemente los síntomas o el motivo de la visita..."
        error={errors.reason?.message}
        {...register("reason")}
      />

      <Input
        label="Fecha y hora preferida"
        type="datetime-local"
        error={errors.scheduled_at?.message}
        {...register("scheduled_at")}
      />

      {createAppointment.error && (
        <p className="text-sm text-[var(--color-error)] bg-red-50 border border-red-200 rounded-[var(--radius-sm)] px-3 py-2">
          {createAppointment.error.message}
        </p>
      )}

      <Button
        type="submit"
        variant="danger"
        size="lg"
        loading={isSubmitting || createAppointment.isPending}
        className="w-full sm:w-auto"
      >
        Confirmar cita
      </Button>
    </form>
  );
}
