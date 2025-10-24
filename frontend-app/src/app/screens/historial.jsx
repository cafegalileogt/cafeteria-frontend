import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,

} from "react-native";
import Header from "../../components/header";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/historyStyle";
import { useRouter } from "expo-router";
import { getOrderHistoryByUser } from "../../../services/api";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function historial() {
  const router = useRouter();
  const [history, setHistory] = useState([]);

  const backPage = () => {
    router.push("/user/perfil");
  };

  useEffect(() => {
    async function fetchHistory() {
      try {
        const result = await getOrderHistoryByUser();
        const sorted = result.sort((a, b) => {
          const [da, ma, ya] = a.fecha.split("/");
          const [db, mb, yb] = b.fecha.split("/");
          return new Date(`${yb}-${mb}-${db}`) - new Date(`${ya}-${ma}-${da}`);
        });
        setHistory(sorted);
      } catch (err) {
        console.error("Error al obtener el historial.", err);
      }
    }
    fetchHistory();
  }, []);



  return (
    <View style={styles.container}>
      <Header></Header>
      <TouchableOpacity onPress={() => backPage()}>
        <Ionicons name={"arrow-back-outline"} style={styles.arrow} />
      </TouchableOpacity>
      {/* Contenido principal */}
      <View style={styles.topSection}>
        <Text style={styles.sectionTitle}> Historial </Text>
      </View>

      {/* Contenedor del Historial*/}
      <ScrollView contentContainerStyle={styles.orderContainer}>
        {history.length === 0 ? (
          <Text style={styles.noDataText}>No hay pedidos aún.</Text>
        ) : (
          history.map((item, index) => (
            <View key={index} style={styles.historyContainer}>
              <Text style={styles.infoText}>Orden #{item.numero_orden}</Text>
              <Text style={styles.infoText}>
                {item.articulos} artículos por Q{item.total}
              </Text>
              <Text style={styles.infoText}>{item.fecha}</Text>
              <Text style={styles.infoText}>{item.estado}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
