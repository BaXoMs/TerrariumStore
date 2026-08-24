import React from "react";
import { View, Text } from "react-native";
import { Heart } from "lucide-react-native";

export default function FavoritosScreen() {
  return (
    <View className="flex-1 bg-page items-center justify-center p-6">
      <Heart color="#D87A29" size={48} className="mb-4" />
      <Text className="font-display text-2xl text-ink text-center mb-2">Tus Favoritos</Text>
      <Text className="font-body text-base text-ink-soft text-center">
        Aún no has guardado ningún animal. Explora la tienda y guárdalos para revisarlos más tarde.
      </Text>
    </View>
  );
}
