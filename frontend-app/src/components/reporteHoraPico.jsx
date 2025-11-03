import { View, Text } from "react-native";
import Styles from "../styles/reporteTablaStyle";
import { useState, useEffect } from "react";
import { horasPicoReport } from "../../services/api";
import { BarChart } from "react-native-gifted-charts";
import { Dimensions } from "react-native";

export default function ReporteHoraPico() {
	const [data, setData] = useState([]);
	const [barData, setBarData] = useState(
		"Seleccione una barra para ver detalle.",
	);

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
						label: o.hour,
						value: o.orders,
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

	const handleBarPress = (item) => {
		if (item.label !== "") {
			let message = "Hora: " + item.label + " | Órdenes: " + item.value;
			setBarData(message);
		}
	};

	const screenWidth = Dimensions.get("window").width;
	console.log(screenWidth * 0.65);
	const barWidth = 40;
	const marginSpacing = 20;
	const barSpacing =
		(screenWidth * 0.65 - data.length * barWidth) / (data.length - 1) -
		marginSpacing;
	console.log(barSpacing);

	return (
		<View style={Styles.table}>
			<Text style={Styles.title}>Tabla de Hora Pico</Text>
			<BarChart
				height={300}
				barWidth={barWidth}
				noOfSections={6}
				barBorderRadius={4}
				data={data}
				frontColor={"#AAAAAA"}
				hideRules
				focusBarOnPress
				adjustToWidth
				disableScroll
				initialSpacing={marginSpacing}
				endSpacing={marginSpacing}
				spacing={barSpacing}
				focusedBarConfig={{ color: "#B89A59" }}
				onPress={handleBarPress}
			/>
			<Text style={Styles.dataText}>{barData}</Text>
		</View>
	);
}
