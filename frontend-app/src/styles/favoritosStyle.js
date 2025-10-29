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
    fontWeight: "900",
    color: "#B89A59",
    textAlign: "center",
    marginVertical: 10,
  },

  // 🔹 Tarjeta individual
  card: {
    width: width / 2.3,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#EAEAEA",
  },

  name: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#000",
    textAlign: "center",
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    color: "#B89A59",
    fontFamily: "Inter_400Regular",
    marginTop: 5,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  addButton: {
    backgroundColor: "#B89A59",
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },

  noDataText:{
  marginTop: 100,
  marginHorizontal: 10,  
  backgroundColor: "#F8F8F8",
  padding: 20,
  shadowColor: "#000",
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  borderRadius: 8,    textAlign: "center",
    color:"#f23030ff",
    fontWeight: "bold"
  },
});