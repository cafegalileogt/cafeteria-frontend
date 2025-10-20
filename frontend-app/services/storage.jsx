import { Platform } from "react-native";
let AsyncStorage;

if (Platform.OS !== "web") {
  // Carga condicional — evita romper el bundle web
  AsyncStorage = require("@react-native-async-storage/async-storage").default;
}

export async function getToken() {
  console.log("dentro de la funcion gettoken")
  if (Platform.OS === "web") {
    console.log("1")
    return localStorage.getItem("token");
  } else {
    console.log("2")
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