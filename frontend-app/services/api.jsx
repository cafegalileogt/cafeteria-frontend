const BASE_URL = "http://localhost:3000";
import { getToken, setToken } from "./storage";

export async function registerUser(name, email, password) {
  const response = await fetch(`${BASE_URL}/api/v1/users/register-student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  return { status: response.status, data };
}

export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  if (response.ok && data.token) {
    await setToken(data.token);
  }
  return data;
}

export async function recoveryPassword(email) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  return { status: response.status, data };
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  let data = {};
  try {
    data = await response.json();
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  return { status: response.status, data };
}

export async function getCategoryNames() {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/api/v1/products/getCategories`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  let data = {};
  try {
    data = await response.json();
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  return { status: response.status, data };
}

export async function getMenu() {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/api/v1/products/productos_categorias`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  let data = {};
  try {
    const json = await response.json();
    data = json.result || [];
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  return { status: response.status, data };
}

export async function createOrder(cartItems, totalAmount,orderId) {
  const token = await getToken();

  const bodyData = {
    order: {
      total: Number(totalAmount),
      numero_orden:Number(orderId),
    },
    details: cartItems.map((item) => ({
      id_producto: Number(item.id_producto || item.id),
      cantidad: Number(item.cantidad || item.count),
      precio_unitario: Number(
        item.precio_unitario || 
        item.precio || 
        parseFloat(item.price?.replace("Q", "").trim()) || 0
      ),
    })),
  };


  try {
    const response = await fetch(`${BASE_URL}/api/v1/orders/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(bodyData),
    });

    let data = {};
    try {
      const json = await response.json();
      data = json.result || json || {};
    } catch (err) {
      console.warn("No se pudo parsear JSON:", err);
    }

    console.log(" Respuesta de createOrder:", data);

    return { status: response.status, data };
  } catch (error) {
    console.error(" Error en la petición createOrder:", error);
    return { status: 500, data: {} };
  }
}

export async function getOrderHistoryByUser(){
  const order123 = { numero_orden:123, articulos:3, total:70, fecha: "10/10/2025", estado:"Pendiente Pago" };
  const order124 = { numero_orden:1234, articulos:2, total:170, fecha: "12/10/2025", estado:"Completada" }
    const order125 = { numero_orden:125, articulos:2, total:1370, fecha: "12/08/2025", estado:"Completada" }

  const result = [order123, order124,order125];
  return result;
}
