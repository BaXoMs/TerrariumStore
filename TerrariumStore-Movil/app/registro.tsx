import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function RegistroScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const { control, handleSubmit } = useForm({ defaultValues: { name: "", email: "", password: "" } });

  const onSubmit = (data: any) => register.mutate(data);

  return (
    <ScrollView className="flex-1 bg-page p-6 pt-20">
      <Text className="font-display text-3xl text-ink mb-2">Crear Cuenta</Text>
      <Text className="font-body text-ink-soft mb-8">Únete a la comunidad de Terrarium Store</Text>

      <Controller control={control} name="name" render={({ field: { onChange, value } }) => (
        <Input label="Nombre completo" onChangeText={onChange} value={value} />
      )} />

      <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
        <Input label="Correo electrónico" autoCapitalize="none" keyboardType="email-address" onChangeText={onChange} value={value} />
      )} />

      <Controller control={control} name="password" render={({ field: { onChange, value } }) => (
        <Input label="Contraseña" secureTextEntry onChangeText={onChange} value={value} />
      )} />

      <Button variant="primary" loading={register.isPending} onPress={handleSubmit(onSubmit)} className="mt-4">
        Registrarse
      </Button>

      <Button variant="ghost" className="mt-4" onPress={() => router.back()}>
        Ya tengo cuenta
      </Button>
    </ScrollView>
  );
}
