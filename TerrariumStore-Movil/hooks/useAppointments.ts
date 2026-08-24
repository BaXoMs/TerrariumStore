"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Appointment } from "@/lib/types";
import { z } from "zod";

export const appointmentSchema = z.object({
  contact_name: z.string().min(2, "Nombre requerido"),
  contact_phone: z.string().min(10, "Teléfono inválido"),
  contact_email: z.string().email("Email inválido"),
  pet_name: z.string().min(1, "Nombre de mascota requerido"),
  species: z.string().min(1, "Especie requerida"),
  reason: z.string().min(10, "Describe brevemente el motivo (mín. 10 caracteres)"),
  scheduled_at: z.string().min(1, "Selecciona fecha y hora"),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

// Datos mock para desarrollo sin backend
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    contact_name: "María García",
    contact_phone: "2221234567",
    contact_email: "maria@example.com",
    pet_name: "Spike",
    species: "Dragón barbudo",
    reason: "Revisión general y control de peso",
    scheduled_at: new Date(Date.now() + 86400000).toISOString(),
    status: "pendiente",
    created_at: new Date().toISOString(),
  },
];

async function createAppointment(data: AppointmentFormData): Promise<Appointment> {
  try {
    return await api.post<Appointment>("/api/v1/appointments", data);
  } catch {
    // Mock: simula creación exitosa
    return {
      ...data,
      id: `apt-${Date.now()}`,
      status: "pendiente",
      created_at: new Date().toISOString(),
      user_id: undefined,
    };
  }
}

async function fetchMyAppointments(): Promise<Appointment[]> {
  try {
    return await api.get<Appointment[]>("/api/v1/appointments/me");
  } catch {
    return MOCK_APPOINTMENTS;
  }
}

async function fetchAllAppointments(): Promise<Appointment[]> {
  try {
    return await api.get<Appointment[]>("/api/v1/admin/appointments");
  } catch {
    return MOCK_APPOINTMENTS;
  }
}

async function updateAppointmentStatus(
  id: string,
  status: Appointment["status"]
): Promise<Appointment> {
  return api.patch<Appointment>(`/api/v1/admin/appointments/${id}/status`, { status });
}

async function cancelAppointment(id: string): Promise<void> {
  try {
    await api.patch(`/api/v1/appointments/${id}/cancel`, {});
  } catch {
    // silencioso en mock
  }
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });
}

export function useMyAppointments() {
  return useQuery({
    queryKey: ["appointments", "me"],
    queryFn: fetchMyAppointments,
    staleTime: 60 * 1000,
  });
}

export function useAllAppointments() {
  return useQuery({
    queryKey: ["appointments", "all"],
    queryFn: fetchAllAppointments,
    staleTime: 30 * 1000,
  });
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Appointment["status"] }) =>
      updateAppointmentStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments", "me"] }),
  });
}
