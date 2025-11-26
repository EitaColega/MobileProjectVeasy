import { ImageBackground, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import styles from "../assets/css/Styles";
import { router, useLocalSearchParams } from "expo-router";
import api from "../services/api";

const image = require("../assets/background.jpg");

const RedefinirCodigo = () => { 
    
    const [token, setToken] = useState("");
    const { email } = useLocalSearchParams(); 

    const [fontsLoaded] = useFonts({
        Regular: require("../assets/fonts/Poppins-Medium.ttf"),
        Bold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    });

    const handleVerifyCode = async () => {
        if (!token || token.length < 4) {
            return alert("Erro, Digite o código recebido no email!");
        }

        try {
            const response = await api.post("/reset/verify-code", {
                email,
                token: token,
            });

            alert("Sucesso " + response.data.message || "Código validado!");

            router.push({ pathname: "/Redefinir-Senha", params: { email, token } });

        } catch (error) {
            const msg = error.response?.data?.error || "Código inválido.";
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
                            <Text style={styles.textocontainer}>Redefinir Senha</Text>
                            
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: "Regular",
                                    color: "white",
                                    textAlign: "left",
                                    marginTop: 30,
                                    paddingLeft: 10,
                                }}
                            >
                                Enviamos um código de segurança para:
                                {"\n"}
                                <Text style={{ fontFamily: "Bold" }}>
                                    {email}
                                </Text>
                                {"\n"}Digite o código para continuar.
                            </Text>

                            {/* INPUT ACEITA SOMENTE NÚMEROS */}
                            <TextInput
                                style={styles.field}
                                placeholder="Código de 6 dígitos"
                                placeholderTextColor="#ccc"
                                value={token}
                                keyboardType="numeric"
                                maxLength={6}
                                onChangeText={(text) => {
                                    const numericOnly = text.replace(/[^0-9]/g, "");
                                    setToken(numericOnly);
                                }}
                            />

                            {/* Confirmar */}
                            <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
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
                                        marginTop: 15,
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

export default RedefinirCodigo;
