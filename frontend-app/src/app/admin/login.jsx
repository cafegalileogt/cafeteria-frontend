import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "../../styles/adminLoginStyle";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Debes llenar todos los campos.");
      return;
    }

    if (!email.endsWith("@galileo.edu")) {
      Alert.alert("Error", "Solo se permiten correos de dominio @galileo.edu");
      return;
    }

    router.push("/admin/home");
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Panel Administrativo</Text>
        <View style={styles.box}>
          <Text style={styles.text}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/screens/passRec")}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rectangle}>
        <Image
          source={require("../../../assets/Galileo Cafe-Negro.png")}
          style={styles.img}
          resizeMode="contain"
        ></Image>
      </View>
    </View>
  );
}
