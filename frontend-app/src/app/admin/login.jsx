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
import { loginUser } from "../../../services/api";
import { useState } from "react";
import { useUser } from "../../../services/userContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert("Error", "Debes llenar todos los campos.");
      return;
    }

    if (!email.endsWith("@galileo.edu")) {
      Alert.alert("Error", "Solo se permiten correos de dominio @galileo.edu");
      return;
    }
    console.log('Prueba login: ', email, password)
    const dataLogin = await loginUser(email, password);
    if (!dataLogin.token) {
      Alert.alert(dataLogin.message);
      return;
    }
    const result = dataLogin.result[0]
    const nombreCompleto = result.nombre;
    const primerNombre = nombreCompleto.split(" ")[0];
    const userId = result.id_usuario;
    const correo = result.correo_institucional;

  setUser({ ...dataLogin, nombre: primerNombre, userId, nombreCompleto,correo });
    

    router.push("/admin/ordenes");
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
<View style={styles.rectangle} pointerEvents="none">
  <Image
    source={require("../../../assets/Galileo Cafe-Negro.png")}
    style={styles.img}
    resizeMode="contain"
  />
</View>
    </View>
  );
}
