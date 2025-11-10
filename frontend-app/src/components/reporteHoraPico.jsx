import { View, Text } from "react-native";
import Styles from "../styles/reporteTablaStyle";
import { BarChart } from "react-native-gifted-charts";
import { Dimensions } from "react-native";
import { useState } from "react";

export default function ReporteHoraPico({ data = [], mostActive }) {
	const [barData, setBarData] = useState(
		"Seleccione una barra para ver detalle.",
	);

	const handleBarPress = (item) => {
		if (item.label !== "") {
			let message = `Hora: ${item.label} | Órdenes: ${item.value}`;
			setBarData(message);
		}
	};

	const screenWidth = Dimensions.get("window").width;
	const barWidth = 40;
	const marginSpacing = 20;
	const barSpacing =
		data.length > 1
			? (screenWidth * 0.65 - data.length * barWidth) / (data.length - 1) -
				marginSpacing
			: 30;

	return (
		<View style={Styles.table}>
			<Text style={Styles.title}>Reporte de Hora Pico</Text>
			{!data || data.length === 0 ? (
				<Text style={Styles.noDataText}>No hay datos disponibles.</Text>
			) : (
				<>
					<BarChart
						height={300}
						barWidth={barWidth}
						noOfSections={6}
						barBorderRadius={4}
						data={data.map((o) => ({
							label: o.hour || o.label,
							value: o.orders || o.value,
						}))}
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
