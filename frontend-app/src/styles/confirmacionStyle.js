import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

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

  confirmationContainer: {
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  confirmTitle: {
    fontSize: 28,
    color: "#B89A59",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  orderBox: {
    backgroundColor: "#F9F9F9",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    marginBottom: 30,
  },
  orderText: {
    fontSize: 18,
    color: "#000",
  },
  orderNumber: {
    fontSize: 26,
    color: "#000",
    fontWeight: "bold",
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
    marginVertical: 20,
  },
  confirmText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Nunito",
  },
  note: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
});
