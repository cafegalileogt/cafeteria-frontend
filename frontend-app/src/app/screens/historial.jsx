import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import Header from "../../components/header";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/historyStyle";
import { useRouter } from "expo-router";
import { getOrderHistoryByUser, detalleOrden, cancelOrder } from "../../../services/api";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useUser } from "../../../services/userContext";


export default function historial() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [detalleTexto, setDetalleTexto] = useState("");
  const [totalTexto, setTotalTexto] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);


  const backPage = () => {
    router.push("/user/perfil");
  };

  useEffect(() => {
    async function fetchHistory() {
      const formatDate = (isoString) => {
        const date = new Date(isoString);

        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };

        return date.toLocaleString("es-GT", options).replace(",", "");
      };
      try {
        const result = await getOrderHistoryByUser(user);
        const sorted = result.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );

        const formatted = sorted.map((item) => ({
          ...item,
          fecha: formatDate(item.fecha),
        }));

        setHistory(formatted);
      } catch (err) {
        console.error("Error al obtener el historial.", err);
      }
    }
    fetchHistory();
  }, []);

  const detailModal = async (orden) => {
    setSelectedOrder(orden);
    const detalleResponse = await detalleOrden(orden.numero_orden);
    const productos = detalleResponse.data
      .map((item) => `${item.cantidad} ordenes de ${item.descripcion}`)
      .join("; ");
    const totales = detalleResponse.data.map((item) =>
      parseFloat(item.subtotal)
    );
    const totalOrden = totales.reduce((acc, curr) => acc + curr, 0);
    setDetalleTexto(productos);
    setTotalTexto(totalOrden);
  };
  
  
const handleCancelOrder = async (numero_orden) => {
  try {
    await cancelOrder(numero_orden, user);
    setHistory((prev) =>
      prev.map((order) =>
        order.numero_orden === numero_orden
          ? { ...order, estado: "Cancelada" }
          : order
      )
    );
    setSelectedOrder((prev) => ({ ...prev, estado: "Cancelada" }));
  } catch (error) {
    console.error("Error al cancelar la orden:", error);
  }
};
    
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
          <View>
            <Text style={styles.noDataText}>
            Aún no haz realizado ningún pedido. 
          </Text>
          
          </View>
          

        ) : (
          history.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                detailModal(item);
              }}
              activeOpacity={0.8}
              key={index}
            >
              <View key={index} style={styles.historyContainer}>
                <Text style={styles.infoText}>
                  Orden{" "}
                  <Text style={{ fontWeight: "bold", color: "#B89A59" }}>
                    #{item.numero_orden}
                  </Text>
                </Text>
                <Text style={styles.infoText}>
                  {item.total_cantidad} artículos por Q{item.total}
                </Text>
                <Text style={styles.infoText}>{item.fecha}</Text>
                <Text style={styles.infoText}>{item.estado}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalle de la Orden</Text>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalText}>Descripción: {detalleTexto}</Text>
            </ScrollView>

            <Text
              style={[styles.modalText, { fontWeight: "bold", marginTop: 10 }]}
            >
              Total a cancelar: Q{totalTexto}
            </Text>

          <View style={styles.modalButtonsRow}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.modalCloseButton, { backgroundColor: "#B89A59" }]}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>

            {selectedOrder?.estado === "Cancelada" ? (
              <TouchableOpacity
                onPress={() => (selectedOrder.numero_orden)}
                style={[styles.modalCloseButton, { backgroundColor: "#a2a0a0ff" }]}
              >
                <Text style={styles.modalCancelOrder}>Orden cancelada</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleCancelOrder(selectedOrder.numero_orden)}
                style={[styles.modalCloseButton, { backgroundColor: "#C0392B" }]}
              >
                <Text style={styles.modalCancelOrder}>Cancelar Orden</Text>
              </TouchableOpacity>
            )}
          </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
