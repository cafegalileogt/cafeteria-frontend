import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/carritoStyle";
import { useCart } from "../../../services/cartContext";
import { createOrder } from "../../../services/api";

export default function Carrito() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const [confirmando, setConfirmando] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const aumentar = (id_producto) => {
    const producto = cartItems.find((p) => p.id_producto === id_producto);
    if (producto) addToCart({ ...producto, count: 1 });
  };

  const disminuir = (id_producto) => {
    const producto = cartItems.find((p) => p.id_producto === id_producto);
    if (producto) {
      if (producto.count > 1) {
        addToCart({ ...producto, count: -1 });
      } else {
        removeFromCart(id_producto); 
      }
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price.replace("Q", "").trim()) * item.count,
    0
  );

  
  const confirmarOrden = async () => {
    if (cartItems.length === 0) {
      console.warn("El carrito está vacío");
      return;
    }

    try {
    
      const productosFormateados = cartItems.map((item) => ({
        id: item.id_producto,
        cantidad: item.count,
        precio_unitario: parseFloat(item.price.replace("Q", "").trim()),
      }));

      const response = await createOrder(productosFormateados, total);

      if (response.status === 200 || response.status === 201) {
        const numeroOrden = response.data.numero_orden || response.data.id || Math.floor(10000 + Math.random() * 90000);
        setOrderId(numeroOrden);
        setConfirmando(true);
      } else {
        console.warn(" No se pudo crear la orden:", response.data);
      }
    } catch (error) {
      console.error(" Error al crear la orden:", error);
    }
  };

  const volverCarrito = () => {
    setConfirmando(false);
    setOrderId(null);
  };

  return (
    <View style={styles.container}>
      {}
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
