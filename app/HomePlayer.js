import React, { useEffect, useState, useCallback } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import stylesplayer from '../assets/css/Stylesplayer';

const homeplayer = require('../assets/background.jpg');

export default function HomePlayer() {
	const [name, setName] = useState('');
	const [clanName, setClanName] = useState('');
	const [trofeus, setTrofeus] = useState('');
	const [topTrofeus, setTopTrofeus] = useState('');
	const [photo, setPhoto] = useState(null);



	// Carregar foto salva sempre que voltar para essa tela
	useFocusEffect(
		useCallback(() => {
			loadPhoto();
		}, [])
	);

	const loadPhoto = async () => {
		const saved = await AsyncStorage.getItem('playerPhoto');
		if (saved) setPhoto(saved);
	};

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			alert('Permissão negada para acessar a galeria.');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1
		});

		if (!result.canceled) {
			const uri = result.assets[0].uri;
			await AsyncStorage.setItem('playerPhoto', uri);
			setPhoto(uri);
		}
	};

	return (
		<SafeAreaProvider>
			<SafeAreaView style={stylesplayer.home} edges={['left', 'right']}>
				<ImageBackground source={homeplayer} style={stylesplayer.homeimage}>
					<View style={stylesplayer.overlay} />

					<Text style={stylesplayer.hometext}>Perfil</Text>

					<View style={stylesplayer.homecontainer}>

						<TouchableOpacity onPress={pickImage}>
							{photo ? (
								<Image source={{ uri: photo }} style={stylesplayer.userImg} />
							) : (
								<Ionicons name="person-circle-outline" size={120} color="white" />
							)}
						</TouchableOpacity>

						<View style={stylesplayer.infoCenter}>
							<Text style={stylesplayer.name}>{name}</Text>
							<Text style={stylesplayer.info}>Clã: {clanName}</Text>
						</View>

						<View style={stylesplayer.statsContainer}>
							<Text style={stylesplayer.top}>Troféus: {trofeus}</Text>
							<Text style={stylesplayer.top}>Top Troféus: {topTrofeus}</Text>
						</View>

						<Text style={stylesplayer.sectionTitle}>Top Decks</Text>

						<View style={stylesplayer.deckBox} />
					</View>

					<View style={stylesplayer.bottomBar}>
						<Link href="/HomeDecker" asChild>
							<TouchableOpacity style={{ alignItems: 'center' }}>
								<MaterialCommunityIcons name="cards-outline" size={42} color="white" />
							</TouchableOpacity>
						</Link>

						<Link href="/HomePlayer" asChild>
							<TouchableOpacity style={{ alignItems: 'center' }}>
								<Ionicons name="person-circle-outline" size={42} color="#4B1664" />
							</TouchableOpacity>
						</Link>

						<Link href="/Options" asChild>
							<TouchableOpacity style={{ alignItems: 'center' }}>
								<Ionicons name="settings-outline" size={42} color="white" />
							</TouchableOpacity>
						</Link>
					</View>
				</ImageBackground>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
