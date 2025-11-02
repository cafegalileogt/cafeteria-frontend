import { View, Text, FlatList } from "react-native";
import Styles from "../styles/reporteTablaStyle";

export default function ReporteOrdenes({ data }) {

  const renderItem = ({ item }) => (
    <View style={Styles.row}>
      <Text style={[Styles.cell, { width: "10%" }]}>{item.idOrden}</Text>
      <Text style={[Styles.cell, { width: "10%" }]}>{item.idUser}</Text>
      <Text style={[Styles.cell, { width: "20%" }]}>{item.email}</Text>
      <Text style={[Styles.cell, { width: "20%" }]}>{item.updateDate}</Text>
      <Text style={[Styles.cell, { width: "15%" }]}>{item.estado}</Text>
      <Text style={[Styles.cell, { width: "10%" }]}>${item.total}</Text>
      <Text style={[Styles.cell, { width: "10%" }]}>{item.idPersonal}</Text>
      <Text style={[Styles.cell, { width: "10%" }]}>{item.idPago}</Text>
    </View>
  );

  return (
    <View style={Styles.table}>
      <Text style={Styles.title}>Tabla de Órdenes</Text>
      <View style={Styles.header}>
        <Text style={[Styles.headerText, { width: "10%" }]}># Órden</Text>
        <Text style={[Styles.headerText, { width: "10%" }]}>ID Cliente</Text>
        <Text style={[Styles.headerText, { width: "20%" }]}>Email</Text>
        <Text style={[Styles.headerText, { width: "20%" }]}>
          Fecha Actualización
        </Text>
        <Text style={[Styles.headerText, { width: "15%" }]}>Estado</Text>
        <Text style={[Styles.headerText, { width: "10%" }]}>Total</Text>
        <Text style={[Styles.headerText, { width: "10%" }]}>ID Personal</Text>
        <Text style={[Styles.headerText, { width: "10%" }]}>ID Pago</Text>
      </View>
      {!data || data.length === 0 ? (
        <Text style={Styles.noDataText}>
          No hay órdenes dentro de esta búsqueda.
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