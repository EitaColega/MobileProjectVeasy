import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [loadingPlayer, setLoadingPlayer] = useState(true);

  useEffect(() => {
    loadPlayerData();
  }, []);

  const loadPlayerData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoadingPlayer(false);
        return;
      }

      const response = await axios.get(`${API_URL}/jogador/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userId = response.data.id_usuario;
      const savedPhoto = await AsyncStorage.getItem(`player_photo_${userId}`);

      setPlayer({
        ...response.data,
        photo: savedPhoto || response.data.photo || null
      });

    } catch (error) {
      console.log("Erro ao carregar dados do player:", error);
    }

    setLoadingPlayer(false);
  };

  const updatePhoto = async (uri) => {
    try {
      const userId = player.id_usuario;

      setPlayer((old) => ({ ...old, photo: uri }));

      await AsyncStorage.setItem(`player_photo_${userId}`, uri);

    } catch (e) {
      console.log("Erro ao salvar foto:", e);
    }
  };

  return (
    <PlayerContext.Provider value={{ player, loadingPlayer, loadPlayerData, updatePhoto }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
