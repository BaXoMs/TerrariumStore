import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function PerfilScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("access_token").then(t => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  if (loading) return <View className="flex-1 bg-page justify-center items-center"><ActivityIndicator color="#5FA832" /></View>;

  if (!token) {
    return (
      <View className="flex-1 bg-page items-center justify-center p-6">
        <Text className="font-display text-2xl text-ink mb-2">Ingresa a tu cuenta</Text>
        <Text className="font-body text-center text-ink-soft mb-8">
          Inicia sesión para gestionar tus favoritos, ver tu historial de citas veterinarias y configurar tus notificaciones.
        </Text>
        <View className="w-full space-y-4">
          <Button variant="primary" onPress={() => router.push("/login")}>Iniciar Sesión</Button>
          <View className="h-4" />
          <Button variant="secondary" onPress={() => router.push("/registro")}>Crear Cuenta</Button>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-page p-6 pt-16">
      <Text className="font-display text-2xl text-ink mb-6">Mi Perfil</Text>
      
      <View className="bg-paper p-4 rounded-md border border-line mb-6">
        <Text className="font-body text-ink font-semibold">Tus Mascotas</Text>
        <Text className="font-body text-ink-soft text-sm mt-1">Aún no has registrado mascotas. Se sincronizarán tras tu primera cita.</Text>
      </View>

      <Button variant="secondary" loading={logout.isPending} onPress={() => logout.mutate()}>
        Cerrar Sesión
      </Button>
    </View>
  );
}
