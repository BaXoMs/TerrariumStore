import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft } from "lucide-react-native";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";

const schema = z.object({
  patient_name: z.string().min(2, "Obligatorio"),
  species: z.string().min(2, "Obligatorio"),
  reason: z.string().min(5, "Obligatorio"),
});
type FormValues = z.infer<typeof schema>;

export default function AgendarScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    Alert.alert("Solicitud Enviada", "Te contactaremos pronto para confirmar el horario.");
    router.replace("/(tabs)/veterinaria");
  };

  return (
    <View className="flex-1 bg-page">
      <View className="flex-row items-center p-4 pt-12 bg-paper border-b border-line">
        <Button variant="ghost" size="sm" className="mr-2" onPress={() => router.back()}>
          <ChevronLeft color="#1F2320" />
        </Button>
        <Text className="font-display text-xl text-ink">Agendar Cita</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <Text className="font-body text-ink-soft mb-6">Completa los datos de tu exótico para solicitar un espacio clínico.</Text>

        <Controller
          control={control}
          name="patient_name"
          render={({ field: { onChange, value } }) => (
            <Input label="Nombre del paciente" placeholder="Ej. Godzilla" onChangeText={onChange} value={value} error={errors.patient_name?.message} />
          )}
        />

        <Controller
          control={control}
          name="species"
          render={({ field: { onChange, value } }) => (
            <Input label="Especie" placeholder="Ej. Dragón Barbudo" onChangeText={onChange} value={value} error={errors.species?.message} />
          )}
        />

        <Controller
          control={control}
          name="reason"
          render={({ field: { onChange, value } }) => (
            <Textarea label="Motivo de la consulta" placeholder="Describe los síntomas brevemente" onChangeText={onChange} value={value} error={errors.reason?.message} />
          )}
        />

        <Button variant="primary" size="lg" className="mt-4" onPress={handleSubmit(onSubmit)}>
          Solicitar Espacio
        </Button>
      </ScrollView>
    </View>
  );
}
