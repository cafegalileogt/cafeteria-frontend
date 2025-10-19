import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/carritoStyle";

export default function Carrito() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Torito", precio: 35.5, cantidad: 1 },
    { id: 2, nombre: "Huevos Rancheros", precio: 65.0, cantidad: 1 },
  ]);

  const [confirmando, setConfirmando] = useState(false);
  const [orderId, setOrderId] = useState(null);

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
        <Text style={styles.welcome}>Bienvenido Byron</Text>
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
            {productos.map((item) => (
              <View key={item.id} style={styles.productContainer}>
                <Text style={styles.productName}>{item.nombre}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => disminuir(item.id)}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={28}
                      color="#B89A59"
                    />
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



