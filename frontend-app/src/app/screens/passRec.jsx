import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles/passRecStyle";
import { recoveryPassword } from "../../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetPassword = async() => {
    if (!email.endsWith("@galileo.edu")) {
      Alert.alert("Error", "Solo se permiten correos de dominio @galileo.edu");
      return;
    }

    const recovery = await recoveryPassword(email);
    console.log('Respuesta de Recovery Password: ', recovery)
    
    if (recovery.status !== 200) {
      Alert.alert("Error",  "Ocurrió un problema, intenta de nuevo");
      return;
    }

    Alert.alert(
      "Recuperación enviada",
      "Hemos enviado un correo para restablecer tu contraseña."
    );
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        placeholder="usuario@galileo.edu"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar recuperación</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
