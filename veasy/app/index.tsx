import React , {useState} from "react";
import { Text, View, ImageBackground, TextInput} from "react-native";
import { Stack, withLayoutContext } from "expo-router";

export default function App() {
  const [emailfield, setEmailField] = useState('')
  const [email, setEmail] = useState('')

  const [senhafield, setSenhaField] = useState('')
  const [senha, setSenha] = useState('')

  return (
    <ImageBackground
      source={require("../assets/images/fundo.jpg")}
      style={{
        flex: 1, // 🔹 ocupa toda a tela
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        
        }}>
      <View>
        <Text style ={{
          color: "#fff",
            fontSize: 45,
            top:-150,
            fontWeight: "bold",
        }}>
          Veasy
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.3)", // leve transparência
          padding: 100,
          borderRadius: 10,
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,

        }}>

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            textAlign: "center",
            }}>

          Entrar{"\n"}
        </Text>
      </View>
    </ImageBackground>
  );
}
