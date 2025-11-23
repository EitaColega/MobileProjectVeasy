import { ImageBackground, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const RegisterId = () => {
    const [clashId, setClashId] = useState('');
    const [loading, setLoading] = useState(false);

    // ⚠️ usuário salvo globalmente na tela Register!
    const idUsuario = global.usuario?.id_usuario;

    const handleRegisterId = async () => {
        if (!clashId.trim()) return alert("Digite seu ID do Clash Royale!");
        if (!idUsuario) return alert("Erro: usuário não encontrado. Faça o login novamente.");

        try {
            setLoading(true);

            const resp = await axios.post(`${API_URL}/jogador/cadastrar`, {
                idUsuario,
                clashId
            });

            // atualiza os dados do usuário com o nome real
            global.usuario.nome = resp.data.nome;

            alert("Jogador cadastrado com sucesso!");
            router.push('/HomePlayer');
        } catch (err) {
            if (err.response?.data?.error) alert(err.response.data.error);
            else alert("Erro ao cadastrar jogador!");
        }

        setLoading(false);
    };

    const [fontsLoaded] = useFonts({
        Regular: require('../assets/fonts/Poppins-Medium.ttf'),
        Bold: require('../assets/fonts/Poppins-ExtraBold.ttf')
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
                    <View style={styles.viewcontainer}>

                        <View style={styles.header}>
                            <Text style={styles.text}>Veasy</Text>
                        </View>

                        <View style={styles.forms}>
                            <Text style={styles.textocontainer}>Registro</Text>

                            <Text style={styles.campos}>Clash Id:</Text>
                            <TextInput
                                style={styles.field}
                                placeholder="JGCUU99V2"
                                placeholderTextColor="#ccc"
                                value={clashId}
                                onChangeText={setClashId}
                            />

                            <TouchableOpacity
                                style={[styles.button, { marginTop: 64 }]}
                                onPress={handleRegisterId}
                                disabled={loading}
                            >
                                <Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}>
                                    {loading ? "Validando..." : "Confirmar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default RegisterId;
