
import { ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState, useCallback } from 'react';
import styleshome from '../assets/css/Stylehome';
import { Link, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../services/api";
import stylesplayer from '../assets/css/Stylesplayer';

const options = require('../assets/background.jpg');

const Options = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');

  // Carrega foto salva
  const loadPhoto = async () => {
    try {
      const saved = await AsyncStorage.getItem('playerPhoto');
      if (saved) setPhoto(saved);
    } catch (err) {
      console.log("Erro ao carregar foto:", err);
    }
  };

  // Carrega jogador logado
  const fetchPlayerData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert("Erro: usuário não autenticado");
        return;
      }

      const response = await api.get("/jogador/me");
      const data = response.data;

      setName(data.nome || '');
    } catch (err) {
      console.log("Erro fetchPlayerData:", err.response?.data || err.message || err);
    }
  };

  // Carrega quando o componente abre pela primeira vez
  useEffect(() => {
    fetchPlayerData();
    loadPhoto();
  }, []);

  // Recarrega foto quando volta para tela
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
            <Text style={stylesplayer.name}> {name} </Text>

            {/* Ações */}
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