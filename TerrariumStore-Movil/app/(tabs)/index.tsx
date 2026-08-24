import React from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useCatalog } from "../../hooks/useCatalog";
import { Card } from "../../components/ui/Card";
import { StockBadge } from "../../components/ui/Badge";
import { Animal } from "../../lib/types";

export default function TiendaScreen() {
  const { data: animals, isLoading, error } = useCatalog();
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-page">
        <ActivityIndicator size="large" color="#5FA832" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-page px-4">
        <Text className="font-body text-vet text-center">Hubo un error cargando el catálogo.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Animal }) => (
    <View className="w-1/2 p-2">
      <Pressable onPress={() => router.push(`/tienda/${item.id}`)} className="active:opacity-80">
        <Card className="h-full">
          <View className="h-32 bg-line w-full relative">
             <Image source={{ uri: item.image_url }} className="w-full h-full object-cover" />
             <View className="absolute top-2 right-2">
               <StockBadge stock={item.stock} />
             </View>
          </View>
          <View className="p-3">
            <Text className="font-display text-lg text-ink" numberOfLines={1}>{item.common_name}</Text>
            <Text className="font-body text-xs text-ink-soft italic mb-2" numberOfLines={1}>{item.scientific_name}</Text>
            <Text className="font-body font-semibold text-lime">${item.price}</Text>
          </View>
        </Card>
      </Pressable>
    </View>
  );

  return (
    <View className="flex-1 bg-page pt-10">
      <View className="px-4 pb-4">
        <Text className="font-display text-2xl text-ink">Catálogo</Text>
        <Text className="font-body text-sm text-ink-soft">Encuentra el exótico perfecto para ti.</Text>
      </View>
      <FlatList
        data={animals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 24 }}
      />
    </View>
  );
}
