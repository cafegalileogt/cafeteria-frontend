import { Text, View } from "react-native";
import { useNavigation } from "expo-router";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Bienvenido a ordenes</Text>
    </View>
  );
}
