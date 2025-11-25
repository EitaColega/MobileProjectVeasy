import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import styleshome from '../assets/css/Stylehome';
import { Link } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const homeplayer = require('../assets/background.jpg');

const HomePlayer = () => {
  
	const [searchQuery, setSearchQuery] = useState('');

  const [name, setName] = useState('');
  const [clanName, setClanName] = useState('');
  const [trofeus, setTrofeus] = useState('');
  const [topTrofeus, setTopTrofeus] = useState('');

//testando espaçamento 
  useEffect(() => {
    setName("Gabiru");
    setClanName("CORP");
    setTrofeus("9999");
    setTopTrofeus("9999");
    
  }, []);

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
              ...styleshome.homecontainer,
              justifyContent: "top",
              alignItems: "center",
			  paddingTop: 10
            }}
          >

            <Ionicons name="person-circle-outline" size={120} color="white" />

            {/* info-player*/}
            <Text style={{
              color: 'white',
              fontSize: 24,
              textAlign: 'left',
              fontFamily: 'Regular',
              padding: 20,
              marginTop: -55,
            }}>
              {'\n'}{name}
            </Text>

            <Text style={{
              color: 'white',
              fontSize: 24,
              textAlign: 'left',
              fontFamily: 'Regular',
              padding: 20,
              marginTop: -40,
            }}>
            	Clã:{clanName}
            </Text>

            <Text style={styleshome.textplayer}>
              {'\n'}  {'\n'}Troféus: {trofeus}
            </Text>

            <Text style={styleshome.textplayer}>
              {'\n'}Top Troféus: {topTrofeus}
            </Text>

            <Text style={styleshome.textplayer}>
              {'\n'}  {'\n'}Top Deks: 
            </Text>
			
			<View style={{
				marginTop: -10,
				marginBottom: 20,
				alignItems: 'center',
				backgroundColor: 'rgba(11, 10, 10, 0.47)',
				width: 330,
				height: 200,
				borderColor: '#EEEEEE66',
				borderWidth: 2,
				borderRadius: 50,
				padding: 64,
				marginBottom: 60}}>
				
			</View>	

          </View>
			

          {/* Bottom bar */}
          <View style={styleshome.bottomBar}>

            {/* Cartas */}
            <Link href="/HomeDecker" asChild>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="cards-outline" size={42} color="white" />
              </TouchableOpacity>
            </Link>

            {/* Player */}
            <Link href="/HomePlayer" asChild>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="person-circle-outline" size={42} color="#4B1664" />
              </TouchableOpacity>
            </Link>

            {/* Engrenagem */}
            <Link href="/Options" asChild>
              <TouchableOpacity style={{ alignItems: "center" }}>
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