import { View, Text, FlatList } from "react-native";
import Styles from "../styles/reporteTablaStyle";
import { useState, useEffect } from "react";
import { getReportOrder } from "../../services/api";

export default function ReporteOrdenes() {
	const [data, setData] = useState([]);

	//  Reporte de órdenes
	useEffect(() => {
		const fetchOrdenes = async () => {
			try {
				const from = "2025-10-01";
				const to = "2025-10-31";
				const result = await getReportOrder(from, to);
				console.log(" Reporte de órdenes:", result);

				if (Array.isArray(result.orders)) {
					const mapped = result.orders.map((o) => ({
						idOrden: o.order_id,
						idUser: o.user_id,
						email: o.email,
						updateDate: o.fecha_actualizacion,
						estado: o.estado,
					}));
					setData(mapped);
				} else {
					setData([]);
				}
			} catch (error) {
				console.error(" Error al obtener reporte de órdenes:", error);
			}
		};
		fetchOrdenes();
	}, []);

	const renderItem = ({ item }) => (
		<View style={Styles.row}>
			<Text style={[Styles.cell, { width: "10%" }]}>{item.idOrden}</Text>
			<Text style={[Styles.cell, { width: "10%" }]}>{item.idUser}</Text>
			<Text style={[Styles.cell, { width: "30%" }]}>{item.email}</Text>
			<Text style={[Styles.cell, { width: "30%" }]}>{item.updateDate}</Text>
			<Text style={[Styles.cell, { width: "20%" }]}>{item.estado}</Text>
		</View>
	);

	return (
		<View style={Styles.table}>
			<Text style={Styles.title}>Tabla de Órdenes</Text>
			<View style={Styles.header}>
				<Text style={[Styles.headerText, { width: "10%" }]}># Órden</Text>
				<Text style={[Styles.headerText, { width: "10%" }]}>ID Cliente</Text>
				<Text style={[Styles.headerText, { width: "30%" }]}>Email</Text>
				<Text style={[Styles.headerText, { width: "30%" }]}>
					Fecha Actualización
				</Text>
				<Text style={[Styles.headerText, { width: "20%" }]}>Estado</Text>
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
