import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../../styles/vistaProductoStyle";
import { Ionicons } from "@expo/vector-icons";
import { useRouter,useLocalSearchParams } from "expo-router";
import Producto from "../../components/producto";

export default function vistaProducto({item}) {
 const router = useRouter();
  const params = useLocalSearchParams();
  const { name, price, imagen, descripcion } = params;

  const backPage = () => {
    router.push("/user/home");
  };

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
      <TouchableOpacity onPress={() => backPage()}>
        <Ionicons name={"arrow-back-outline"} style={styles.arrow} />
      </TouchableOpacity>
      <Producto
        name={name}
        price={price}
        imagen={imagen}
        descripcion={descripcion}
      />
    </View>
  );
}
