import {  
  Text,
  View,
  TouchableOpacity,
 
 } from "react-native";
import styles from "../../styles/globals";
import { logout } from "../../../services/api";
import { useRouter } from "expo-router";
 


export default function HomeScreen() {
      const router = useRouter();
      const handleLogout = async () => {
      const data = await logout();
      console.log("data", data);
      if (data.status !== 200) {
        Alert.alert("Error", data?.data?.message || "Error al cerrar sesión");
        return;
      }
      router.push("/");
    }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido!</Text>
      
            <TouchableOpacity style={styles.logOutbutton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Cerrar Sesión </Text>
            </TouchableOpacity>

    </View>
  );
}

