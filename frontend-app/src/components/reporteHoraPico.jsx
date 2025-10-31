import { View, Text } from "react-native";
import Styles from "../styles/reporteTablaStyle";
import { useState, useEffect } from "react";
import { horasPicoReport } from "../../services/api";

export default function ReporteHoraPico() {
	const [data, setData] = useState([]);

	//  Reporte de horas pico
	useEffect(() => {
		const fetchHorasPico = async () => {
			try {
				const from = "2025-10-01";
				const to = "2025-10-31";
				const result = await horasPicoReport(from, to);
				console.log(" Reporte de horas pico:", result);

				if (Array.isArray(result.horas_pico)) {
					const mapped = result.horas_pico.map((o) => ({
						horas: o.hour,
						ordenes: o.orders,
					}));
					setData(mapped);
				} else {
					setData([]);
				}
			} catch (error) {
				console.error(" Error al obtener reporte de horas pico:", error);
			}
		};
		fetchHorasPico();
	}, []);
	return (
		<View style={Styles.table}>
			<Text style={Styles.title}>Tabla de Hora Pico</Text>
		</View>
	);
}
