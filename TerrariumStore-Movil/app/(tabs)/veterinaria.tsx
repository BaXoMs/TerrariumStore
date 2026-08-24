import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/ui/Button";
import { ClinicalStampBadge } from "../../components/ui/ClinicalStampBadge";

export default function VeterinariaScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-page" contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 40 }}>
      <View className="items-center mb-8">
        <ClinicalStampBadge size="lg" className="mb-6" />
        <Text className="font-display text-3xl text-ink text-center mb-2">Clínica Especializada</Text>
        <Text className="font-body text-base text-ink-soft text-center">
          Atención veterinaria experta para reptiles, anfibios y exóticos. Nuestro equipo está preparado para casos complejos.
        </Text>
      </View>

      <View className="bg-paper p-6 rounded-md border border-line mb-6">
        <Text className="font-body font-semibold text-ink mb-2">Nuestros Servicios</Text>
        <View className="pl-4 mb-4">
          <Text className="font-body text-ink-soft mb-1">• Consultas preventivas y Check-ups</Text>
          <Text className="font-body text-ink-soft mb-1">• Cirugías especializadas</Text>
          <Text className="font-body text-ink-soft mb-1">• Hospitalización clínica</Text>
          <Text className="font-body text-ink-soft">• Diagnóstico por imagen (Rayos X y Eco)</Text>
        </View>
        <Button variant="danger" onPress={() => router.push("/veterinaria/agendar")}>
          Agendar Cita
        </Button>
      </View>
    </ScrollView>
  );
}
