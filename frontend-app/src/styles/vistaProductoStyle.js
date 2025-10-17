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
    fontSize: width < 500 ? 24 : 26,
    fontFamily: "Nunito",
    color: "#000",
  },
  logo: {
    position: "absolute",
    top: 20,
    right: 20,
    width: width * 0.28,
    height: height * 0.06,
  },
  arrow: {
    fontSize: 48,
    paddingLeft: 16,
    color: "#B89A59",
  },
});
