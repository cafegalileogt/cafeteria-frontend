import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "../../styles/carritoStyle";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Carrito() {
  const router = useRouter();

  const [productos, setProductos] = useState([
    { id: 1, nombre: "Torito", precio: 35.5, cantidad: 1 },
    { id: 2, nombre: "Huevos Rancheros", precio: 65.0, cantidad: 1 },
  ]);

  const aumentar = (id) => {
    setProductos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuir = (id) => {
    setProductos((prev) =>
      prev.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const total = productos.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const confirmarOrden = () => {
    router.push("/user/confirmacion");
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

      {/* Título */}
      <Text style={styles.title}>Carrito</Text>

      {/* Productos */}
      <ScrollView style={{ flex: 1 }}>
        {productos.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => disminuir(item.id)}>
                <Ionicons name="remove-circle-outline" size={28} color="#B89A59" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.cantidad}</Text>
              <TouchableOpacity onPress={() => aumentar(item.id)}>
                <Ionicons name="add-circle-outline" size={28} color="#B89A59" />
              </TouchableOpacity>
            </View>
            <Text style={styles.productPrice}>
              Q{(item.precio * item.cantidad).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>Q{total.toFixed(2)}</Text>
      </View>

      {/* Botón Confirmar */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmarOrden}>
        <Text style={styles.confirmText}>Confirmar orden</Text>
      </TouchableOpacity>
    </View>
  );
}


