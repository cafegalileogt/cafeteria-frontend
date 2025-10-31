const BASE_URL = "http://localhost:3000";
import { getToken, setToken, removeToken } from "./storage";

export const requireAuth = async (navigate) => {
	const token = await getToken();
	if (!token) {
		navigate("/login"); // redirige al login si no hay token
		return false;
	}
	return true;
};

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
	const _body = { email: correo };

	try {
		const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(_body),
			credentials: "include",
		});

		await removeToken(); // <--- aquí borras el token local
		return await response.json();
	} catch (err) {
		console.error("Error haciendo logout", err);
	}
}

export async function getCategoryNames() {
	let token = await getToken();

	const response = await fetch(
		`${BASE_URL}/api/v1/categories/getCategories/home`,
		{
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		},
	);

	let data = {};
	try {
		data = await response.json();
	} catch (err) {
		console.warn("No se pudo parsear JSON:", err);
	}
	return { status: response.status, data };
}

export async function getMenu() {
	let token = await getToken();

	const response = await fetch(
		`${BASE_URL}/api/v1/products/productos_categorias`,
		{
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		},
	);

	let data = {};
	try {
		const json = await response.json();
		data = json.result || [];
	} catch (err) {
		console.warn("No se pudo parsear JSON:", err);
	}
	return { status: response.status, data };
}

export async function createOrder(cartItems, totalAmount, orderId) {
	let token = await getToken();

	const bodyData = {
		order: {
			total: Number(totalAmount),
			numero_orden: Number(orderId),
		},
		details: cartItems.map((item) => ({
			id_producto: Number(item.id_producto || item.id),
			cantidad: Number(item.cantidad || item.count),
			precio_unitario: Number(
				item.precio_unitario ||
					item.precio ||
					parseFloat(item.price?.replace("Q", "").trim()) ||
					0,
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
export async function getOrderHistoryByUser(user) {
	let token = await getToken();

	const user_id = user.result[0].id_usuario;
	const url = `${BASE_URL}/api/v1/orders/historial/${user_id}`;

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "Application-Json",
			Authorization: token ? `Bearer ${token}` : "",
		},
	});
	let data = {};
	try {
		data = await response.json();
	} catch (err) {
		console.loer("Error haciendo fetch a la DB", err);
	}
	return data;
}

export async function getTodayOrders() {
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/orders/list`;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		});

		const data = await response.json();
		return { status: response.status, data };
	} catch (err) {
		console.error("Error al obtener las órdenes del día:", err);
		return { status: 500, data: [] };
	}
}

export async function getOrderbyId(numero_orden) {
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/orders/buscar/${numero_orden}`;

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "Application-Json",
			Authorization: token ? `Bearer ${token}` : "",
		},
	});
	let data = {};
	try {
		data = await response.json();
		console.log("Data recibida en getOrderbyId $$$$$$$$$$$$$$$$$$$$: ", data);
		return { orden: numero_orden, data };
	} catch (err) {
		console.error("Error con Data de getOrderbyId", err);
	}
}

