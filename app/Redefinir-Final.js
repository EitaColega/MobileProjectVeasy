import { ImageBackground, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const image = require('../assets/background.jpg');

const index = () => {
    const [codigofield, setCodigoField] = useState('');
    const [codigo, setCodigo] = useState('');

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
                            <Text style={styles.textocontainer}>Senha Redefinida!</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'left', marginTop: 30, paddingLeft: 10, }}>SUA SENHA FOI REDEFINIDA COM SUCESSO!{'\n\n\n'} </Text>


                            <TouchableOpacity onPress={() => router.push("/")} style={styles.button}>
                                <Text
                                    style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}
                                >
                                    Confirmar

                                </Text>
                            </TouchableOpacity>




                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default index;