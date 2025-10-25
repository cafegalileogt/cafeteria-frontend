import { Text, View } from "react-native";
import Styles from "../../styles/ordenesStyle";
import { Nunito_900Black, useFonts } from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export default function Home() {
  const [loaded, error] = useFonts({
    Nunito_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={Styles.background}>
      <View style={Styles.page}>
        <Text style={Styles.title}>Órdenes</Text>
        <View style={Styles.separator} />
      </View>
    </View>
  );
}
