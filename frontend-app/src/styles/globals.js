import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef7fc",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 5,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  logOutbutton: {
    backgroundColor: "#d2512dff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
    marginBottom: 15,
    marginTop: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backText: {
    color: "#888",
    marginTop: 10,
  },
});
