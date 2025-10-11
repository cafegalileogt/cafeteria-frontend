import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.page}>
      <View style={styles.circle}>
        <Image
          source={require("../../assets/coffee-background.jpg")}
          style={styles.bgimg}
        ></Image>
      </View>
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#E3F0F9",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 25,
  },
  circle: {
    width: 500,
    height: 500,
    backgroundColor: "#AAAAAA",
    borderRadius: 250,
    position: "absolute",
    top: -100,
  },
  bgimg: {
    width: "100%",
    height: "100%",
    borderRadius: 250,
  },
  container: {
    flex: 0.6,
    width: 325,
    backgroundColor: "#FEFEFE",
    alignItems: "center",
    borderRadius: 20,
  },
});
