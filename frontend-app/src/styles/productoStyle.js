import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  box: {
    width: "100%",
    flex: 0.5,
    alignItems: "center",
  },
  title: {
    fontFamily: "Playfair Display",
    fontWeight: "900",
    fontSize: 48,
    color: "#000",
    marginVertical: 15,
    textAlign: "center",
  },
  text: {
    fontFamily: "Actor",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  price: {
    fontFamily: "Inria Sans",
    fontSize: 48,
    color: "#B89A59",
    textAlign: "center",
    padding: 15,
  },
  rectangle: {
    flex: 0.3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 15,
    width: "90%",
  },
  element: {
    width: "32%",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    height: 48,
    width: "32%",
    borderWidth: 2,
    fontSize: 32,
    textAlign: "center",
    aspectRatio: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#C69C6D",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
    width: "80%",
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
