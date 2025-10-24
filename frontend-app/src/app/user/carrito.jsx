import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/carritoStyle";
import { useCart } from "../../../services/cartContext";
import { createOrder } from "../../../services/api";
import { useRouter } from "expo-router";

export default function Carrito() {
  const router = useRouter();
  const { clearCart, cartItems, addToCart, removeFromCart } = useCart();

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

  //  Eliminar producto directamente
  const eliminarProducto = (id_producto) => {
    removeFromCart(id_producto);
  };

  // Calcular total
  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price.replace("Q", "").trim()) * item.count,
    0
  );

  // Confirmar orden
  const confirmarOrden = async () => {
    if (cartItems.length === 0) {
      console.warn("El carrito está vacío");
      return;
    }

    try {
      const numeroOrden = Math.floor(10000 + Math.random() * 90000);
      const productosFormateados = cartItems.map((item) => ({
        id: item.id_producto,
        cantidad: item.count,
        precio_unitario: parseFloat(item.price.replace("Q", "").trim()),
      }));

      const response = await createOrder(productosFormateados, total, numeroOrden);

      if (response.status === 200 || response.status === 201) {
        setOrderId(numeroOrden);
        setConfirmando(true);
      } else {
        console.warn("No se pudo crear la orden:", response.data);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  //  Volver al home y limpiar carrito
  const volverCarrito = () => {
    setConfirmando(false);
    setOrderId(null);
    clearCart();
    router.push("/user/home");
  };

 
  return (
    <View style={styles.container}>
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
            {cartItems.length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 40 }}>
                Tu carrito está vacío 
              </Text>
            ) : (
              cartItems.map((item) => (
                <View key={item.id_producto} style={styles.productContainer}>
                  {/* Nombre */}
                  <Text style={[styles.productName, { flex: 2 }]}>{item.name}</Text>

                  {/* Cantidad */}
                  <View style={[styles.quantityContainer, { flex: 1 }]}>
                    <TouchableOpacity onPress={() => disminuir(item.id_producto)}>
                      <Ionicons name="remove-circle-outline" size={24} color="#B89A59" />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.count}</Text>

                    <TouchableOpacity onPress={() => aumentar(item.id_producto)}>
                      <Ionicons name="add-circle-outline" size={24} color="#B89A59" />
                    </TouchableOpacity>
                  </View>

                  {/* Precio */}
                  <Text style={[styles.productPrice, { flex: 1, textAlign: "right" }]}>
                    Q{(parseFloat(item.price.replace("Q", "").trim()) * item.count).toFixed(2)}
                  </Text>

                  {/* Eliminar */}
                  <TouchableOpacity
                    onPress={() => eliminarProducto(item.id_producto)}
                    style={{ marginLeft: 10 }}
                  >
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>

          {/* Total */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>Q{total.toFixed(2)}</Text>
          </View>

          {/* Confirmar */}
          <TouchableOpacity style={styles.confirmButton} onPress={confirmarOrden}>
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Pantalla de confirmación
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
