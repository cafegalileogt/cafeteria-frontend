import {
  FlatList,
  ScrollView,
  Text,
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
import { Dropdown } from "react-native-element-dropdown";
import { Searchbar } from "react-native-paper";

export default function Home() {
  const product_data = [
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
  ];

  const [loaded, error] = useFonts({
    Nunito_900Black,
    Nunito_400Regular,
  });

  const renderItem = ({ item }) => {
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

  const addProducto = () => {};

  const addCategoria = () => {};

  const category_data = [
    { categoria: "Desayunos", value: "1" },
    { categoria: "Almuerzos", value: "2" },
    { categoria: "Postres", value: "3" },
    { categoria: "Bebidas", value: "4" },
  ];

  const [value, setValue] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [activeTab, setActiveTab] = useState("menu");

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
        <View style={Styles.titleBar}>
          <Text style={Styles.title}>Gestionar Menú</Text>
          <View style={Styles.switchButtons}>
            <TouchableOpacity
              style={
                activeTab === "menu" ? Styles.activeTab : Styles.inactiveTab
              }
              onPress={() => setActiveTab("menu")}
            >
              <Text
                style={
                  activeTab === "menu" ? Styles.activeText : Styles.inactiveText
                }
              >
                Menú
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                activeTab === "categoria"
                  ? Styles.activeTab
                  : Styles.inactiveTab
              }
              onPress={() => setActiveTab("categoria")}
            >
              <Text
                style={
                  activeTab === "categoria"
                    ? Styles.activeText
                    : Styles.inactiveText
                }
              >
                Categoría
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.separator} />
        <View style={Styles.container}>
          <View style={Styles.bar}>
            <Dropdown
              style={Styles.dropdown}
              data={category_data}
              maxHeight={300}
              labelField="categoria"
              valueField="value"
              placeholder="Categoría"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
              renderLeftIcon={() => null}
            />
            <Searchbar
              style={Styles.searchbar}
              placeholder="Buscar"
              inputType="text"
              onChangeText={setSearchQuery}
              value={searchQuery}
              inputStyle={{ minHeight: 0 }}
            />
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
              <FlatList data={product_data} renderItem={renderItem} />
            </View>
          </ScrollView>
          <View style={Styles.bar}>
            <TouchableOpacity style={Styles.button} onPress={addProducto}>
              <Text style={Styles.btnText}>Agregar producto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button} onPress={addCategoria}>
              <Text style={Styles.btnText}>Agregar categoría</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
