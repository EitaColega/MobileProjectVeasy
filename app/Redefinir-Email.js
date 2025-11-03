import { ImageBackground, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const image = require('../assets/background.jpg');

const index = () => {
    const [emailfield, setEmailField] = useState('');
    const [email, setEmail] = useState('');
    const [showSenha, setShowSenha] = useState(false);

    const [senhafield, setSenhaField] = useState('');
    const [senha, setSenha] = useState('');

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
                            <Text style={styles.textocontainer}>Redefinir Senha</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'left', marginTop: 30, paddingLeft: 10, }}>digite o email usado na criação da conta para receber o código de segurança, use o código para redefinir sua senha! </Text>
                            <Text style={styles.campos}> Email: </Text>
                            <TextInput
                                style={styles.field}
                                placeholder="SeuEmail@email.com"
                                placeholderTextColor="#ccc"
                                value={emailfield}
                                onChangeText={setEmailField}
                            ></TextInput>

                            <TouchableOpacity style={styles.button}>
                                <Text
                                    style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}
                                >
                                    <Link href={"/Redefinir-Codigo"} style={{ color: 'white', fontFamily: 'Regular' }}>Enviar</Link>
                                    
                                </Text>
                            </TouchableOpacity>

                            <Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Text style={{ color: "white", fontFamily: "Bold" }}> Voltar </Text>
                                </TouchableOpacity>
                            </Text>


                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default index;