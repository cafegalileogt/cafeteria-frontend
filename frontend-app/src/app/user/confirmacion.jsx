import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../../styles/confirmacionStyle";
import { useRouter } from "expo-router";

export default function Confirmacion() {
  const router = useRouter();

  const volverHome = () => {
    router.push("/user/home");
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

      {/* Confirmación */}
      <View style={styles.confirmationContainer}>
        <Text style={styles.confirmTitle}>¡Ya casi está listo!</Text>

        <View style={styles.orderBox}>
          <Text style={styles.orderText}>No. de Orden</Text>
          <Text style={styles.orderNumber}>12345</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={volverHome}>
          <Text style={styles.confirmText}>Aceptar</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          ¡Ahora puedes acercarte a la cafetería a cancelar la orden, recuerda
          dar tu nombre o número de orden!
        </Text>
      </View>
    </View>
  );
}



