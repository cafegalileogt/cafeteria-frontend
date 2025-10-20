import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "../../styles/homeStyle";
import { useRouter } from "expo-router";
import { getMenu,getCategoryNames } from "../../../services/api";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Desayunos");
  const [menu, setMenu] = useState({});
  const [categories, setCategories] = useState([]);

useEffect(() => {
  async function fetchCategories() {
    try {
      const response = await getCategoryNames();

      if (response.status === 200 || response.ok) {
        setCategories(response.data.result);
      } else {
        console.error("Error al obtener categorías:", response);
      }
    } catch (error) {
      console.error("Error al traer categorías:", error);
    }
  }

  fetchCategories();
}, []);

 useEffect(() => {
  async function fetchMenu() {
    try {
      const newMenu = await getMenu();

      const groupedMenu = newMenu.data.reduce((acc, item) => {
        const categoryObj = categories.find(
          (cat) => cat.id_categoria === item.id_categoria
        );
        const categoryName = categoryObj
          ? categoryObj.nombre
          : `Categoría ${item.id_categoria}`;

        if (!acc[categoryName]) acc[categoryName] = [];

        acc[categoryName].push({
          name: item.nombre,
          price: `Q${item.precio}`,
          descripcion: item.descripcion,
          imagen: item.imagen_producto,
        });

        return acc;
      }, {});
      setMenu(groupedMenu);
    } catch (error) {
      console.error("Error al obtener menú:", error);
    }
  }

  if (categories.length > 0) {
    fetchMenu();
  }
}, [categories]);

const currentMenu = menu || {};
  const router = useRouter();
const viewProduct = (item) => {

    router.push(
    `/user/vistaProducto?` +
    `name=${encodeURIComponent(item.name)}` +
    `&price=${encodeURIComponent(item.price)}` +
    `&imagen=${encodeURIComponent(item.imagen)}` +
    `&descripcion=${encodeURIComponent(item.descripcion)}`
  );
};
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../../assets/Galileo Fondo-Comida.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <Text style={styles.welcome}>Bienvenido Usuario</Text>
        <Image
          source={require("../../../assets/Galileo Cafe-Negro.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Contenido principal */}
      <View style={styles.mainSection}>
        {/* Sidebar de categorías */}
        <View style={styles.sidebar}>
          {categories.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.categoryButton,
                activeCategory === cat.nombre && styles.categoryActive,
              ]}
              onPress={() => setActiveCategory(cat.nombre)}
            >
              {cat.imagen_categoria && (
                <Image
                  source={{ uri: cat.imagen_categoria }}
                  style={styles.iconPlaceholder}
                />
              )}
              
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat.nombre && styles.categoryTextActive,
                ]}
              >
                {cat.nombre}
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
            {currentMenu[activeCategory]?.map((item, index) => (
            <View key={index} style={styles.card}>
               <TouchableOpacity onPress={() => viewProduct(item)}>
                <Image
                  source={{ uri: item.imagen }}
                  style={styles.placeholderImage}
                />
              </TouchableOpacity>
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