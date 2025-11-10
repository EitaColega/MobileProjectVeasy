import { ImageBackground, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { Link, router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const image = require('../assets/background.jpg');

const index = () => {
    const [emailfield, setEmailField] = useState('');
    const [email, setEmail] = useState('');
    const [confirmfield, setConfirmField] = useState("");
    const [senhafield, setSenhaField] = useState('');
    const [senha, setSenha] = useState('');
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleRegister = () => {
        router.push('/Register');
    };

    const [fontsLoaded] = useFonts({
        Regular: require('../assets/fonts/Poppins-Medium.ttf'),
        Bold: require('../assets/fonts/Poppins-ExtraBold.ttf')

    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ImageBackground source={image} style={styles.image}>
                    <View style={styles.viewcontainer}>
                        {/* CONTAINER  */}
                        <View style={styles.header}>
                            {/*HEADER */}
                            <Text style={styles.text}>Veasy</Text>
                        </View>
                        <View style={styles.forms}>
                            {/* FORMS */}
                            <Text style={styles.textocontainer}>Redefinir Senha{'\n'}</Text>
                            <Text style={styles.campos}> Senha: </Text>
                            <TextInput
                                style={[styles.field, { paddingRight: 40 }]}
                                placeholder="Senha Super Segura"
                                placeholderTextColor="#ccc"
                                value={senhafield}
                                onChangeText={setSenhaField}
                                secureTextEntry={!showSenha}
                            />
                            <TouchableOpacity
                                onPress={() => setShowSenha(!showSenha)}
                                style={{ alignSelf: "flex-end", marginTop: -36, marginRight: 10, padding: 6 }}
                            >
                                <Ionicons name={showSenha ? "eye-off" : "eye"} size={24} color="#ccc" />
                            </TouchableOpacity>
                            <Text style={styles.campos}> Confirmar Senha: </Text>
                            <TextInput
                                style={[styles.field, { paddingRight: 40 }]}
                                placeholder="Confirmar Super Segura"
                                placeholderTextColor="#ccc"
                                value={confirmfield}
                                onChangeText={setConfirmField}
                                secureTextEntry={!showConfirm}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirm(!showConfirm)}
                                style={{ alignSelf: "flex-end", marginTop: -36, marginRight: 10, padding: 6 }}
                            >
                                <Ionicons name={showConfirm ? "eye-off" : "eye"} size={24} color="#ccc" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}>
                                <Text
                                    style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center', width: 110, alignSelf: 'center', }}
                                >
                                       <Link href={"/Redefinir-Final"} style={{ color: 'white', fontFamily: 'Regular' }}>Confirmar</Link>
                                    
                                </Text>
                            </TouchableOpacity>

                                <TouchableOpacity onPress={() => router.back()}>
                                    <Text style={{ color: "white", fontFamily: "Bold", textAlign: "center", marginTop:12, fontSize:16}}> Voltar </Text>
                                </TouchableOpacity>

                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default index;