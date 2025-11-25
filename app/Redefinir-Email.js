import { ImageBackground, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { router } from 'expo-router';
import api from '../services/api'; // 👈 IMPORTANTE

const image = require('../assets/background.jpg');

const RedefinirEmail = () => {
    useEffect(() => {
        document.title = "Redefinir Email";
    }, []);
    
    const [email, setEmail] = useState('');

    const [fontsLoaded] = useFonts({
        Regular: require('../assets/fonts/Poppins-Medium.ttf'),
        Bold: require('../assets/fonts/Poppins-ExtraBold.ttf')
    });

    // 📌 Função de envio
    const handleSendCode = async () => {
        if (!email || !email.includes("@")) {
            return alert("Erro, Digite um email válido!");
        }
        console.log("hiii")
        try {
            const response = await api.post("/reset/forgot-password", { email });

            alert("Sucesso " + response.data.message || "Código enviado!");
            router.push({ pathname: "/Redefinir-Codigo", params: { email } }); // 👉 Vai para a próxima tela

        } catch (error) {
            const msg = error.response?.data?.error || "Erro ao enviar email.";
            alert("Erro: " + msg);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ImageBackground source={image} style={styles.image}>
                    <View style={styles.viewcontainer}>

                        <View style={styles.header}>
                            <Text style={styles.text}>Veasy</Text>
                        </View>

                        <View style={styles.forms}>
                            <Text style={styles.textocontainer}>Redefinir Senha</Text>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Regular',
                                color: 'white',
                                textAlign: 'left',
                                marginTop: 30,
                                paddingLeft: 10,
                            }}>
                                Digite o email usado na criação da conta para receber o código de segurança.
                            </Text>

                            <Text style={styles.campos}> Email: </Text>
                            <TextInput
                                style={styles.field}
                                placeholder="SeuEmail@email.com"
                                placeholderTextColor="#ccc"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            {/* BOTÃO DE ENVIAR */}
                            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                                <Text
                                    style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}
                                >
                                    Enviar
                                </Text>
                            </TouchableOpacity>

                            {/* BOTÃO DE VOLTAR */}
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={{
                                    color: "white",
                                    fontFamily: "Bold",
                                    textAlign: "center",
                                    marginTop: 32,
                                    fontSize: 16
                                }}> Voltar </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default RedefinirEmail;