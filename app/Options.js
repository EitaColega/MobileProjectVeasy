import { ImageBackground, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import styleshome from "../assets/css/Stylehome";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { usePlayer } from "./contexts/PlayerContext";  // <-- AGORA USANDO O CONTEXTO

const options = require("../assets/background.jpg");

const Options = () => {
  const { player } = usePlayer();  // <-- PEGANDO DADOS DO CONTEXTO

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styleshome.home} edges={['left', 'right']}>
        <ImageBackground source={options} style={styleshome.homeimage}>
          <View style={styleshome.overlay} />

          <Text style={styleshome.hometext}>Player Settings</Text>

          <View style={styleshome.homecontainerOp}>

            {/* FOTO DO PLAYER (MESMA DA HOME) */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              {player?.photo ? (
                <Image source={{ uri: player.photo }} style={styleshome.userImg} />
              ) : (
                <Ionicons name="person-circle-outline" size={180} color="white" />
              )}
            </View>

            {/* NOME DO PLAYER */}
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 25
              }}
            >
              {player?.nome ?? "Name"}
            </Text>

            {/* BOTOES */}
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
