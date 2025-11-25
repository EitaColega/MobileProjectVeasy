// app/_layout.js
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="Register" />
      <Stack.Screen name="Redefinir-Email" />
      <Stack.Screen name="Redefinir-Codigo" />
      <Stack.Screen name="Redefinir-Senha" />
      <Stack.Screen name="Redefinir-Final" />
      <Stack.Screen name="HomePlayer" />
      <Stack.Screen name="HomeDecker" />
      <Stack.Screen name="Options" />
      <Stack.Screen name="RegisterId" />
    </Stack>
  );
}
