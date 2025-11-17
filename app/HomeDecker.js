import { ImageBackground, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styleshome from '../assets/css/Stylehome';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const homedecker = require('../assets/background.jpg');

const HomeDecker = () => {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styleshome.home} edges={['left', 'right']}>
				<ImageBackground source={homedecker} style={styleshome.homeimage}>
					<View style={styleshome.overlay} />
                    <View style={styleshome.deckercontainer1}>
					<Text
						style={{
							color: 'white',
							fontSize: 24,
							textAlign: 'center',
							fontFamily: 'Regular',
							marginTop: -100
						}}
					>
						{' '}
						Popular Decks
					</Text>
					</View>
                    <View style={styleshome.deckercontainer2}>
					<Text
						style={{
							color: 'white',
							fontSize: 24,
							textAlign: 'center',
							fontFamily: 'Regular',
                            marginTop: -100

						}}
					>
						{' '}
						Popular Decks
					</Text>
					</View>


					<View style={styleshome.bottomBar}>
						{/* Cartas */}
						<Link href="/HomeDecker" asChild>
							<TouchableOpacity style={{ alignItems: 'center' }}>
								<MaterialCommunityIcons name="cards-outline" size={42} color="#4B1664" />
								<Text style={styleshome.FooterName}>Decks</Text>
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
								<Ionicons name="settings-outline" size={42} color="white" />
							</TouchableOpacity>
						</Link>
					</View>
				</ImageBackground>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default HomeDecker;
