import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#E3F0F9",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
  rectangle: {
    width: 400,
    height: 420,
    alignItems: "center",
  },
  img: {
    width: "120%",
    height: "120%",
  },
  container: {
    flex: 0.7,
    width: "100%",
    backgroundColor: "#FEFEFE",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
  },
  text: {
    color: "#000000",
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },
  box: {
    width: "90%",
    justifyContent: "flex-start",
    padding: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 25,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#C69C6D",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  forgotText: {
    textAlign: "center",
    color: "#666",
    marginTop: 15,
    fontSize: 13,
  },
});
