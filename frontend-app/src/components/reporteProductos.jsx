import { View, Text, FlatList } from "react-native";
import Styles from "../styles/reporteTablaStyle";
import { useState, useEffect } from "react";
import { masVendidosReport } from "../../services/api";

export default function ReporteProductos() {
	const [data, setData] = useState([]);

	//  Reporte de más vendidos
	useEffect(() => {
		const fetchMasVendidos = async () => {
			try {
				const from = "2025-10-01";
				const to = "2025-10-31";
				const result = await masVendidosReport(from, to);
				console.log(" Reporte de más vendidos:", result);

				if (Array.isArray(result.top_products)) {
					const mapped = result.top_products.map((o) => ({
						idProducto: o.id_producto,
						nombre: o.name,
						ventas: o.sold_times,
						total: o.total,
					}));
					setData(mapped);
				} else {
					setData([]);
				}
			} catch (error) {
				console.error(" Error al obtener reporte de más vendidos:", error);
			}
		};
		fetchMasVendidos();
	}, []);

	const renderItem = ({ item }) => (
		<View style={Styles.row}>
			<Text style={[Styles.cell, { width: "20%" }]}>{item.idProducto}</Text>
			<Text style={[Styles.cell, { width: "30%" }]}>{item.nombre}</Text>
			<Text style={[Styles.cell, { width: "20%" }]}>{item.ventas}</Text>
			<Text style={[Styles.cell, { width: "30%" }]}>{item.total}</Text>
		</View>
	);

	return (
		<View style={Styles.table}>
			<View style={Styles.header}>
				<Text style={[Styles.headerText, { width: "20%" }]}>ID Producto</Text>
				<Text style={[Styles.headerText, { width: "30%" }]}>Producto</Text>
				<Text style={[Styles.headerText, { width: "20%" }]}>Ventas</Text>
				<Text style={[Styles.headerText, { width: "30%" }]}>Total</Text>
			</View>
			{data.length === 0 ? (
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
