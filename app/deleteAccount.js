import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      Alert.alert("Erro", "Digite sua senha.");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const res = await fetch("http://SEU_BACKEND/usuarios/delete-with-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Erro", data.error || "Não foi possível deletar.");
        return;
      }

      // limpar token e logout
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("playerPhoto");

      Alert.alert("Conta excluída", "Sua conta foi removida.", [
        { text: "OK", onPress: () => (window.location.href = "/") },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao tentar excluir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A1A", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Deletar Conta
      </Text>

      <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
        Digite sua senha para confirmar:
      </Text>

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "#333",
          padding: 15,
          borderRadius: 8,
          color: "white",
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleDelete}
        disabled={loading}
        style={{
          backgroundColor: "#B00020",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {loading ? "Excluindo..." : "Excluir minha conta"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
