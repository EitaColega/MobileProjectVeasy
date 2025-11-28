import React, { useEffect, useState, useCallback } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import stylesplayer from '../assets/css/Stylesplayer';
import styleshome from '../assets/css/Stylehome';
import api from "../services/api";

const homeplayer = require('../assets/background.jpg');

export default function HomePlayer() {
  const [name, setName] = useState('');
  const [clanName, setClanName] = useState('');
  const [trofeus, setTrofeus] = useState('');
  const [topTrofeus, setTopTrofeus] = useState('');
  const [photo, setPhoto] = useState(null);
  const [wins, setWins] = useState('');
  const [losses, setLosses] = useState('');
  const [explevel, setExplevel] = useState('');
  const [deck, setDeck] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadPhoto();
      fetchPlayerData();
    }, [])
  );

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
      setTrofeus(data.trofeus ?? '');
      setTopTrofeus(data.topTrofeus ?? '');
      setClanName(data.clanName ?? 'Sem Clã');
      setWins(data.wins ?? '');
      setLosses(data.losses ?? '');
      setExplevel(data.expLevel ?? '');
      setDeck(Array.isArray(data.deck) ? data.deck : []);
    } catch (err) {
      console.log("Erro fetchPlayerData:", err.response?.data || err.message || err);
    }
  };

  // === FOTO ===
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

  // === NOVO DECK SEM NOME — 4x2 CLEAN UI ===
  const renderDeckGrid = () => {
    const cards = [...deck];
    while (cards.length < 8) cards.push({ icon: null });

    const rows = [cards.slice(0, 4), cards.slice(4, 8)];

    return (
      <View style={{ alignItems: "center", width: "100%" }}>
        {rows.map((row, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 12,
              marginBottom: idx === 0 ? 14 : 0
            }}
          >
            {row.map((card, i) => (
              <View key={i} style={stylesplayer.cardBox}>
                {card.icon ? (
                  <Image
                    source={{ uri: card.icon }}
                    style={stylesplayer.cardImageNew}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={stylesplayer.cardPlaceholder}>
                    <Ionicons name="help-circle-outline" size={28} color="#ccc" />
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={stylesplayer.home} edges={['left', 'right']}>
        <ImageBackground source={homeplayer} style={stylesplayer.homeimage}>
          <View style={stylesplayer.overlay} />

          <Text style={stylesplayer.hometext}>Perfil</Text>

          <View style={stylesplayer.homecontainer}>
            
            <View style={stylesplayer.infoCenter}>
              <Text style={stylesplayer.info}>Nv: {explevel}</Text>
            </View>

            <TouchableOpacity onPress={pickImage}>
              {photo ? (
                <Image source={{ uri: photo }} style={stylesplayer.userImg} />
              ) : (
                <Ionicons name="person-circle-outline" size={180} color="white" />
              )}
            </TouchableOpacity>

            <View style={stylesplayer.infoCenter}>
              <Text style={stylesplayer.name}> {name} </Text>
              <Text style={stylesplayer.info}>Clã: {clanName}</Text>
            </View>

            <View style={stylesplayer.infoCenter}>
              <Text style={stylesplayer.top}>
                Troféus🏆: {trofeus}            Vitórias🏅: {wins}
              </Text>
              <Text style={stylesplayer.top}>
                Top Troféus🏆: {topTrofeus}     Derrotas❌: {losses}
              </Text>
            </View>

            {/* === NOVA UI DO DECK === */}
            <View style={stylesplayer.deckWrapper}>
              <Text style={stylesplayer.deckTitle}>Deck Atual</Text>
              {renderDeckGrid()}
            </View>

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
                <Text style={styleshome.FooterName}>Player</Text>
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
