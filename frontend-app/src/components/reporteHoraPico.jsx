import { View, Text } from "react-native";
import Styles from "../styles/reporteTablaStyle";
import { BarChart } from "react-native-gifted-charts";
import { Dimensions } from "react-native";
import { useState, useMemo } from "react";

export default function ReporteHoraPico({ data = [], mostActive }) {
	const [barData, setBarData] = useState(
		"Seleccione una barra para ver detalle.",
	);

	// Generar horas de 6 a 22 (6:00 a 10:00 PM)
	const hoursRange = useMemo(() => {
		const arr = [];
		for (let h = 6; h <= 22; h++) {
			arr.push(`${h}:00`);
		}
		return arr;
	}, []);

	// Normalizar los datos para que todas las horas estén presentes
	const normalizedData = useMemo(() => {
		return hoursRange.map((hour) => {
			const found = data.find((d) => d.hour === hour || d.label === hour);
			return {
				label: hour,
				value: found ? found.orders || found.value : 0,
			};
		});
	}, [data, hoursRange]);

	const handleBarPress = (item) => {
		if (item.label !== "") {
			let message = `Hora: ${item.label} | Órdenes: ${item.value}`;
			setBarData(message);
		}
	};

	const screenWidth = Dimensions.get("window").width;
	const barWidth = 30;
	const marginSpacing = 20;
	const barSpacing =
		normalizedData.length > 1
			? (screenWidth * 0.65 - normalizedData.length * barWidth) /
					(normalizedData.length - 1) -
				marginSpacing
			: 30;

	return (
		<View style={Styles.table}>
			<Text style={Styles.title}>Reporte de Hora Pico</Text>
			{normalizedData.every((item) => item.value === 0) ? (
				<Text style={Styles.noDataText}>No hay datos disponibles.</Text>
			) : (
				<>
					<BarChart
						height={300}
						barWidth={barWidth}
						noOfSections={6}
						barBorderRadius={4}
						data={normalizedData}
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
						yAxisThickness={0}
						xAxisThickness={1}
					/>
					<View style={Styles.textRow}>
						<Text style={Styles.dataText}>{barData}</Text>
						<Text style={Styles.dataText}>Hora más activa: {mostActive}</Text>
					</View>

					{/* {mostActive && (
						<View style={Styles.totalRow}>
							<Text style={Styles.cell}>Hora más activa:</Text>
							<Text style={Styles.cell}>{mostActive}</Text>
						</View>
					)}*/}
				</>
			)}
		</View>
	);
}
