import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../../styles/vistaProductoStyle";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Producto from "../../components/producto";
import { useUser } from "../../../services/userContext";

// Funciones de backend
import { getProductInfo, addToFavorites, deleteFromFavorites } from "../../../services/api";

export default function VistaProducto() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { name, price, imagen, descripcion, id_producto } = params;
  const { user } = useUser(); 
  const [isFavorite, setIsFavorite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await getProductInfo(id_producto);
        console.log("response de getProductInfo:", response);
        setIsFavorite(response.is_favorite);
      } catch (error) {
        console.log("Error al obtener info del producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductInfo();
  }, [id_producto, user.id_usuario]);

  const backPage = () => {
    router.push("/user/home");
  };

  const toggleFavorite = async () => {
    try {
      // Cambiar inmediatamente el estado visual
      setIsFavorite((prev) => !prev);

      if (isFavorite) {
        // Si ya estaba en favoritos, eliminarlo
        const response = await deleteFromFavorites(id_producto);
        console.log("Eliminado de favoritos:", response);
        setIsFavorite(response.is_favorite ?? false);
      } else {
        // Si no estaba en favoritos, agregarlo
        const response = await addToFavorites(id_producto);
        console.log("Agregado a favoritos:", response);
        setIsFavorite(response.is_favorite ?? true);
      }
    } catch (error) {
      console.log("Error al actualizar favoritos:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header con fondo */}
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

      {/* Flecha y corazón */}
      <View style={styles.topIconsContainer}>
        <TouchableOpacity onPress={backPage}>
          <Ionicons name="arrow-back-outline" style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            style={[styles.arrow, { marginLeft: 15, color: isFavorite ? "red" : "black" }]}
          />
        </TouchableOpacity>
      </View>

      {/* Producto */}
      <Producto
        name={name}
        price={price}
        imagen={imagen}
        descripcion={descripcion}
        id_producto={id_producto}
      />
    </View>
  );
}