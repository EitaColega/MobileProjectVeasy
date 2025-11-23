import { ImageBackground, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const API_URL = process.env.EXPO_PUBLIC_API_URL;


const image = require('../assets/background.jpg');

const Register = () => {
  const [emailfield, setEmailField] = useState('');
  const [senhafield, setSenhaField] = useState('');
  const [confirmfield, setConfirmField] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const registrarUsuario = async () => {
    if (!emailfield || !senhafield || !confirmfield) {
      alert("Preencha todos os campos!");
      return;
    }

    if (senhafield !== confirmfield) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: emailfield,
          email: emailfield,
          senha: senhafield,
        }),
      });

        if (resposta.status === 201) {
        const usuario = await resposta.json(); // <- pega o usuário criado

        global.usuario = usuario; // <- guarda o usuário GLOBAL

        alert("Usuário registrado com sucesso!");
        router.push("/RegisterId");
      } else if (resposta.status === 400 && data.error === "Email já está cadastrado") {
        alert ("Esse email já está em uso! Tente outro.");
      } else {
        alert("Erro ao registrar usuário!");
      }
    } catch (error) {
      alert("Falha ao conectar ao servidor!");
    }
  };

  const [fontsLoaded] = useFonts({
    Regular: require('../assets/fonts/Poppins-Medium.ttf'),
    Bold: require('../assets/fonts/Poppins-ExtraBold.ttf')
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.viewcontainer}>
            
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.text}>Veasy</Text>
            </View>

            {/* FORM */}
            <View style={styles.forms}>
              <Text style={styles.textocontainer}>Registro</Text>

              {/* EMAIL */}
              <Text style={styles.campos}> Email: </Text>
              <TextInput
                style={styles.field}
                placeholder="SeuEmail@email.com"
                placeholderTextColor="#ccc"
                value={emailfield}
                onChangeText={setEmailField}
              />

              {/* SENHA */}
              <Text style={styles.campos}> Senha: </Text>
              <TextInput
                style={[styles.field, { paddingRight: 40 }]}
                placeholder="Senha Super Segura"
                placeholderTextColor="#ccc"
                value={senhafield}
                onChangeText={setSenhaField}
                secureTextEntry={!showSenha}
              />
              <TouchableOpacity
                onPress={() => setShowSenha(!showSenha)}
                style={{ alignSelf: "flex-end", marginTop: -36, marginRight: 10, padding: 6 }}
              >
                <Ionicons name={showSenha ? "eye-off" : "eye"} size={24} color="#ccc" />
              </TouchableOpacity>

              {/* CONFIRMAR SENHA */}
              <Text style={styles.campos}> Confirmar Senha: </Text>
              <TextInput
                style={[styles.field, { paddingRight: 40 }]}
                placeholder="Confirmar Super Segura"
                placeholderTextColor="#ccc"
                value={confirmfield}
                onChangeText={setConfirmField}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
                style={{ alignSelf: "flex-end", marginTop: -36, marginRight: 10, padding: 6 }}
              >
                <Ionicons name={showConfirm ? "eye-off" : "eye"} size={24} color="#ccc" />
              </TouchableOpacity>

              {/* BOTÃO DE REGISTRO */}
              <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
                <Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}>
                  Registrar
                </Text>
              </TouchableOpacity>

              {/* BOTÃO VOLTAR/LOGIN */}
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ color: "white", fontFamily: "Bold", textAlign: "center", marginTop:32, fontSize:16}}>
                  <Text style={{ color: "white", fontFamily: "Regular" }}>Já tem uma conta? </Text>Entrar
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Register;