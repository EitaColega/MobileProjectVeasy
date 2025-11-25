import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import styleshome from '../assets/css/Stylehome';
import DeckList from "./components/DeckList";

const homedecker = require("../assets/background.jpg");

const HomeDecker = () => {
  useEffect(() => {
    document.title = "Decks";
  }, []);

  // Carrosel 1 - Para Decks Populares
  const [index1, setIndex1] = useState(0);
  const translateX1 = useRef(new Animated.Value(0)).current;

  const goTo1 = (newIndex) => {
    setIndex1(newIndex);
    Animated.timing(translateX1, {
      toValue: -newIndex * 300,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  // Carrosel 2 - Para Decks de Pro Players
  const [index2, setIndex2] = useState(0);
  const translateX2 = useRef(new Animated.Value(0)).current;

  const goTo2 = (newIndex) => {
    setIndex2(newIndex);
    Animated.timing(translateX2, {
      toValue: -newIndex * 300,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styleshome.home} edges={['left', 'right']}>
        <ImageBackground source={homedecker} style={styleshome.homeimage}>
          <View style={styleshome.overlay} />

          {/* OPÇÃO 1: Usando o componente DeckList para dados reais do servidor */}
          <View style={{ marginTop: -80 }}>
            <DeckList
              title="Decks Populares do Dia"
              source="popular"
              debug={false}
            />
          </View>

          {/* OPÇÃO 2: Usando o carrossel customizado com dados mock (fallback) */}
          {/* 
          <Text style={stylescarousel.title}>Popular Decks</Text>
          <View style={stylescarousel.carouselContainer}>
            {index1 > 0 && (
              <TouchableOpacity
                onPress={() => goTo1(index1 - 1)}
                style={stylescarousel.arrowLeft}
              >
                <Ionicons name="chevron-back" size={36} color="white" />
              </TouchableOpacity>
            )}

            <Animated.View
              style={[
                stylescarousel.carouselContent,
                { transform: [{ translateX: translateX1 }] }
              ]}
            >
              {["Deck 1", "Deck 2", "Deck 3", "Deck 4", "Deck 5"].map((item) => (
                <View key={item} style={stylescarousel.card}>
                  <Text style={stylescarousel.cardTitle}>{item}</Text>
                </View>
              ))}
            </Animated.View>

            {index1 < 4 && (
              <TouchableOpacity
                onPress={() => goTo1(index1 + 1)}
                style={stylescarousel.arrowRight}
              >
                <Ionicons name="chevron-forward" size={36} color="white" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={[stylescarousel.title, { marginTop: 40 }]}>
            Pro Player Decks
          </Text>

          <View style={stylescarousel.carouselContainer}>
            {index2 > 0 && (
              <TouchableOpacity
                onPress={() => goTo2(index2 - 1)}
                style={stylescarousel.arrowLeft}
              >
                <Ionicons name="chevron-back" size={36} color="white" />
              </TouchableOpacity>
            )}

            <Animated.View
              style={[
                stylescarousel.carouselContent,
                { transform: [{ translateX: translateX2 }] }
              ]}
            >
              {["Pro 1", "Pro 2", "Pro 3", "Pro 4", "Pro 5"].map((item) => (
                <View key={item} style={stylescarousel.card}>
                  <Text style={stylescarousel.cardTitle}>{item}</Text>
                </View>
              ))}
            </Animated.View>

            {index2 < 4 && (
              <TouchableOpacity
                onPress={() => goTo2(index2 + 1)}
                style={stylescarousel.arrowRight}
              >
                <Ionicons name="chevron-forward" size={36} color="white" />
              </TouchableOpacity>
            )}
          </View>
          */}

          {/* Menu Inferior */}
          <View style={styleshome.bottomBar}>
            <Link href="/HomeDecker" asChild>
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons name="cards-outline" size={42} color="#4B1664" />
                <Text style={styleshome.FooterName}>Decks</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/HomePlayer" asChild>
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Ionicons name="person-circle-outline" size={42} color="white" />
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
};

const stylescarousel = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Regular",
    marginTop: 20
  },

  carouselContainer: {
    width: "100%",
    height: 220,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  carouselContent: {
    flexDirection: "row",
    width: 300 * 5,
  },

  card: {
    width: 300,
    height: 200,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },

  cardTitle: {
    color: "white",
    fontSize: 22,
    fontFamily: "Regular",
  },

  arrowLeft: {
    position: "absolute",
    left: 10,
    zIndex: 10,
    padding: 10,
  },

  arrowRight: {
    position: "absolute",
    right: 10,
    zIndex: 10,
    padding: 10,
  },
});

export default HomeDecker;