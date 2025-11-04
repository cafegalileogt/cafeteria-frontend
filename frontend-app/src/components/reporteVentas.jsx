import { View, Text, FlatList } from "react-native";
import Styles from "../styles/reporteTablaStyle";
import { useState, useEffect } from "react";
import { ventasReport } from "../../services/api";

export default function ReporteVentas({ fromDate, toDate, data, total }) {
  const [tableData, setTableData] = useState([]);
  const [totalSales, setTotalSales] = useState(total || "");

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        // ✅ Si no hay datos ya pasados desde el padre, los obtiene
        if (!data) {
          const result = await ventasReport(fromDate, toDate);
          console.log("Reporte de ventas:", result);

          if (Array.isArray(result.daily_sales)) {
            const mapped = result.daily_sales.map((o) => ({
              date: o.date,
              numOrders: o.orders,
              total: o.total,
            }));

            setTotalSales(result.total_sales);
            setTableData(mapped);
          } else {
            setTableData([]);
          }
        } else {
          // ✅ Si ya viene data desde Home, solo se mapea
          const mapped = data.map((o) => ({
            date: o.date,
            numOrders: o.orders,
            total: o.total,
          }));
          setTableData(mapped);
          setTotalSales(total);
        }
      } catch (error) {
        console.error("Error al obtener reporte de ventas:", error);
      }
    };

    fetchVentas();
  }, [fromDate, toDate, data, total]);

  const renderItem = ({ item }) => (
    <View style={Styles.row}>
      <Text style={[Styles.cell, { width: "40%" }]}>{item.date}</Text>
      <Text style={[Styles.cell, { width: "30%" }]}>{item.numOrders}</Text>
      <Text style={[Styles.cell, { width: "30%" }]}>{item.total}</Text>
    </View>
  );

  return (
    <View style={Styles.table}>
      <Text style={Styles.title}>Tabla de Ventas</Text>
      <View style={Styles.header}>
        <Text style={[Styles.headerText, { width: "40%" }]}>Fecha</Text>
        <Text style={[Styles.headerText, { width: "30%" }]}>Órdenes</Text>
        <Text style={[Styles.headerText, { width: "30%" }]}>Total</Text>
      </View>

      {tableData.length === 0 ? (
        <Text style={Styles.noDataText}>No hay órdenes dentro de esta búsqueda.</Text>
      ) : (
        <FlatList
          data={tableData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <View style={Styles.totalRow}>
        <Text style={Styles.cell}>Total de Ventas:</Text>
        <Text style={Styles.cell}>{totalSales}</Text>
      </View>
    </View>
  );
}
