import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

import Deck from "./components/Deck";
import DeckCarousel from "./components/DeckCarousel";
import styleshome from "../assets/css/Stylehome";

const homedecker = require("../assets/background.jpg");
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const HomeDecker = () => {
  const [leaderDecks, setLeaderDecks] = useState([]);
  const [loadingLeaders, setLoadingLeaders] = useState(true);

  useEffect(() => {
    const fetchLeaderDecks = async () => {
      try {
        const res = await axios.get(`${API_URL}/decks/leaders?limit=5`);
        setLeaderDecks(res.data || []);
      } catch (err) {
        console.error("Erro ao buscar decks dos líderes:", err.message);
      } finally {
        setLoadingLeaders(false);
      }
    };
    fetchLeaderDecks();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styleshome.home} edges={["left", "right"]}>
        <ImageBackground source={homedecker} style={styleshome.homeimage}>
          <View style={styleshome.overlay} />

          <ScrollView contentContainerStyle={{ paddingVertical: 20, alignItems: "center" }}>
            {/* Deck Popular do Dia */}
            <Deck title="Deck Popular do Dia" />

            {/* Top 3 Leaders */}
            {loadingLeaders ? (
              <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 20 }} />
            ) : (
              <DeckCarousel title="Top 3 Leaders" decks={leaderDecks} itemWidth={300} />
            )}
          </ScrollView>

          {/* Menu Inferior */}
          <View style={styleshome.bottomBar}>
            <Link href="/HomeDecker" asChild>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="cards-outline" size={42} color="#4B1664" />
              </TouchableOpacity>
            </Link>

            <Link href="/HomePlayer" asChild>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="person-circle-outline" size={42} color="white" />
              </TouchableOpacity>
            </Link>

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

export default HomeDecker;
