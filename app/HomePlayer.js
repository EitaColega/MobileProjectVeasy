import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import styleshome from '../assets/css/Stylehome';
import { Link } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const homeplayer = require('../assets/background.jpg');

const HomePlayer = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styleshome.home} edges={['left', 'right']}>
        <ImageBackground source={homeplayer} style={styleshome.homeimage}>
          <View style={styleshome.overlay} />
      
          <View>
            <Text style={styleshome.hometext}>Player Search</Text>
          </View>

          <View style={styleshome.homecontainer} />

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

