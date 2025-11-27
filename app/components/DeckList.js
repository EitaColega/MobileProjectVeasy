// app/components/DeckList.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DeckList({
  title,
  tag = null,
  debug = false,
  source = "player" // "player" (padrão) ou "popular"
}) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_PLAYER = `${API_URL}/decks/current-player`;
  const BASE_POPULAR = `${API_URL}/decks/popular`;

  useEffect(() => {
    async function loadDecks() {
      try {
        let url;

        // Se quiser o deck popular do dia (scraper)
        if (source === "popular") {
          url = BASE_POPULAR;
        } else {
          // Deck do jogador
          url =
            BASE_PLAYER +
            (tag ? `?tag=${tag}` : "") +
            (debug ? `${tag ? "&" : "?"}debug=1` : "");
        }

        if (debug) console.log("🔵 DeckList Requisição:", url);

        const res = await axios.get(url);

        if (debug) console.log("🔵 Resposta:", res.data);

        setDecks(res.data);
      } catch (err) {
        console.log("Erro ao buscar decks:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDecks();
  }, [tag, source]);

  if (loading)
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  return (
    <View style={{ marginVertical: 10 }}>
      {title && (
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontFamily: "Regular",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {title}
        </Text>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
      >
        {decks.map((deck, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#ffffff22",
              padding: 12,
              marginRight: 12,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {deck.cards.map((card, idx) => (
                <Image
                  key={idx}
                  source={{ uri: card.icon }}
                  style={{
                    width: 55,
                    height: 70,
                    borderRadius: 8,
                    marginRight: 5,
                  }}
                />
              ))}
            </View>

            <Text
              style={{
                color: "white",
                textAlign: "center",
                marginTop: 6,
                fontFamily: "Regular",
              }}
            >
              🏆 {deck.usage}% uso
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// app/components/DeckList.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DeckList({
  title,
  tag = null,
  debug = false,
  source = "player"
}) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_PLAYER = `${API_URL}/decks/current-player`;
  const BASE_POPULAR = `${API_URL}/decks/popular`;

  useEffect(() => {
    async function loadDecks() {
      try {
        let url;

        if (source === "popular") {
          url = BASE_POPULAR;
        } else {
          url =
            BASE_PLAYER +
            (tag ? `?tag=${tag}` : "") +
            (debug ? `${tag ? "&" : "?"}debug=1` : "");
        }

        if (debug) console.log("🔵 DeckList > URL:", url);

        const res = await axios.get(url);
        setDecks(res.data);
      } catch (err) {
        console.log("❌ Erro ao buscar decks:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDecks();
  }, [tag, source]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  return (
    <View
      style={{
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        width: "100%",
      }}
    >
      {title && (
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontFamily: "Regular",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {title}
        </Text>
      )}

      {/* Sem scroll horizontal → decks ficam fixos e centralizados */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        {decks.map((deck, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#ffffff22",
              padding: 12,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 4,
              marginHorizontal: 6,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {deck.cards.map((card, idx) => (
                <Image
                  key={idx}
                  source={{ uri: card.icon }}
                  style={{
                    width: 55,
                    height: 70,
                    borderRadius: 8,
                    marginRight: 5,
                  }}
                />
              ))}
            </View>

            <Text
              style={{
                color: "white",
                textAlign: "center",
                marginTop: 6,
                fontFamily: "Regular",
              }}
            >
              🏆 {deck.usage}% uso
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
