import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F7F2F2",
  },
  page: {
    height: "90%",
    width: "90%",
    backgroundColor: "#FAFAFA",
    alignSelf: "center",
    top: 44,
  },
  title: {
    fontFamily: "Nunito_900Black",
    fontSize: 32,
    padding: 20,
    alignSelf: "center",
  },
  separator: {
    borderBottomColor: "#B89A59",
    borderBottomWidth: StyleSheet.hairlineWidth * 5,
  },
  container: {
    height: "90%",
    width: "90%",
    alignSelf: "center",
    paddingTop: 25,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#AAAAAA",
  },
  headerText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 24,
    textAlign: "center",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cell: {
    fontFamily: "Nunito_400Regular",
    fontSize: 24,
    textAlign: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#AAAAAA",
  },
});
