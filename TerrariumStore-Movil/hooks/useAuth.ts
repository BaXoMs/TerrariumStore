import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { api } from "../lib/api";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const login = useMutation({
    mutationFn: async (credentials: any) => {
      // Mock: Simulamos auth
      await new Promise(r => setTimeout(r, 800));
      if (!credentials.email || !credentials.password) throw new Error("Credenciales inválidas");
      return { access_token: "mock_token_mobile", role: "user" };
    },
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("access_token", data.access_token);
      await SecureStore.setItemAsync("user_role", data.role);
      queryClient.clear();
      router.replace("/(tabs)/perfil");
    },
  });

  const register = useMutation({
    mutationFn: async (userData: any) => {
      // Mock
      await new Promise(r => setTimeout(r, 800));
      return { access_token: "mock_token_mobile", role: "user" };
    },
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("access_token", data.access_token);
      await SecureStore.setItemAsync("user_role", data.role);
      queryClient.clear();
      router.replace("/(tabs)/perfil");
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("user_role");
    },
    onSuccess: () => {
      queryClient.clear();
      router.replace("/");
    },
  });

  return { login, register, logout };
}
