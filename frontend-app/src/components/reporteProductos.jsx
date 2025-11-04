import { View, Text, FlatList } from "react-native";
import Styles from "../styles/reporteTablaStyle";

export default function ReporteProductos({ data = [] }) {
  const renderItem = ({ item }) => (
    <View style={Styles.row}>
      <Text style={[Styles.cell, { width: "20%" }]}>{item.id_producto}</Text>
      <Text style={[Styles.cell, { width: "30%" }]}>{item.name}</Text>
      <Text style={[Styles.cell, { width: "20%" }]}>{item.sold_times}</Text>
      <Text style={[Styles.cell, { width: "30%" }]}>{item.total}</Text>
    </View>
  );

  return (
    <View style={Styles.table}>
      <Text style={Styles.title}>Tabla de Productos más vendidos</Text>
      <View style={Styles.header}>
        <Text style={[Styles.headerText, { width: "20%" }]}>ID Producto</Text>
        <Text style={[Styles.headerText, { width: "30%" }]}>Producto</Text>
        <Text style={[Styles.headerText, { width: "20%" }]}>Ventas</Text>
        <Text style={[Styles.headerText, { width: "30%" }]}>Total</Text>
      </View>
      {(!data || data.length === 0) ? (
        <Text style={Styles.noDataText}>
          No hay productos dentro de esta búsqueda.
        </Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