export async function detalleOrden(orden) {
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/orders/detalle/${orden}`;

	const response = await fetch(url, {
		method: "Get",
		credentials: "include",
		headers: {
			"Content-Type": "Application-Json",
			Authorization: token ? `Bearer ${token}` : "",
		},
	});
	let data = {};
	try {
		data = await response.json();
		return { orden, data };
	} catch (err) {
		console.error("Error con Data de detalle orden", err);
	}
}

export async function detalleOrden2(numero_orden) {
	console.log("Número de orden en detalleOrden2: ", numero_orden);
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/orders/detalle/${numero_orden}`;

	const response = await fetch(url, {
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
		return { orden: numero_orden, data };
	} catch (err) {
		console.error("Error obteniendo detalle de orden:", err);
		return { orden: numero_orden, data: null, error: err.message };
	}
}

export async function updateOrden(numero_orden) {
	console.log("Actualizando estado de la orden:", numero_orden);
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/orders/actualizar_estado/${numero_orden}`;

	const body = {
		estado: "En preparacion",
	};

	const response = await fetch(url, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : "",
		},
		body: JSON.stringify(body),
	});

	let data = {};
	try {
		data = await response.json();
		console.log("Respuesta de actualización:", data);
		return { orden: numero_orden, data };
	} catch (err) {
		console.error("Error actualizando orden:", err);
		return { orden: numero_orden, data: null, error: err.message };
	}
}

export async function cancelOrder(numero_orden, user) {
	let token = await getToken();
	const user_id = user.result[0].id_usuario;

	const bodyData = {
		estado: "Cancelada",
		id_personal: user_id,
	};

	try {
		const response = await fetch(
			`${BASE_URL}/api/v1/orders/actualizar_estado/${numero_orden}`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: token ? `Bearer ${token}` : "",
				},
				body: JSON.stringify(bodyData),
			},
		);
		let data = {};
		data = await response.json;
		return { status: response.status };
	} catch (err) {
		return {
			status: response.status || 500,
			error: true,
			message: err.message || "Error al procesar la respuesta",
			data: null,
		};
	}
}

export async function updateProduct(id_producto, payload) {
	const { nombre, precio, descripcion, imagen_producto, estado } = payload;
	let token = await getToken();
	let _body = {
		nombre: nombre,
		precio: precio,
		descripcion: descripcion,
		estado: estado,
		imagen_producto: imagen_producto,
	};
	try {
		const response = fetch(
			`${BASE_URL}/api/v1/products/update_product/${id_producto}`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: token ? `Bearer ${token}` : "",
				},
				body: JSON.stringify(_body),
			},
		);
		let data = {};
		data = await response.json;
		return { status: response.status };
	} catch (err) {
		console.error("Error en updateProduct", err);
	}
}

export async function createProduct(id_categoria, payload) {
	console.log("Payload de createProduct: ", payload);
	const { nombre, precio, descripcion, imagen_producto, estado } = payload;
	let token = await getToken();
	let _body = {
		nombre: nombre,
		precio: precio,
		descripcion: descripcion,
		estado: estado,
		imagen_producto: imagen_producto,
		id_categoria: id_categoria,
	};
	try {
		const response = fetch(`${BASE_URL}/api/v1/products/create_product`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
			body: JSON.stringify(_body),
		});
		let data = {};
		data = await response.json;
		return { status: response.status };
	} catch (err) {
		console.error("Error en updateProduct", err);
	}
}

export async function createCategory(payload) {
	const { nombre, horario, imagen_categoria } = payload;
	let token = await getToken();
	let _body = {
		nombre: nombre,
		horario: horario,
		imagen_categoria: imagen_categoria,
	};
	try {
		const response = fetch(`${BASE_URL}/api/v1/categories/postCategory`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
			body: JSON.stringify(_body),
		});
		let data = {};
		data = await response.json;
		return { status: response.status };
	} catch (err) {
		console.error("Error en updateProduct", err);
	}
}

export async function updateCategory(id_categoria, payload) {
	const { nombre, horario, estado, imagen_categoria } = payload;
	let token = await getToken();
	let _body = {
		nombre: nombre,
		horario: horario,
		estado: estado,
		imagen_categoria: imagen_categoria,
	};
	try {
		const response = fetch(
			`${BASE_URL}/api/v1/categories/updateCategory/${id_categoria}`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: token ? `Bearer ${token}` : "",
				},
				body: JSON.stringify(_body),
			},
		);
		let data = {};
		data = await response.json;
		return { status: response.status };
	} catch (err) {
		console.error("Error en updateProduct", err);
	}
}

export async function deleteCategory(numero_orden, user) {}

export async function uploadImageToCloudinary(fileUri) {
	try {
		const formData = new FormData();

		// Usar fileUri, no imageUri
		const response = await fetch(fileUri);
		const blob = await response.blob();

		formData.append("imagen", blob, "imagen.jpg");

		const uploadResponse = await fetch(
			`${BASE_URL}/api/v1/uploads/uploadImage`,
			{
				method: "POST",
				body: formData,
			},
		);

		const data = await uploadResponse.json();
		console.log("data de upload image:", data);

		return data;
	} catch (error) {
		console.error("Error subiendo imagen:", error);
		return null;
	}
}

<<<<<<< HEAD
export async function getProductInfo( id_producto) {
  let token = await getToken();
 const url = `${BASE_URL}/api/v1/favorites/getFavoriteByUserIdAndProductId/${id_producto}`;

 try{
  const response = await fetch(url, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
  });
    const data = await response.json();
    return data;
 }catch(err){
    console.error("Error al obtener info del producto:", err);
    return { status: 500, data: null, error: err.message };
 }
=======
export async function getFavorites(id_usuario, id_producto) {
	//   let token = await getToken();
	//  const url = `${BASE_URL}/api/v1/favorites/add`;

	try {
		//   const response = await fetch(url, {
		//     method:"GET",
		//     headers: {
		//       "Content-Type": "application/json",
		//       "Authorization": token ? `Bearer ${token}` : "",
		//     }
		//   })
		//     const data = await response.json();
		//     let datadePrueba = {
		//       "is_Favorite": true
		//     }
		let datadePrueba = {
			is_Favorite: true,
		};
>>>>>>> origin/feature/admin-reportes

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

<<<<<<< HEAD

export async function addToFavorites( id_producto) {
  let token = await getToken();
  const url = `${BASE_URL}/api/v1/favorites/postFavorite/${id_producto}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await response.json();

    console.log('data de addToFavorites: ', data)
    return { status: response.status, data };
  } catch (err) {
    console.error("Error agregando a favoritos:", err);
    return { status: 500, data: null, error: err.message };
  }
} 

