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
    height: height * 0.25,
    justifyContent: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  welcome: {
    position: "absolute",
    top: "80%",
    left: 20,
    fontSize: 22,
    fontFamily: "Nunito",
    color: "#000",
  },
  logo: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 110,
    height: 50,
    resizeMode: "contain",
  },

  // Contenido principal
  mainSection: {
    flex: 1,
    flexDirection: "row",
  },

  // Barra lateral
  sidebar: {
    width: "25%",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#B89A59",
    paddingVertical: 15,
  },
  categoryButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 12,
    width: 80,
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
    padding: 15,
  },
  sectionTitle: {
    fontFamily: "Playfair Display",
    fontWeight: "900",
    fontSize: 38,
    color: "#000",
    marginVertical: 15,
    textAlign: "center",
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
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7b5e2a",
  },
  foodName: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#000",
    marginTop: 6,
  },
  foodPrice: {
    fontFamily: "Inria Sans",
    fontSize: 12,
    color: "#B89A59",
  },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  footerIcon: {
    fontSize: 28,
    color: "#ccc",
  },
  footerIconActive: {
    color: "#B89A59",
  },
});

