const BASE_URL = "http://localhost:3000";
import { getToken, setToken } from "./storage";
const token =  getToken();

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

export async function logOutUser(correo) {
  const _body = { email: correo};

  const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_body),
    credentials: "include"
  });

  const data = await response.json();
  return data;
}

export async function getCategoryNames() {

  const response = await fetch(`${BASE_URL}/api/v1/categories/getCategories/home`, {
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

    return { status: response.status, data };
  } catch (error) {
    console.error(" Error en la petición createOrder:", error);
    return { status: 500, data: {} };
  }
}
export async function getOrderHistoryByUser(user){
  const user_id = user.result[0].id_usuario;
  const url = `${BASE_URL}/api/v1/orders/historial/${user_id}`;

  const response = await fetch(url, {
    method:"GET",
    credentials:"include",
    headers : {
      "Content-Type": "Application-Json",
      Authorization: token ? `Bearer ${token}` : "",
    }
  })
  let data = {};
  try{
    data = await response.json();
  }catch(err){
    console.loer('Error haciendo fetch a la DB', err)
  }
  return data;
}

export async function detalleOrden(orden){

  const url = `${BASE_URL}/api/v1/orders/detalle/${orden}`;

  const response = await fetch(url, {
    "method": "Get",
    credentials: "include",
    headers: {
      "Content-Type": "Application-Json",
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
  )
  let data = {};
  try{
    data = await response.json();
    return{orden, data};
  }catch(err){
    console.error('Error con Data de detalle orden', err)
  }
}

export async function cancelOrder(numero_orden,user){
    const user_id = user.result[0].id_usuario;

  const bodyData = { 
    estado:'Cancelada',
    id_personal: user_id 
  }

  try {
    const response = await fetch(`${BASE_URL}/api/v1/orders/actualizar_estado/${numero_orden}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(bodyData),
    });
    let data = {};
    data = await response.json;
    return{status: response.status}
  
  }catch(err){
    return { 
      status: response.status || 500, 
      error: true, 
      message: err.message || "Error al procesar la respuesta",
      data: null
    };
  }
}


