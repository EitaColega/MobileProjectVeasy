import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import styles from '../assets/css/Styles';
import api from '../services/api';

const bg = require('../assets/background.jpg');

export default function DeleteAccount() {
	const [senha, setSenha] = useState('');
	const [showSenha, setShowSenha] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		if (!senha.trim()) return alert('Digite sua senha antes.');

		try {
			setLoading(true);
			await api.post('/usuarios/delete-with-password', { password: senha });

			await AsyncStorage.removeItem('token');
			await AsyncStorage.removeItem('usuario');
			await AsyncStorage.removeItem('playerPhoto');

			alert('Conta excluída com sucesso!');
			router.replace('/'); // volta para login
		} catch (error) {
			alert(error.response?.data?.error || 'Erro ao excluir conta');
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container} edges={['left', 'right']}>
			<ImageBackground source={bg} style={styles.image}>
				<View style={styles.viewcontainer}>
					<View style={styles.forms}>
						<Text style={styles.textocontainer}>Excluir Conta</Text>

						<Text style={styles.campos}>Confirme sua senha:</Text>

						<TextInput
							style={[styles.field, { paddingRight: 40 }]}
							placeholder="Digite sua senha"
							placeholderTextColor="#ccc"
							value={senha}
							onChangeText={setSenha}
							secureTextEntry={!showSenha}
						/>

						<TouchableOpacity
							onPress={() => setShowSenha(!showSenha)}
							style={{ alignSelf: 'flex-end', marginTop: -36, marginRight: 10, padding: 6 }}
						>
							<Ionicons name={showSenha ? 'eye-off' : 'eye'} size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, { backgroundColor: '#B00020', marginTop: 20, width: 150 }]}
							onPress={handleDelete}
							disabled={loading}
						>
							<Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}>
								{loading ? 'Excluindo...' : 'Excluir minha conta'}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => router.back()}>
							<Text
								style={{
									color: 'white',
									fontFamily: 'Bold',
									textAlign: 'center',
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
	);
}
