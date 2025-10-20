const BASE_URL = "http://localhost:3000";
  import { getToken, setToken} from "./storage";

export async function registerUser(name, email, password) {
  let response = await fetch(`${BASE_URL}/api/v1/users/register-student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  let data = {};
  try {
    data = await response.json(); 
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  return {
    status: response.status,
    data,
  };
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
  console.log("Data de login", data);
  return data;
}


export async function recoveryPassword(email){
    let response = await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    });
    let data={};
    try{
        data = await response.json();
    }catch(err){
        console.warn("no se pudo parsear Json: ",err);
    }
    return {
        status: response.status,
        data
    }
}

export async function logout(){
  let response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = {};
  try {
    data = await response.json(); 
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  return {
    status: response.status,
    data,
  };

}

export async function getCategoryNames() {
  const token = await getToken(); 
  console.log('token1: ', token)
  let response = await fetch(`${BASE_URL}/api/v1/products/getCategories`, {
    method: "GET", 
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  let data = {};
  try {
    const json = await response.json();
    data = json || null;
  } catch (err) {
    console.warn("No se pudo parsear JSON:", err);
  }

  return {
    status: response.status,
    data,
  };
}

export async function getMenu() {
  const token = await getToken(); 
  let response = await fetch(`${BASE_URL}/api/v1/products/productos_categorias`, {
    method: "GET",
    credentials:"include",
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

  return {
    status: response.status,
    data,
  };
}
  
