import { ImageBackground, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styleshome from '../assets/css/Stylehome';
import { Link, router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const home = require('../assets/background.jpg');


const Home = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styleshome.home} edges={['left', 'right']}>
                <ImageBackground source={home} style={styleshome.homeimage}>
                    <View style={styleshome.overlay} />
                    <View> 
                    <Text style={styleshome.hometext}>
                        Player Search
                    </Text>
                    </View>
                    <View style={styleshome.homecontainer}>
                    </View>
                    <View style={styleshome.bottomBar}>

                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};



export default Home;

