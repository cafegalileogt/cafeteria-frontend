import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  headerContainer: {
    position: "relative",
    height: height * 0.15,
    justifyContent: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  welcome: {
    position: "absolute",
    left: 20,
    fontSize: width < 500 ? 22 : 24,
    fontFamily: "Nunito",
    color: "#000",
  },
  logo: {
    position: "absolute",
    top: 20,
    right: 20,
    width: width * 0.25,
    height: height * 0.06,
  },

  // Título
  title: {
    fontSize: 26,
    color: "#B89A59",
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 15,
    fontFamily: "Nunito",
  },

  // Productos
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
  },
  productName: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "Inter",
  },
  productPrice: {
    fontSize: 16,
    color: "#B89A59",
    fontFamily: "Inter",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    paddingHorizontal: 6,
  },

  // Total
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 25,
    borderTopWidth: 1,
    borderColor: "#B89A59",
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    color: "#000",
  },
  totalAmount: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },

  // Botón Confirmar
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
    marginVertical: 20,
  },
  confirmText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Nunito",
  },
});

