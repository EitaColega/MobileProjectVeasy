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
							<Text style={styles.textocontainer}>Entrar</Text>
							<Text style={styles.campos}> Email: </Text>
							<TextInput
								style={styles.field}
								placeholder="SeuEmail@email.com"
								placeholderTextColor="#ccc"
								value={emailfield}
								onChangeText={setEmailField}
							></TextInput>
							<Text style={styles.campos}> Senha: </Text>
							<TextInput
								style={[styles.field, { paddingRight: 40 }]} // espaço pro ícone
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
							<TouchableOpacity style={styles.button}>
								<Text
									style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}
								>
									<Link href={"/Home"} style={{ color: 'white', fontFamily: 'Regular' }}>Entrar</Link>
								</Text>
							</TouchableOpacity>

							<Link href={"/Redefinir-Email"} style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center', marginTop: 30, color: 'white', fontFamily: 'Bold' }}>Esqueceu a Senha?</Link>

							<Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center', marginTop: 30 }}>
								Não tem conta? <Link href={"/Register"} style={{ color: 'white', fontFamily: 'Bold' }}>Registre-se</Link>
							</Text>
						</View>
					</View>
				</ImageBackground>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default index;