import { ImageBackground, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { Link, router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const image = require('../assets/background.jpg');

const RegisterId = () => {
    const [idfield, setIdField] = useState('');
    const [id, setId] = useState('');

    const [nicknamefield, setNickNameField] = useState('');
    const [Nickname, setNickName] = useState('');

  

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
                            <Text style={styles.textocontainer}>Registro</Text>
                            <Text style={styles.campos}> Clash Id: </Text>
                            <TextInput
                                style={styles.field}
                                placeholder="coloque o id do clash"
                                placeholderTextColor="#ccc"
                                value={idfield}
                                onChangeText={setIdField}
                            ></TextInput>
                            <Text style={styles.campos}> Nickname: </Text>
                            <TextInput
                                style={[styles.field, { paddingRight: 40 }]}
                                placeholder="nickname"
                                placeholderTextColor="#ccc"
                                value={nicknamefield}
                                onChangeText={setNickName}
                            />

                             <TouchableOpacity style={[styles.button, {marginTop: 64}]}>
								<Text
									style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center'}}
								>
									<Link href={"/HomePlayer"} style={{ color: 'white', fontFamily: 'Regular' }}>Entrar</Link>
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