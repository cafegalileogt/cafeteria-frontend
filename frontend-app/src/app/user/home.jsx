import { Text, View } from "react-native";
import styles from "../../styles/homeStyle";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido!</Text>
    </View>
  );
}
