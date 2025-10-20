import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/carritoStyle";
import { useSearchParams } from "expo-router";
import { useCart } from "../../../services/cartContext";

export default function Carrito() {
  const carro = useCart();
  console.log('carrito perro', carro)
  const { cartItems, addToCart, removeFromCart } = useCart(); 
  const [confirmando, setConfirmando] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Funciones para aumentar y disminuir cantidad
  const aumentar = (id_producto) => {
    const producto = cartItems.find(p => p.id_producto === id_producto);
    if (producto) addToCart({ ...producto, count: 1 });
  };

  const disminuir = (id_producto) => {
    const producto = cartItems.find(p => p.id_producto === id_producto);
    if (producto && producto.count > 1) {
      // Se resta 1 usando addToCart con count negativo
      addToCart({ ...producto, count: -1 });
    } else if (producto && producto.count === 1) {
      removeFromCart(id_producto);
    }
  };
  console.log("🛒 Carrito actual:", cartItems);

 const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price.replace("Q", "")) * item.count,
    0
  );

  const confirmarOrden = () => {
    const randomOrder = Math.floor(10000 + Math.random() * 90000);
    setOrderId(randomOrder);
    setConfirmando(true);
  };

  const volverCarrito = () => {
    setConfirmando(false);
    setOrderId(null);
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

      {!confirmando ? (
        <>
          <Text style={styles.title}>Carrito</Text>

          <ScrollView style={{ flex: 1 }}>
            {cartItems.map((item) => (
              <View key={item.id_producto} style={styles.productContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => disminuir(item.id_producto)}>
                    <Ionicons name="remove-circle-outline" size={28} color="#B89A59" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.count}</Text>
                  <TouchableOpacity onPress={() => aumentar(item.id_producto)}>
                    <Ionicons name="add-circle-outline" size={28} color="#B89A59" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.productPrice}>
  Q{(parseFloat(item.price.replace("Q", "").trim()) * item.count).toFixed(2)}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>Q{total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={confirmarOrden}>
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </>
      ) : (
        // 🔸 Pantalla de confirmación
        <View style={styles.confirmacionContainer}>
          <Text style={styles.confirmTitle}>¡Ya casi está listo!</Text>

          <View style={styles.confirmBox}>
            <Text style={styles.orderText}>No. de Orden</Text>
            <Text style={styles.orderNumber}>{orderId}</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={volverCarrito}>
              <Text style={styles.confirmText}>Aceptar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.note}>
            ¡Ahora puedes acercarte a la cafetería a cancelar la orden, recuerda
            dar tu nombre o número de orden!
          </Text>
        </View>
      )}
    </View>
  );
}



