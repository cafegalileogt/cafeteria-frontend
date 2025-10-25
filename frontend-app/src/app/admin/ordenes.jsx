import { FlatList, ScrollView, Text, View } from "react-native";
import Styles from "../../styles/ordenesStyle";
import {
  Nunito_900Black,
  Nunito_400Regular,
  useFonts,
} from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([
    { idOrden: "1235", nombre: "usuario01", estado: "Entregada" },
    { idOrden: "1236", nombre: "usuario02", estado: "Entregada" },
    { idOrden: "1237", nombre: "usuario04", estado: "En preparacion" },
    { idOrden: "1238", nombre: "usuario05", estado: "Pendiente pago" },
    { idOrden: "1239", nombre: "usuario03", estado: "En preparacion" },
  ]);

  const [loaded, error] = useFonts({
    Nunito_900Black,
    Nunito_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={Styles.row}>
        <Text style={[Styles.cell, { width: "20%" }]}>{item.idOrden}</Text>
        <Text style={[Styles.cell, { width: "40%" }]}>{item.nombre}</Text>
        <Text style={[Styles.cell, { width: "40%" }]}>{item.estado}</Text>
      </View>
    );
  };

  return (
    <View style={Styles.background}>
      <View style={Styles.page}>
        <Text style={Styles.title}>Órdenes</Text>
        <View style={Styles.separator} />
        <View style={Styles.container}>
          <ScrollView>
            <View style={Styles.tabla}>
              <View style={Styles.header}>
                <Text style={[Styles.headerText, { width: "20%" }]}>
                  # Orden
                </Text>
                <Text style={[Styles.headerText, { width: "40%" }]}>
                  Nombre
                </Text>
                <Text style={[Styles.headerText, { width: "40%" }]}>
                  Estado
                </Text>
              </View>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
