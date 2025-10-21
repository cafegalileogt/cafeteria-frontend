import { Platform } from "react-native";
let AsyncStorage;

if (Platform.OS !== "web") {
  // Carga condicional — evita romper el bundle web
  AsyncStorage = require("@react-native-async-storage/async-storage").default;
}

export async function getToken() {
  if (Platform.OS === "web") {
    return localStorage.getItem("token");
  } else {
    return await AsyncStorage.getItem("token");
  }
}

export async function setToken(token) {
  if (Platform.OS === "web") {
    localStorage.setItem("token", token);
  } else {
    await AsyncStorage.setItem("token", token);
  }
}

export async function removeToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem("token");
  } else {
    await AsyncStorage.removeItem("token");
  }
}