import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  arrow: {
    fontSize: 48,
    paddingLeft: 16,
    color: "#B89A59",
  },
  orderContainer: {
    margin: 20,
    fontSize:16,
    width: "90%",
  },
  historyContainer: {
    margin: 5,
    backgroundColor: "#F8F8F8",
    padding:20

  },
  topSection: {
    alignItems: "center",
  },
    sectionTitle: {
    fontFamily: "Playfair Display",
    fontWeight: "900",
    fontSize: 48,
    color: "#B89A59",
    marginVertical: 15,
    textAlign: "center",
  },
});