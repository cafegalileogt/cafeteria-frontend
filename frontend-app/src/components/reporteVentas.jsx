import { View, Text, FlatList } from "react-native";
import Styles from "../styles/reporteTablaStyle";
import { useState, useEffect } from "react";
import { ventasReport } from "../../services/api";

export default function ReporteVentas() {
	const [data, setData] = useState([]);
	const [totalSales, setTotalSales] = useState("");

	//  Reporte de ventas
	useEffect(() => {
		const fetchVentas = async () => {
			try {
				const from = "2025-10-01";
				const to = "2025-10-31";
				const result = await ventasReport(from, to);
				console.log(" Reporte de ventas:", result);

				if (Array.isArray(result.daily_sales)) {
					const mapped = result.daily_sales.map((o) => ({
						date: o.date,
						numOrders: o.orders,
						total: o.total,
					}));

					setTotalSales(result.total_sales);
					setData(mapped);
				} else {
					setData([]);
				}
			} catch (error) {
				console.error(" Error al obtener reporte de ventas:", error);
			}
		};
		fetchVentas();
	}, []);

	const renderItem = ({ item }) => (
		<View style={Styles.row}>
			<Text style={[Styles.cell, { width: "40%" }]}>{item.date}</Text>
			<Text style={[Styles.cell, { width: "30%" }]}>{item.numOrders}</Text>
			<Text style={[Styles.cell, { width: "30%" }]}>{item.total}</Text>
		</View>
	);

	return (
		<View style={Styles.table}>
			<View style={Styles.header}>
				<Text style={[Styles.headerText, { width: "40%" }]}>Fecha</Text>
				<Text style={[Styles.headerText, { width: "30%" }]}>Órdenes</Text>
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
			<View style={Styles.totalRow}>
				<Text style={Styles.cell}>Total de Ventas:</Text>
				<Text style={Styles.cell}>{totalSales}</Text>
			</View>
		</View>
	);
}
