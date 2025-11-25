import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import styleshome from '../assets/css/Stylehome';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const options = require('../assets/background.jpg');

const Options = () => {
	useEffect(() => {
		document.title = "Configurações";
	  }, []);
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styleshome.home} edges={['left', 'right']}>
				<ImageBackground source={options} style={styleshome.homeimage}>
					<View style={styleshome.overlay} />

					<View style={styleshome.overlay} />

					<View>
						<Text style={styleshome.hometext}>Player Settings</Text>
					</View>

					<View style={styleshome.homecontainerOp}>
						
            <Link href="/Redefinir-Email" asChild>
              <TouchableOpacity style={styleshome.settingbullets} >
							  <Text style={styleshome.textbullets}>
								  Trocar Email
							  </Text>
						  </TouchableOpacity>
            </Link>
            
            <Link href="/Redefinir-Senha" asChild>
              <TouchableOpacity style={styleshome.settingbullets} >
							  <Text style={styleshome.textbullets}>
								  Trocar Senha
							  </Text>
						  </TouchableOpacity>
            </Link>

            	<TouchableOpacity style={styleshome.settingbullets} >
							  <Text style={styleshome.textbullets}>
								Desativar conta
							  </Text>
						  </TouchableOpacity>

            <Link href="/" asChild>
              <TouchableOpacity style={styleshome.settingbullets} >
							  <Text style={styleshome.textbullets}>
								  Sair
							  </Text>
						  </TouchableOpacity>
            </Link>


            	<TouchableOpacity style={styleshome.settingbullets}>
							<Text style={styleshome.textbullets}>
								Suporte
							</Text>
						</TouchableOpacity>

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
