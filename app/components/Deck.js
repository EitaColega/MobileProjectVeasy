import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const Deck = ({ title }) => {
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await axios.get(`${API_URL}/decks/popular`);
        setDeck(res.data?.[0] || null);
      } catch (err) {
        console.error("Erro ao buscar deck popular:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 20 }} />;
  if (!deck) return <Text style={{ color: "white", textAlign: "center" }}>Nenhum deck encontrado</Text>;

  return (
    <View style={{
      backgroundColor: "#ffffff22",
      padding: 16,
      borderRadius: 15,
      alignItems: "center",
      marginVertical: 20,
    }}>
      {title && (
        <Text style={{ fontSize: 22, color: "white", marginBottom: 12, textAlign: "center" }}>
          {title}
        </Text>
      )}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {deck.cards.map((card, idx) => (
          <Image
            key={idx}
            source={{ uri: card.icon }}
            style={{ width: 55, height: 70, borderRadius: 8, margin: 12}}
          />
        ))}
      </View>
      {deck.usage !== undefined && (
        <Text style={{ color: "white", marginTop: 8 }}>
          🏆 {deck.usage * 100}% uso
        </Text>
      )}
    </View>
  );
};

export default Deck;
