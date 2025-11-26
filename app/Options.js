import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState, useCallback } from 'react';
import styleshome from '../assets/css/Stylehome';
import { Link, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = require('../assets/background.jpg');

const Options = () => {
	const [photo, setPhoto] = useState(null);
	const [player, setPlayer] = useState(null);

	// Carrega foto salva
	const loadPhoto = async () => {
		const saved = await AsyncStorage.getItem('playerPhoto');
		if (saved) setPhoto(saved);
	};

	// Carrega jogador logado
	const loadPlayer = async () => {
		try {
			const token = "SEU_TOKEN_AQUI"; // depois substituir pelo token salvo

			const res = await fetch("http://SEU_BACKEND/jogador/me", {
				headers: { Authorization: `Bearer ${token}` }
			});

			const data = await res.json();
			setPlayer(data);
		} catch (err) {
			console.log("Erro ao carregar jogador", err);
		}
	};

	// Carrega apenas na primeira vez
	useEffect(() => {
		loadPlayer();
	}, []);

	// 🔥 Carrega sempre que a tela ganha foco (aqui está a solução!)
	useFocusEffect(
		useCallback(() => {
			loadPhoto();
		}, [])
	);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styleshome.home} edges={['left', 'right']}>
				<ImageBackground source={options} style={styleshome.homeimage}>
					<View style={styleshome.overlay} />

					{/* Título */}
					<Text style={styleshome.hometext}>Player Settings</Text>

					{/* Conteúdo */}
					<View style={styleshome.homecontainerOp}>

						{/* Foto */}
						<View style={{ alignItems: "center", marginBottom: 20 }}>
							{photo ? (
								<Image source={{ uri: photo }} style={styleshome.userImg} />
							) : (
								<Ionicons name="person-circle-outline" size={180} color="white" />
							)}
						</View>

						{/* Nome do jogador */}
						<Text
							style={{
								color: "white",
								fontSize: 28,
								fontWeight: "bold",
								textAlign: "center",
								marginBottom: 25
							}}
						>
							{player?.nome ?? "Name"}
						</Text>

						{/* Ações */}
						<Link href="/Redfine-Email" asChild>
							<TouchableOpacity style={styleshome.settingbullets}>
								<Text style={styleshome.textbullets}>Trocar Email</Text>
							</TouchableOpacity>
						</Link>

						<Link href="/Redefinir-Email" asChild>
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

					{/* Rodapé */}
					<View style={styleshome.bottomBar}>
						<Link href="/HomeDecker" asChild>
							<TouchableOpacity style={{ alignItems: "center" }}>
								<MaterialCommunityIcons name="cards-outline" size={42} color="white" />
							</TouchableOpacity>
						</Link>

						<Link href="/HomePlayer" asChild>
							<TouchableOpacity style={{ alignItems: "center" }}>
								<Ionicons name="person-circle-outline" size={42} color="white" />
							</TouchableOpacity>
						</Link>

						<Link href="/Options" asChild>
							<TouchableOpacity style={{ alignItems: "center" }}>
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
