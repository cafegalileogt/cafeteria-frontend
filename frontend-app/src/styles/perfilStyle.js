import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topSection: {
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  sectionTitle: {
    fontFamily: "Playfair Display",
    fontWeight: "900",
    fontSize: 48,
    color: "#B89A59",
    marginVertical: 15,
    textAlign: "center",
  },
  // Contenido Principal
  mainSection: {
    flex: 1,
    flexDirection: "row",
  },

  // categorías
  sidebar: {
    width: "25%",
    alignItems: "center",
    borderRightWidth: 3,
    borderRightColor: "#B89A59",
    paddingVertical: 15,
  },
  categoryButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 12,
    width: width < 500 ? 70 : 80,
    paddingVertical: 8,
  },
  categoryActive: {
    backgroundColor: "#B89A59",
  },
  categoryText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "700",
    color: "#030202",
  },
  categoryTextActive: {
    color: "#fff",
  },
  iconPlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#d9d9d9",
    marginBottom: 5,
  },
  iconActiveBg: {
    backgroundColor: "#fff",
  },

  // Productos
  menuSection: {
    flex: 1,
    padding: width < 500 ? 10 : 15,
  },
    infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    marginLeft: 20,
    fontSize: 16,
    color: "#333",
  },



  
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: "30%",
    alignItems: "center",
    marginBottom: 25,
  },
  placeholderImage: {
    width: width < 500 ? 65 : 75,
    height: width < 500 ? 65 : 75,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: width < 500 ? 18 : 22,
    fontWeight: "bold",
    color: "#7b5e2a",
  },
  foodName: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#000",
    marginTop: 6,
    textAlign: "center",
  },
  foodPrice: {
    fontFamily: "Inria Sans",
    fontSize: 12,
    color: "#B89A59",
  },
});
