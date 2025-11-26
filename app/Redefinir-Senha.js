import { ImageBackground, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import styles from "../assets/css/Styles";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

const image = require("../assets/background.jpg");

const RedefinirSenha = () => {
    
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { email, token } = useLocalSearchParams();

    const [fontsLoaded] = useFonts({
        Regular: require("../assets/fonts/Poppins-Medium.ttf"),
        Bold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    });

    // 📌 Função que redefine a senha
    const handleResetPassword = async () => {
        if (!senha || !confirmSenha)
            return alert("Erro: Preencha todos os campos!");

        if (senha.length < 6)
            return alert("Erro: A senha deve ter no mínimo 6 caracteres!");
        
        // ❌ você tinha usado "senhafield", que não existe → corrigi
        if (!/[A-Za-z]/.test(senha))
            return alert("A senha deve conter pelo menos uma letra.");

        if (!/[0-9]/.test(senha))
            return alert("A senha deve conter pelo menos um número.");

        if (senha !== confirmSenha)
            return alert("Erro: As senhas não coincidem!");

        try {
            const response = await api.post("/reset/reset-password", {
                email,
                token,
                newPassword: senha,
            });

            alert("Sucesso: " + (response.data.message || "Senha redefinida!"));
            router.push("/Redefinir-Final");

        } catch (error) {
            const msg = error.response?.data?.error || "Erro ao redefinir senha.";
            alert("Erro: " + msg);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={["left", "right"]}>
                <ImageBackground source={image} style={styles.image}>
                    <View style={styles.viewcontainer}>
                        <View style={styles.header}>
                            <Text style={styles.text}>Veasy</Text>
                        </View>

                        <View style={styles.forms}>
                            <Text style={styles.textocontainer}>Redefinir Senha{"\n"}</Text>

                            <Text style={styles.campos}>Nova Senha:</Text>
                            <TextInput
                                style={[styles.field, { paddingRight: 40 }]}
                                placeholder="Senha Super Segura"
                                placeholderTextColor="#ccc"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={!showSenha}
                            />
                            <TouchableOpacity
                                onPress={() => setShowSenha(!showSenha)}
                                style={{ alignSelf: "flex-end", marginTop: -36, marginRight: 10, padding: 6 }}
                            >
                                <Ionicons name={showSenha ? "eye-off" : "eye"} size={24} color="#ccc" />
                            </TouchableOpacity>

                            <Text style={styles.campos}>Confirmar Senha:</Text>
                            <TextInput
                                style={[styles.field, { paddingRight: 40 }]}
                                placeholder="Confirmar senha"
                                placeholderTextColor="#ccc"
                                value={confirmSenha}
                                onChangeText={setConfirmSenha}
                                secureTextEntry={!showConfirm}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirm(!showConfirm)}
                                style={{ alignSelf: "flex-end", marginTop: -36, marginRight: 10, padding: 6 }}
                            >
                                <Ionicons name={showConfirm ? "eye-off" : "eye"} size={24} color="#ccc" />
                            </TouchableOpacity>

                            {/* Botão Confirmar */}
                            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: "Regular",
                                        color: "white",
                                        textAlign: "center",
                                    }}
                                >
                                    Confirmar
                                </Text>
                            </TouchableOpacity>

                            {/* Voltar */}
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text
                                    style={{
                                        color: "white",
                                        fontFamily: "Bold",
                                        textAlign: "center",
                                        marginTop: 12,
                                        fontSize: 16,
                                    }}
                                >
                                    Voltar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default RedefinirSenha;
