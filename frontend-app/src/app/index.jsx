import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import styles from "../styles/indexStyle";

export default function App() {
  const handleLogin = () => {};

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.page}>
      <View style={styles.circle}>
        <Image
          source={require("../../assets/coffee-background.jpg")}
          style={styles.bgimg}
        ></Image>
        <Image
          source={require("../../assets/Galileo Cafe-Blanco.png")}
          style={styles.img}
        ></Image>
      </View>
      <View style={styles.container}>
        <View style={styles.switchButtons}>
          <TouchableOpacity
            style={
              activeTab === "login" ? styles.activeTab : styles.inactiveTab
            }
            onPress={() => setActiveTab("login")}
          >
            <Text
              style={
                activeTab === "login" ? styles.activeText : styles.inactiveText
              }
            >
              Iniciar sesión
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === "register" ? styles.activeTab : styles.inactiveTab
            }
            onPress={() => setActiveTab("register")}
          >
            <Text
              style={
                activeTab === "register"
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          {/* Formulario Login */}
          {activeTab === "login" ? (
            <>
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

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginText}>Iniciar sesión</Text>
              </TouchableOpacity>

              {/* Enlace a recuperación */}
              <TouchableOpacity onPress={() => router.push("/forgot")}>
                <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Formulario Registro */}
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
              <Text style={styles.text}>Confirmar Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleRegister}
              >
                <Text style={styles.loginText}>Registrarse</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
