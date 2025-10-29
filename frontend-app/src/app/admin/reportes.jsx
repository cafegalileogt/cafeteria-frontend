import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { 
  getReportOrder, 
  horasPicoReport, 
  ventasReport, 
  masVendidosReport 
} from "../../../services/api";

export default function Home() {

  //  Reporte de órdenes
  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const from = "2025-10-01";
        const to = "2025-10-31";
        const data = await getReportOrder(from, to);
        console.log(" Reporte de órdenes:", data);
      } catch (error) {
        console.error(" Error al obtener reporte de órdenes:", error);
      }
    };
    fetchOrdenes();
  }, []);

  //  Reporte de horas pico
  useEffect(() => {
    const fetchHorasPico = async () => {
      try {
        const from = "2025-10-01";
        const to = "2025-10-31";
        const data = await horasPicoReport(from, to);
        console.log(" Reporte de horas pico:", data);
      } catch (error) {
        console.error(" Error al obtener reporte de horas pico:", error);
      }
    };
    fetchHorasPico();
  }, []);

  //  Reporte de ventas
  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const from = "2025-10-01";
        const to = "2025-10-31";
        const data = await ventasReport(from, to);
        console.log(" Reporte de ventas:", data);
      } catch (error) {
        console.error(" Error al obtener reporte de ventas:", error);
      }
    };
    fetchVentas();
  }, []);

  //  Reporte de más vendidos
  useEffect(() => {
    const fetchMasVendidos = async () => {
      try {
        const from = "2025-10-01";
        const to = "2025-10-31";
        const data = await masVendidosReport(from, to);
        console.log(" Reporte de más vendidos:", data);
      } catch (error) {
        console.error(" Error al obtener reporte de más vendidos:", error);
      }
    };
    fetchMasVendidos();
  }, []);

  return (
    <View>
      <Text>Bienvenido a reportes</Text>
    </View>
  );
}