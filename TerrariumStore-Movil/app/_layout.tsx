import { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { FjallaOne_400Regular } from "@expo-google-fonts/fjalla-one";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { View, ActivityIndicator } from "react-native";

// Previene que el splash se oculte antes de cargar las fuentes
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "FjallaOne-Regular": FjallaOne_400Regular,
    "JetBrainsMono-Regular": JetBrainsMono_400Regular,
    "JetBrainsMono-Bold": JetBrainsMono_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-page">
        <ActivityIndicator size="large" color="#5FA832" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#F7F4EC" } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="tienda/[id]" />
        <Stack.Screen name="veterinaria/agendar" />
        <Stack.Screen name="login" />
        <Stack.Screen name="registro" />
      </Stack>
    </QueryClientProvider>
  );
}
