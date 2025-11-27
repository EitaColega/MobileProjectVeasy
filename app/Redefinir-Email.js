import { ImageBackground, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { router } from 'expo-router';
import api from '../services/api';

const image = require('../assets/background.jpg');

const RedefinirEmail = () => {

    const [email, setEmail] = useState('');

    const [fontsLoaded] = useFonts({
        Regular: require('../assets/fonts/Poppins-Medium.ttf'),
        Bold: require('../assets/fonts/Poppins-ExtraBold.ttf')
    });

    // Regex igual ao da tela de login
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Função de envio do código
    const handleSendCode = async () => {

        // Validação do email
        if (!email.trim()) {
            return alert("O campo de email não pode estar vazio.");
        }

        if (!emailRegex.test(email)) {
            return alert("Digite um email válido. Ex: exemplo@gmail.com");
        }

        try {
            const response = await api.post("/reset/forgot-password", { email });

            alert(response.data.message || "Código enviado com sucesso!");

            // 👉 Envia o email junto para próxima tela
            router.push({
                pathname: "/Redefinir-Codigo",
                params: { email }
            });

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

                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Regular',
                                    color: 'white',
                                    textAlign: 'left',
                                    marginTop: 30,
                                    paddingLeft: 10,
                                }}
                            >
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

                            {/* Botão Enviar */}
                            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Regular',
                                        color: 'white',
                                        textAlign: 'center'
                                    }}
                                >
                                    Enviar
                                </Text>
                            </TouchableOpacity>

                            {/* Botão Voltar */}
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text
                                    style={{
                                        color: "white",
                                        fontFamily: "Bold",
                                        textAlign: "center",
                                        marginTop: 32,
                                        fontSize: 16
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

export default RedefinirEmail;
