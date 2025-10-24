import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "../styles/homeStyle";
import { useUser } from "../../services/userContext";

export default function Header({ name, price, imagen, descripcion, id_producto }) {
  const {user} = useUser();
return(
    <View style={styles.headerContainer}>
        {/* Header */}
            <Image
            source={require("../../assets/Galileo Fondo-Comida.png")}
            style={styles.headerImage}
            resizeMode="cover"
            />
            <View style={styles.overlay} />
            <Text style={styles.welcome}>Bienvenido {user?.nombre}</Text>
            <Image
            source={require("../../assets/Galileo Cafe-Negro.png")}
            style={styles.logo}
            resizeMode="contain"
            />
    </View>
)
}
