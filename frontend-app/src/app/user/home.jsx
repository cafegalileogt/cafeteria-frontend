import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "../../styles/homeStyle";
import { useRouter } from "expo-router";
<<<<<<< Updated upstream
import { getMenu, getCategoryNames } from "../../../services/api";
import * as SplashScreen from "expo-splash-screen";
import { Nunito_500Medium, useFonts } from "@expo-google-fonts/nunito";
=======
import { getMenu,getCategoryNames } from "../../../services/api";
import Header from "../../components/header";
>>>>>>> Stashed changes

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Desayunos");
  const [menu, setMenu] = useState({});
  const [categories, setCategories] = useState([]);

  const [loaded, error] = useFonts({
    Nunito_500Medium,
  });

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
            id_producto: item.id_producto,
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
        `&descripcion=${encodeURIComponent(item.descripcion)}` +
        `&id_producto=${encodeURIComponent(item.id_producto)}`
    );
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header></Header>

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
