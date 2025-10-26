import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    alignContent: "flex-end",
    paddingHorizontal: 25,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: "column",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  userText: {
    fontWeight: "700",
  },
  emailText: {
    fontWeight: "400",
  },
});
