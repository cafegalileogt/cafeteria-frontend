import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	title: {
		fontSize: 34,
		fontFamily: "Nunito_900Black",
		color: "#B89A59",
		textAlign: "center",
		marginVertical: 10,
	},

	// Contenedor de cada producto del carrito
	productContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between", // 👈 mantiene todo alineado horizontalmente
		paddingHorizontal: 20,
		marginVertical: 8,
	},

	productName: {
		flex: 1, // 👈 ocupa el espacio disponible
		fontSize: 18,
		fontFamily: "Inter_400Regular",
		color: "#000",
	},

	// Contenedor de botones y cantidad
	quantityContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: 90, // 👈 ancho fijo para mantener alineación
	},

	quantityText: {
		fontFamily: "Inter_400Regular",
		fontSize: 18,
		textAlign: "center",
		width: 30, // 👈 evita que el número mueva los iconos
	},

	// Precio a la derecha
	productPrice: {
		width: 75, // 👈 ancho fijo para alinear todos los precios
		textAlign: "right",
		fontSize: 16,
		color: "#B89A59",
		fontFamily: "Inter_400Regular",
		fontWeight: "600",
	},

	totalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 25,
		marginVertical: 20,
		borderTopWidth: 1,
		borderColor: "#B89A59",
		paddingTop: 10,
	},

	totalText: {
		fontFamily: "Nunito_400Regular",
		fontSize: 20,
		color: "#000",
	},

	totalAmount: {
		fontSize: 20,
		color: "#000",
		fontFamily: "Nunito_700Bold",
	},

	confirmButton: {
		backgroundColor: "#B89A59",
		alignSelf: "center",
		width: width * 0.8,
		paddingVertical: 12,
		borderRadius: 30,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		marginBottom: 20,
	},

	confirmText: {
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Nunito_400Regular",
	},

	// Estilos para confirmación
	confirmacionContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	confirmTitle: {
		fontSize: 34,
		fontFamily: "Nunito_900Black",
		fontWeight: "900",
		color: "#B89A59",
		textAlign: "center",
		marginVertical: 20,
	},

	confirmBox: {
		alignSelf: "center",
		backgroundColor: "#f9f9f9",
		width: width * 0.85,
		borderRadius: 10,
		padding: 20,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 5,
		elevation: 4,
	},

	orderText: {
		fontSize: 20,
		textAlign: "center",
		marginBottom: 10,
		fontFamily: "Inter_400Regular",
	},

	orderNumber: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},

	note: {
		textAlign: "center",
		fontSize: 15,
		marginTop: 30,
		paddingHorizontal: 20,
	},
});
