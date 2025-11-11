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

export async function updateOrden(numero_orden, estado) {
	console.log("Actualizando estado de la orden:", numero_orden);
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/orders/actualizar_estado/${numero_orden}`;
	console.log("estado para actualizar: ", estado);
	const body = {
		estado: estado.estado,
	};
	console.log("estado en el Api: ", estado.estado);

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

export async function getProductInfo(id_producto) {
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/favorites/getFavoriteByUserIdAndProductId/${id_producto}`;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.error("Error al obtener info del producto:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function addToFavorites(id_producto) {
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

		console.log("data de addToFavorites: ", data);
		return { status: response.status, data };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function deleteFromFavorites(id_producto) {
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

		console.log("data de addToFavorites: ", data);
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

		return data;
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function getSchedule() {
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/schedule/getSchedule`;
	const urlException = `${BASE_URL}/api/v1/schedule/getException`;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		});

		const responseException = await fetch(urlException, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		});

		const dias_semana = await response.json();
		const excepciones = await responseException.json();

		return { dias_semana, excepciones };
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function updateSchedule(dia, datos) {
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/schedule/updateSchedule/${dia}`;

	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
			body: JSON.stringify(datos),
		});

		const data = await response.json();

		return data;
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function createException(data) {
	let token = await getToken();
	let { fecha_excepcion, hora_apertura, hora_cierre, is_closed, descripcion } =
		data;
	const url = `${BASE_URL}/api/v1/schedule/createException`;

	const bodyData = {
		fecha_excepcion: fecha_excepcion,
		hora_apertura: hora_apertura,
		hora_cierre: hora_cierre,
		is_closed: is_closed,
		descripcion: descripcion,
	};

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
			body: JSON.stringify(bodyData),
		});

		const data = await response.json();
		console.log("que responde esa putada: ", data);

		return data;
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function deleteException(id_exception) {
	console.log("llegando a la funcion", id_exception);
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/schedule/deleteException/${id_exception}`;

	try {
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		});

		const data = await response.json();
		console.log("data de respuestas: ", data);

		return data;
	} catch (err) {
		console.error("Error agregando a favoritos:", err);
		return { status: 500, data: null, error: err.message };
	}
}

export async function isOpenStore() {
	let token = await getToken();
	const url = `${BASE_URL}/api/v1/schedule/isOpen`;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		});

		const data = await response.json();

		console.log("respuesta del horario en api: ", data);
		return data;
	} catch (err) {
		console.error("Error  Trayendo horarios", err);
		return { status: 500, data: null, error: err.message };
	}
}

//Reportes Panel Administrativo

export async function getReportOrder(from, to) {
	try {
		const token = await getToken();
		const url = `${BASE_URL}/api/v1/reports/getAllOrdersByDates?from=${from}&to=${to}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
		});

		if (!response.ok) {
			throw new Error(`Error al obtener órdenes: ${response.status}`);
		}

		const data = await response.json();
		console.log("data si es que devuelve: ", data);

		return data;
	} catch (error) {
		console.error("Error en getReportOrder:", error);
		throw error;
	}
}

export async function horasPicoReport(from, to) {
	try {
		const token = await getToken();

		const url = `${BASE_URL}/api/v1/reports/getPeakHours?from=${from}&to=${to}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
		});

		if (!response.ok) {
			throw new Error(`Error al obtener horas pico: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error en horasPicoReport:", error);
		throw error;
	}
}

export async function ventasReport(from, to) {
	console.log("horarios enviados: ", from, to);
	try {
		const token = await getToken();

		const url = `${BASE_URL}/api/v1/reports/getAllSalesByDates?from=${from}&to=${to}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
		});

		if (!response.ok) {
			throw new Error(`Error al obtener ventas: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error en ventasReport:", error);
		throw error;
	}
}

export async function masVendidosReport(from, to) {
	try {
		const token = await getToken();

		const url = `${BASE_URL}/api/v1/reports/getTopTenProductsByDates?from=${from}&to=${to}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
		});

		if (!response.ok) {
			throw new Error(
				`Error al obtener los productos más vendidos: ${response.status}`,
			);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error en masVendidosReport:", error);
		throw error;
	}
}
