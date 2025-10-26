import {
  FlatList,
  ScrollView,
  Text,
  TouchableNativeFeedbackComponent,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "../../styles/gestionarMenuStyle";
import {
  Nunito_900Black,
  Nunito_400Regular,
  useFonts,
} from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const [data, setData] = useState([
    {
      nombre: "Torito",
      categoria: "Almuerzos",
      precio: "Q32",
      descripcion: "Hamburguesa con carne y huevo",
    },
    {
      nombre: "Croissant",
      categoria: "Desayunos",
      precio: "Q16",
      descripcion: "Croissant fresco y recién horneado",
    },
    {
      nombre: "Jugo de naranja",
      categoria: "Bebidas",
      precio: "Q12",
      descripcion: "Jugo de naranja fresca",
    },
    {
      nombre: "Pizza",
      categoria: "Almuerzos",
      precio: "Q10",
      descripcion: "Porción de pizza individual",
    },
    {
      nombre: "Galleta de chocolate",
      categoria: "Postres",
      precio: "Q15",
      descripcion: "Galleta con chispas de chocolate",
    },
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
        <Text style={[Styles.cell, { width: "20%" }]}>{item.nombre}</Text>
        <Text style={[Styles.cell, { width: "15%" }]}>{item.categoria}</Text>
        <Text style={[Styles.cell, { width: "10%" }]}>{item.precio}</Text>
        <Text style={[Styles.cell, { width: "40%" }]}>{item.descripcion}</Text>
        <View style={[Styles.actions, { width: "15%" }]}>
          <TouchableOpacity style={Styles.icons}>
            <Ionicons name="create-outline" size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.icons}>
            <Ionicons name="trash" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ordenarEstado = () => {};

  return (
    <View style={Styles.background}>
      <View style={Styles.page}>
        <Text style={Styles.title}>Gestionar Menú</Text>
        <View style={Styles.separator} />
        <View style={Styles.container}>
          <View style={Styles.bar}>
            <Text>Hello</Text>
          </View>
          <ScrollView>
            <View style={Styles.tabla}>
              <View style={Styles.header}>
                <Text style={[Styles.headerText, { width: "20%" }]}>
                  Nombre
                </Text>
                <Text style={[Styles.headerText, { width: "15%" }]}>
                  Categoría
                </Text>
                <Text style={[Styles.headerText, { width: "10%" }]}>
                  Precio
                </Text>
                <Text style={[Styles.headerText, { width: "40%" }]}>
                  Descripción
                </Text>
                <Text style={[Styles.headerText, { width: "15%" }]}>
                  Acciones
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
