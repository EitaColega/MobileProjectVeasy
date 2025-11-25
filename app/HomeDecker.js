// app/HomeDecker.js
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect } from 'react';
import styleshome from "../assets/css/Stylehome";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import DeckList from "./components/DeckList";

const homedecker = require("../assets/background.jpg");

const HomeDecker = () => {
  useEffect(() => {
    document.title = "Decks";
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styleshome.home} edges={["left", "right"]}>
        <ImageBackground source={homedecker} style={styleshome.homeimage}>
          <View style={styleshome.overlay} />

          <View style={{ marginTop: -80 }}>
            
            {/* DECK DO JOGADOR ATUAL */}
            <DeckList
              title="Seu Deck Atual"
              source="player"
              debug={false}
            />

            {/* DECK POPULAR DO DIA (SCRAPER CACHEADO) */}
            <DeckList
              title="Deck Popular do Dia"
              source="popular"
              debug={false}
            />

            {/* EXEMPLO: OUTRO JOGADOR */}
            <DeckList
              title="Deck de Outro Jogador"
              tag="2PP"
              source="player"
              debug={true}
            />
          </View>

          <View style={styleshome.bottomBar}>
            <Link href="/HomeDecker" asChild>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="cards-outline"
                  size={42}
                  color="#4B1664"
                />
                <Text style={styleshome.FooterName}>Decks</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/HomePlayer" asChild>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons
                  name="person-circle-outline"
                  size={42}
                  color="white"
                />
              </TouchableOpacity>
            </Link>

            <Link href="/Options" asChild>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons
                  name="settings-outline"
                  size={42}
                  color="white"
                />
              </TouchableOpacity>
            </Link>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeDecker;