export async function deleteFromFavorites( id_producto) {
  let token = await getToken();
  const url = `${BASE_URL}/api/v1/favorites/deleteFavorite/${id_producto}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await response.json();

    console.log('data de addToFavorites: ', data)
    return { status: response.status, data };
  } catch (err) {
    console.error("Error agregando a favoritos:", err);
    return { status: 500, data: null, error: err.message };
  }
} 

export async function getAllFavoritesById() {
let token = await getToken();
  const url = `${BASE_URL}/api/v1/favorites/getFavoritesByUserId`;


  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await response.json();
    
    return  data ;
  } catch (err) {
    console.error("Error agregando a favoritos:", err);
    return { status: 500, data: null, error: err.message };
  }
=======
export async function addToFavorites(id_usuario, id_producto) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/favorites/add`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();
		let datadePrueba = {
			is_Favorite: true,
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function getAllFavoritesById(id_usuario) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/favorites/allFavoritesByUserId`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1
		let datadePrueba = [
			{
				id_producto: "1",
				nombre: "panqueques",
				precio: "45",
				imagen_producto:
					"https://res.cloudinary.com/dlxw0jdft/image/upload/v1761615228/cafeteria-galileo/js3nymzx4xtjejanfzx2.webp",
			},
			{
				id_producto: "2",
				nombre: "Omelettes",
				precio: "45",
				imagen_producto:
					"https://res.cloudinary.com/dlxw0jdft/image/upload/v1760999507/Omelette-1_yz6sqi.webp",
			},
			{
				id_producto: "3",
				nombre: "Torito",
				precio: "50",
				imagen_producto:
					"https://res.cloudinary.com/dlxw0jdft/image/upload/v1760999508/Torito-1_qyrfmd.webp",
			},
			{
				id_producto: "4",
				nombre: "Big Burger",
				precio: "50",
				imagen_producto:
					"https://res.cloudinary.com/dlxw0jdft/image/upload/v1760999563/almuerzo_mizkus.png",
			},
			{
				id_producto: "5",
				nombre: "panqueques",
				precio: "45",
				imagen_producto:
					"https://res.cloudinary.com/dlxw0jdft/image/upload/v1761615228/cafeteria-galileo/js3nymzx4xtjejanfzx2.webp",
			},
		];
		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
>>>>>>> origin/feature/admin-reportes
}

export async function getSchedule() {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/favorites/allFavoritesByUserId`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			dias_semana: [
				{
					schedule_id: 1,
					dia: "Lunes",
					open_time: "07:00:00",
					close_time: "21:00:00",
					is_closed: 0,
				},
				{
					schedule_id: 2,
					dia: "Martes",
					open_time: "07:00:00",
					close_time: "21:00:00",
					is_closed: 0,
				},
				{
					schedule_id: 3,
					dia: "Miércoles",
					open_time: "07:00:00",
					close_time: "21:00:00",
					is_closed: 0,
				},
				{
					schedule_id: 4,
					dia: "Jueves",
					open_time: "07:00:00",
					close_time: "21:00:00",
					is_closed: 0,
				},
				{
					schedule_id: 5,
					dia: "Viernes",
					open_time: "07:00:00",
					close_time: "21:00:00",
					is_closed: 0,
				},
				{
					schedule_id: 6,
					dia: "Sábado",
					open_time: "07:00:00",
					close_time: "21:00:00",
					is_closed: 0,
				},
				{
					schedule_id: 7,
					dia: "Domingo",
					open_time: null,
					close_time: null,
					is_closed: 1,
				},
			],
			excepciones: [
				{
					exception_id: 1,
					fecha: "2025-10-20",
					open_time: "07:00:00",
					close_time: "21:00:00",
					is_closed: 0,
					descripcion: "Día de la Revolución",
				},
				{
					exception_id: 2,
					fecha: "2025-12-25",
					open_time: null,
					close_time: null,
					is_closed: 1,
					descripcion: "Navidad",
				},
			],
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function updateSchedule(dia, open_time, close_time, is_closed) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/schedule/updateSchedule/$[dia]`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			Mensaje: "fecha actualizada correctamente",
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function createException(
	fecha,
	open_time,
	close_time,
	is_closed,
	description,
) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/schedule/updateSchedule/$[dia]`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			Mensaje: "fecha actualizada correctamente",
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function deleteException(id_exception) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/schedule/updateSchedule/${id_exception}`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			Mensaje: "Excepción elminada correctamente",
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function isOpenStore() {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/schedule/isOpen`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			Mensaje: "Cafetería abierta",
			is_closed: false,
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function getReportOrder(from, to) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/report/orders?${from}&to${to}`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			from: "2025-10-01",
			to: "2025-10-25",
			total_orders: 2,
			orders: [
				{
					order_id: 89459,
					user_id: 2,
					email: "byron@galileo.com",
					fecha_actualizacion: "2025-10-25T10:15:00",
					estado: "Completada",
					total: 85.5,
					personal_id: 4,
					payment_id: 1,
				},
				{
					order_id: 89460,
					user_id: 41,
					email: "karla@gmail.com",
					fecha_actualizacion: "2025-10-25T10:40:00",
					estado: "En preparación",
					total: 72.0,
					personal_id: 2,
					payment_id: null,
				},
			],
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function horasPicoReport(from, to) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/report/horasPico?${from}&to${to}`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			from: "2025-10-01",
			to: "2025-10-31",
			horas_pico: [
				{ hour: "09:00", orders: 40 },
				{ hour: "10:00", orders: 52 },
				{ hour: "11:00", orders: 38 },
				{ hour: "12:00", orders: 60 },
				{ hour: "13:00", orders: 70 },
				{ hour: "14:00", orders: 21 },
				{ hour: "15:00", orders: 29 },
				{ hour: "16:00", orders: 43 },
			],
			most_active_hour: "13:00",
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function ventasReport(from, to) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/report/sales?${from}&to${to}`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			from: "2025-10-01",
			to: "2025-10-31",
			total_sales: 15625.75,
			daily_sales: [
				{ date: "2025-10-01", orders: 35, total: 980.5 },
				{ date: "2025-10-02", orders: 28, total: 820.75 },
				{ date: "2025-10-03", orders: 42, total: 1150.0 },
			],
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function masVendidosReport(from, to) {
	// let token = await getToken();
	// const url = `${BASE_URL}/api/v1/report/masVendidos?limit=10&${from}&to${to}`;

	// const bodyData = {
	//   id_usuario: userId,
	//   id_producto: productId,
	// };

	try {
		//   const response = await fetch(url, {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//       Authorization: token ? `Bearer ${token}` : "",
		//     },
		//     body: JSON.stringify(bodyData),
		//   });

		//   const data = await response.json();

		//deben filtrar por estado, traer estado 1

		let datadePrueba = {
			from: "2025-10-01",
			to: "2025-10-31",
			top_products: [
				{ id_producto: 1, name: "torito", sold_times: 130, total: 1950.0 },
				{ id_producto: 2, name: "Panqueques", sold_times: 98, total: 1470.0 },
				{ id_producto: 7, name: "Hamburguesa", sold_times: 85, total: 1020.0 },
			],
		};

		return datadePrueba;
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}
