import { 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  BackHandler, 
  Alert 
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import styles from '../assets/css/Styles';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = require('../assets/background.jpg');

const index = () => {  

  const [emailfield, setEmailField] = useState('');
  const [senhafield, setSenhaField] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Sair do aplicativo",
        "Deseja realmente sair?",
        [
          { text: "Cancelar", onPress: () => null, style: "cancel" },
          { text: "Sim", onPress: () => BackHandler.exitApp() }
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleRegister = () => {
    router.push('/Register');
  };

  // LOGIN
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailfield.trim()) return alert("O campo de email não pode ficar vazio.");
    if (!emailRegex.test(emailfield)) return alert("Digite um email válido. Ex: exemplo@gmail.com");

    if (!senhafield.trim()) return alert("O campo de senha não pode ficar vazio.");
    if (senhafield.length < 6) return alert("A senha deve ter pelo menos 6 caracteres.");
    if (!/[A-Za-z]/.test(senhafield)) return alert("A senha deve conter pelo menos uma letra.");

    try {
      const response = await api.post("/usuarios/login", {
        email: emailfield,
        senha: senhafield
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("usuario", JSON.stringify(user));

      alert("Login realizado com sucesso!");
      router.push("/HomePlayer");

    } catch (err) {
      if (err.response?.status === 404) return alert("Usuário não encontrado");
      if (err.response?.status === 401) return alert("Senha incorreta");
      alert("Erro ao realizar login");
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
            
            <View style={styles.header}>
              <Text style={styles.text}>Veasy</Text>
            </View>

            <View style={styles.forms}>
              <Text style={styles.textocontainer}>Entrar</Text>

              <Text style={styles.campos}> Email: </Text>
              <TextInput
                style={styles.field}
                placeholder="SeuEmail@email.com"
                placeholderTextColor="#ccc"
                value={emailfield}
                onChangeText={setEmailField}
              />

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

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center' }}>
                  Entrar
                </Text>
              </TouchableOpacity>

              <Link href={"/Redefinir-Email"} style={{ fontSize: 16, fontFamily: 'Bold', color: 'white', textAlign: 'center', marginTop: 30 }}>
                Esqueceu a Senha?
              </Link>

              <Text style={{ fontSize: 16, fontFamily: 'Regular', color: 'white', textAlign: 'center', marginTop: 30 }}>
                Não tem conta? <Link href={"/Register"} style={{ color: 'white', fontFamily: 'Bold' }}>Registre-se</Link>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}; 

export default index;
