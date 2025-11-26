import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import styleshome from '../assets/css/Stylehome';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = require('../assets/background.jpg');

const Options = () => {
	const [photo, setPhoto] = useState(null);

	// Carregar foto do jogador
	const loadPhoto = async () => {
		const saved = await AsyncStorage.getItem('playerPhoto');
		if (saved) setPhoto(saved);
	};

	useEffect(() => {
		document.title = 'Configurações';
		loadPhoto();
	}, []);

	const loadPlayer = async () => {
		try {
			const token = 'SEU_TOKEN_AQUI'; // depois substitui pelo async-storage
			const res = await fetch('http://SEU_BACKEND/jogador/me', {
				headers: { Authorization: `Bearer ${token}` }
			});

			const data = await res.json();
			setPlayer(data);
		} catch (err) {
			console.log('Erro ao carregar jogador', err);
		}
	};

	const [player, setPlayer] = useState(null);

	useEffect(() => {
		const loadPlayer = async () => {
			try {
				const token = 'SEU_TOKEN_AQUI'; // depois substitui pelo async-storage
				const res = await fetch('http://SEU_BACKEND/jogador/me', {
					headers: { Authorization: `Bearer ${token}` }
				});

				const data = await res.json();
				setPlayer(data);
			} catch (err) {
				console.log('Erro ao carregar jogador', err);
			}
		};

		loadPlayer();
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styleshome.home} edges={['left', 'right']}>
				<ImageBackground source={options} style={styleshome.homeimage}>
					<View style={styleshome.overlay} />

					{/* Título */}
					<Text style={styleshome.hometext}>Player Settings</Text>

					{/* Opções */}
					<View style={styleshome.homecontainerOp}>
						{/* Foto do jogador */}
						<View style={{ alignItems: 'center', marginBottom: 20 }}>
							{photo ? (
								<Image source={{ uri: photo }} style={styleshome.userImg} />
							) : (
								<Ionicons name="person-circle-outline" size={120} color="white" />
							)}
						</View>
						{/* NOME DO USUÁRIO */}
						<Text
							style={{
								color: 'white',
								fontSize: 28,
								fontWeight: 'bold',
								textAlign: 'center',
								marginBottom: 25 // espaço entre nome e os botões
							}}
						>
							{player?.nome ?? 'Name'}
						</Text>

						{/* BOTÕES */}
						<Link href="/Redfine-Email" asChild>
							<TouchableOpacity style={styleshome.settingbullets}>
								<Text style={styleshome.textbullets}>Trocar Email</Text>
							</TouchableOpacity>
						</Link>

						<Link href="/Redefinir-Senha" asChild>
							<TouchableOpacity style={styleshome.settingbullets}>
								<Text style={styleshome.textbullets}>Trocar Senha</Text>
							</TouchableOpacity>
						</Link>

						<Link href="/" asChild>
							<TouchableOpacity style={styleshome.settingbullets}>
								<Text style={styleshome.textbullets}>Sair</Text>
							</TouchableOpacity>
						</Link>
					</View>

					{/* Bottom bar */}
					<View style={styleshome.bottomBar}>
						{/* Cartas */}
						<Link href="/HomeDecker" asChild>
							<TouchableOpacity style={{ alignItems: 'center' }}>
								<MaterialCommunityIcons name="cards-outline" size={42} color="white" />
							</TouchableOpacity>
						</Link>

						{/* Player */}
						<Link href="/HomePlayer" asChild>
							<TouchableOpacity style={{ alignItems: 'center' }}>
								<Ionicons name="person-circle-outline" size={42} color="white" />
							</TouchableOpacity>
						</Link>

						{/* Engrenagem */}
						<Link href="/Options" asChild>
							<TouchableOpacity style={{ alignItems: 'center' }}>
								<Ionicons name="settings-outline" size={42} color="#4B1664" />
								<Text style={styleshome.FooterName}>Options</Text>
							</TouchableOpacity>
						</Link>
					</View>
				</ImageBackground>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default Options;
