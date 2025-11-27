import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const DeckCarousel = ({ title, decks = [], itemWidth = 300, spacing = 20 }) => {
  const [index, setIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  // Calcula o offset inicial para centralizar o item
  const initialOffset = (SCREEN_WIDTH - itemWidth) / 2;

  const goTo = (newIndex) => {
    if (newIndex < 0 || newIndex >= decks.length) return;
    setIndex(newIndex);
    Animated.timing(translateX, {
      toValue: -newIndex * (itemWidth + spacing),
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (decks.length === 0) {
    return <Text style={{ color: "white", textAlign: "center", marginVertical: 20 }}>Nenhum deck disponível</Text>;
  }

  return (
    <View style={{ marginVertical: 20, alignItems: "center" }}>
      {title && (
        <Text style={{ fontSize: 22, color: "white", marginBottom: 12, textAlign: "center" }}>
          {title}
        </Text>
      )}

      <View style={{ width: SCREEN_WIDTH, overflow: "hidden", position: "relative" }}>
        <Animated.View
          style={{
            flexDirection: "row",
            paddingLeft: initialOffset,
            transform: [{ translateX }],
          }}
        >
          {decks.map((deck, idx) => (
            <View
              key={idx}
              style={{
                width: itemWidth,
                marginRight: spacing,
                backgroundColor: "#ffffff22",
                borderRadius: 15,
                padding: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "gold", fontSize: 18, marginBottom: 6 }}>
                #{deck.position} {deck.name}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                {deck.deck?.map((card, i) => (
                  <Image
                    key={i}
                    source={{ uri: card.icon }}
                    style={{ width: 55, height: 70, borderRadius: 8, margin: 3 }}
                  />
                ))}
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Botões de navegação */}
        <TouchableOpacity
          onPress={() => goTo(index - 1)}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: [{ translateY: -25 }],
            padding: 10,
            backgroundColor: "#00000055",
            borderRadius: 25,
            zIndex: 1,
          }}
        >
          <Text style={{ fontSize: 28, color: "white" }}>◀️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => goTo(index + 1)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: [{ translateY: -25 }],
            padding: 10,
            backgroundColor: "#00000055",
            borderRadius: 25,
            zIndex: 1,
          }}
        >
          <Text style={{ fontSize: 28, color: "white" }}>▶️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeckCarousel;
