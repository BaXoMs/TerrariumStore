import React from "react";
import { View, Text, ScrollView, Image, ActivityIndicator, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useCatalog } from "../../hooks/useCatalog";
import { Button } from "../../components/ui/Button";
import { CareLevelBadge, StockBadge } from "../../components/ui/Badge";
import { generateWhatsAppLink } from "../../lib/whatsapp";

export default function AnimalDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: animals, isLoading } = useCatalog();
  
  if (isLoading) return <View className="flex-1 bg-page justify-center items-center"><ActivityIndicator color="#5FA832" /></View>;
  
  const animal = animals?.find((a) => a.id === id);
  if (!animal) return <View className="flex-1 bg-page justify-center items-center"><Text className="text-ink">No encontrado</Text></View>;

  const handleWhatsApp = () => {
    const url = generateWhatsAppLink(animal, `Hola Terrarium Store, me interesa apartar a ${animal.common_name}.`);
    Linking.openURL(url).catch(() => alert("No se pudo abrir WhatsApp"));
  };

  return (
    <View className="flex-1 bg-page">
      <ScrollView className="flex-1" bounces={false}>
        <View className="relative w-full h-72 bg-line">
          <Image source={{ uri: animal.image_url }} className="w-full h-full object-cover" />
          <View className="absolute top-12 left-4">
            <Button variant="secondary" size="sm" className="bg-paper/80 border-0 rounded-full w-10 h-10 p-0 items-center justify-center" onPress={() => router.back()}>
              <ChevronLeft color="#1F2320" />
            </Button>
          </View>
        </View>

        <View className="p-6">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1">
              <Text className="font-display text-3xl text-ink leading-tight">{animal.common_name}</Text>
              <Text className="font-body text-base text-ink-soft italic">{animal.scientific_name}</Text>
            </View>
            <Text className="font-display text-2xl text-lime">${animal.price}</Text>
          </View>

          <View className="flex-row space-x-2 my-4">
            <CareLevelBadge level={animal.care_level} />
            <StockBadge stock={animal.stock} />
            <View className="bg-paper border border-line px-2 py-0.5 rounded-full">
               <Text className="font-mono text-[10px] uppercase text-ink-soft">{animal.category}</Text>
            </View>
          </View>

          <Text className="font-body font-semibold text-ink text-lg mt-4 mb-2">Descripción</Text>
          <Text className="font-body text-ink-soft leading-relaxed">{animal.description}</Text>
        </View>
      </ScrollView>

      <View className="p-4 bg-paper border-t border-line">
        <Button variant="whatsapp" size="lg" onPress={handleWhatsApp} disabled={animal.stock === 0}>
          {animal.stock > 0 ? "Apartar por WhatsApp" : "Agotado Temporalmente"}
        </Button>
      </View>
    </View>
  );
}
