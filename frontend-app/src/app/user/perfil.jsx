import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "../../styles/perfilStyle";
import { useRouter } from "expo-router";
import { getMenu,getCategoryNames } from "../../../services/api";
import Header from "../../components/header";
import { useUser } from "../../../services/userContext";
import { Ionicons } from "@expo/vector-icons";


export default function perfil() {
  const router = useRouter();
  const {user } = useUser();

  const history = () => {
    router.push("/screens/historial");
  }
 
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header></Header>

      {/* Contenido principal */}
      <View style={styles.topSection}>
        <Ionicons name="person-circle-outline" size={100}/> 
        <Text style={styles.sectionTitle}> Información de Usuario </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={32}/> 
          <Text style={styles.infoText}>{user?.nombreCompleto}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail" size={32}/> 
          <Text style={styles.infoText}>{user?.correo}</Text>
        </View>
        <TouchableOpacity onPress={() => history()} >
          <View style={styles.infoRow}>
            <Ionicons name="timer" size={32}/> 
            <Text style={styles.infoText}>Historial</Text>

          </View>
        </TouchableOpacity>

        <View style={styles.infoRow}>
          <Ionicons name="log-out" size={32}/> 
          <Text style={styles.infoText}>Logout</Text>
        </View>

      </View>

    </View>
  );
}