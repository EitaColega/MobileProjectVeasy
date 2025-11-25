import { ImageBackground, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import styleshome from '../assets/css/Stylehome';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const homeplayer = require('../assets/background.jpg');

const HomePlayer = () => {
	useEffect(() => {
			document.title = "Home Player";
	}, []);
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styleshome.home} edges={['left', 'right']}>
				<ImageBackground source={homeplayer} style={styleshome.homeimage}>
					<View style={styleshome.overlay} />

					<View>
						<Text style={styleshome.hometext}>Player Search</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							borderRadius: 50,
							borderWidth: 2,
							borderColor: '#EEEEEE66',
							width: 310,
							height: 35,
							paddingHorizontal: 12,
							marginBottom: 24,

							shadowColor: '#450693',
							shadowOffset: { width: 4, height: 4 },
							shadowOpacity: 0.5,
							shadowRadius: 5,
							elevation: 4
						}}
					>
						<TextInput
							style={{
								flex: 1,
								color: '#EEEEEECC',
								fontFamily: 'Regular',
								fontSize: 20,
								textAlign: 'left',
								padding: 0 // já tem padding no container
							}}
							placeholder="Search Players"
							placeholderTextColor="#EEEEEECC"
							value={searchQuery}
							onChangeText={setSearchQuery}
						/>

						<Feather name="search" size={20} color="#EEEEEECC" />
					</View>
					<View style={styleshome.homecontainer} />

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
								<Ionicons name="person-circle-outline" size={42} color="#4B1664" />
								<Text style={styleshome.FooterName}>Players</Text>
							</TouchableOpacity>
						</Link>

						{/* Engrenagem */}
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
};

export default HomePlayer;
