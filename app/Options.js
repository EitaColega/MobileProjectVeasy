import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import styleshome from '../assets/css/Stylehome';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import * as PlayerContext from "./contexts/PlayerContext";
import stylesplayer from '../assets/css/Stylesplayer';

const optionsBg = require('../assets/background.jpg');

export default function Options() {

  // PEGANDO OS DADOS DO PLAYER CONTEXT
  const { player } = PlayerContext.usePlayer();

  const playerName = player?.nome || "";
  const photo = player?.photo || null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styleshome.home} edges={['left', 'right']}>
        <ImageBackground source={optionsBg} style={styleshome.homeimage}>
          <View style={styleshome.overlay} />

          <Text style={styleshome.hometext}>Player Settings</Text>

          <View style={styleshome.homecontainerOp}>

            {/* FOTO DO PLAYER */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              {photo ? (
                <Image source={{ uri: photo }} style={styleshome.userImg} />
              ) : (
                <Ionicons name="person-circle-outline" size={180} color="white" />
              )}
            </View>

            {/* NOME */}
            <Text style={stylesplayer.name}>{playerName}</Text>

            {/* AÇÕES */}
            <Link href="/Redefinir-Email" asChild>
              <TouchableOpacity style={styleshome.settingbullets}>
                <Text style={styleshome.textbullets}>Trocar Senha</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/deleteAccount" asChild>
              <TouchableOpacity style={styleshome.settingbullets}>
                <Text style={styleshome.textbullets}>Deletar Conta</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/" asChild>
              <TouchableOpacity style={styleshome.settingbullets}>
                <Text style={styleshome.textbullets}>Sair</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* RODAPÉ */}
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
}
