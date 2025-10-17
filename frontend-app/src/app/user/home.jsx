import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import styles from "../../styles/homeStyle";
import { logout } from "../../../services/api";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Desayunos");
  const router = useRouter();

  // Datos simulados 
  const menu = {
    Desayunos: [
      { name: "Torito", price: "Q35.50" },
      { name: "Croissant", price: "Q25.00" },
      { name: "Panqueques", price: "Q25.00" },
      { name: "Omelette", price: "Q30.00" },
      { name: "Típico", price: "Q28.00" },
      { name: "Huevos Rancheros", price: "Q30.00" },
      { name: "Huevos Divorciados", price: "Q30.00" },
    ],
    Almuerzos: [
      { name: "Hamburguesa", price: "Q40.00" },
      { name: "Club Sandwich", price: "Q38.00" },
      { name: "Pollo Frito", price: "Q35.00" },
    ],
    Postres: [
      { name: "Flan de Fresa", price: "Q15.00" },
      { name: "Pastel", price: "Q18.00" },
    ],
    Bebidas: [
      { name: "Licuado", price: "Q12.00" },
      { name: "Café", price: "Q10.00" },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header con fondo */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../../assets/Galileo Fondo-Comida.png")}
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.welcome}>Bienvenido</Text>
        <Image
          source={require("../../../assets/Galileo Cafe-Negro.png")}
          style={styles.logo}
        />
      </View>

      {/* Contenido principal */}
      <View style={styles.mainSection}>
        {/* Sidebar de categorías */}
        <View style={styles.sidebar}>
          {Object.keys(menu).map((category, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.categoryActive,
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <View
                style={[
                  styles.iconPlaceholder,
                  activeCategory === category && styles.iconActiveBg,
                ]}
              />
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de productos */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{activeCategory}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuGrid}
          >
            {menu[activeCategory].map((item, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>{item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}