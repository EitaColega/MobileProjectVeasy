import { ImageBackground, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from './assets/css/Styles';
import { Link } from 'expo-router';

const image = require('./assets/background.jpg');

const App = () => {
	const [emailfield, setEmailField] = useState('');
	const [email, setEmail] = useState('');

	const [senhafield, setSenhaField] = useState('');
	const [senha, setSenha] = useState('');

	const [fontsLoaded] = useFonts({
		Regular: require('./assets/fonts/Poppins-Medium.ttf'),
		Bold: require('./assets/fonts/Poppins-ExtraBold.ttf')
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
							<Text style={styles.campos}> Email </Text>
							<TextInput
								style={styles.field}
								placeholder="SeuEmail@email.com"
								placeholderTextColor="#ccc"
								value={emailfield}
								onChangeText={setEmailField}
							></TextInput>
							<Text style={styles.campos}> Senha </Text>
							<TextInput
								style={styles.field}
								placeholder="Senha Super Segura"
								placeholderTextColor="#ccc"
								value={senhafield}
								onChangeText={setSenhaField}
								secureTextEntry={true}
							></TextInput>
							<TouchableOpacity style={styles.button}>
								<Text
									style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}
								>
									Entrar
								</Text>
							</TouchableOpacity>
							<Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center', marginTop: 32 }}>
								Não tem conta? <Link style ={{fontFamily:'Bold', }}href="/Register">Registre-se</Link>
							</Text>
						</View>
					</View>
				</ImageBackground>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default App;
