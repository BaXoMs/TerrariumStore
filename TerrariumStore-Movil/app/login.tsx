import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { control, handleSubmit } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = (data: any) => login.mutate(data);

  return (
    <View className="flex-1 bg-page p-6 pt-20">
      <Text className="font-display text-3xl text-ink mb-2">Bienvenido</Text>
      <Text className="font-body text-ink-soft mb-8">Inicia sesión en Terrarium Store</Text>

      <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
        <Input label="Correo electrónico" autoCapitalize="none" keyboardType="email-address" onChangeText={onChange} value={value} />
      )} />

      <Controller control={control} name="password" render={({ field: { onChange, value } }) => (
        <Input label="Contraseña" secureTextEntry onChangeText={onChange} value={value} />
      )} />

      <Button variant="primary" loading={login.isPending} onPress={handleSubmit(onSubmit)} className="mt-4">
        Ingresar
      </Button>

      <Button variant="ghost" className="mt-4" onPress={() => router.back()}>
        Volver
      </Button>
    </View>
  );
}
