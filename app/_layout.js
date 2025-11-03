// app/_layout.js
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="Redefinir-Email" options={{ headerShown: false }} />
      <Stack.Screen name="Redefinir-Codigo" options={{ headerShown: false }} />
      <Stack.Screen name="Redefinir-Senha" options={{ headerShown: false }} />
      <Stack.Screen name="Redefinir-Final" options={{ headerShown: false }} />
    </Stack>
  );
}