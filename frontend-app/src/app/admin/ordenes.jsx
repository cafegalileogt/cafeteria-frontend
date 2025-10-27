import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Styles from "../../styles/ordenesStyle";
import { Nunito_900Black, Nunito_400Regular, useFonts } from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../services/useAuth";
import { getTodayOrders } from "../../../services/api";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loaded, error] = useFonts({ Nunito_900Black, Nunito_400Regular });

  useEffect(() => {
    async function fetchOrders() {
      const result = await getTodayOrders();
      if (Array.isArray(result.data)) {
        const mapped = result.data.map(o => ({
          idOrden: o.numero_orden,
          nombre: o.nombre,
          estado: o.estado
        }));
        setData(mapped);
      } else {
        setData([]);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  const DetallePanel = (numero_orden) => {
    router.push({
      pathname: "/admin/buscarOrdenes",
      params: { numero_orden } 
    });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => DetallePanel(item.idOrden)}>
      <View style={Styles.row}>
        <Text style={[Styles.cell, { width: "20%" }]}>{item.idOrden}</Text>
        <Text style={[Styles.cell, { width: "40%" }]}>{item.nombre}</Text>
        <Text style={[Styles.cell, { width: "40%" }]}>{item.estado}</Text>
      </View>
    </TouchableOpacity>
  );

  const ordenarEstado = () => {
    const ordenado = [...data].sort((a, b) => a.estado.localeCompare(b.estado));
    setData(ordenado);
  };

  return (
    <View style={Styles.background}>
      <View style={Styles.page}>
        <Text style={Styles.title}>Órdenes del Día</Text>
        <View style={Styles.separator} />
        <View style={Styles.container}>
          <View style={Styles.toggle}>
            <TouchableOpacity onPress={ordenarEstado}>
              <Ionicons name="swap-vertical" size={42} />
            </TouchableOpacity>
          </View>

          <View style={Styles.tabla}>
            <View style={Styles.header}>
              <Text style={[Styles.headerText, { width: "20%" }]}># Orden</Text>
              <Text style={[Styles.headerText, { width: "40%" }]}>Nombre</Text>
              <Text style={[Styles.headerText, { width: "40%" }]}>Estado</Text>
            </View>

            {data.length === 0 ? (
              <Text style={Styles.noDataText}>No hay órdenes registradas hoy.</Text>
            ) : (
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

