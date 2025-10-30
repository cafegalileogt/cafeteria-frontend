import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
	getReportOrder,
	horasPicoReport,
	ventasReport,
	masVendidosReport,
} from "../../../services/api";
import Styles from "../../styles/reportesStyles";
import { Dropdown } from "react-native-element-dropdown";
import {
	Nunito_900Black,
	Nunito_400Regular,
	useFonts,
} from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";
import ReporteOrdenes from "../../components/reporteOrdenes";
import ReporteVentas from "../../components/reporteVentas";
import ReporteProductos from "../../components/reporteProductos";
import ReporteHoraPico from "../../components/reporteHoraPico";

export default function Home() {
	const [loaded, error] = useFonts({ Nunito_900Black, Nunito_400Regular });
	const reportTypes = ["Órdenes", "Ventas", "Productos", "Hora Pico"];
	const [reportType, setReportType] = useState("");

	//  Reporte de órdenes
	useEffect(() => {
		const fetchOrdenes = async () => {
			try {
				const from = "2025-10-01";
				const to = "2025-10-31";
				const data = await getReportOrder(from, to);
				console.log(" Reporte de órdenes:", data);
			} catch (error) {
				console.error(" Error al obtener reporte de órdenes:", error);
			}
		};
		fetchOrdenes();
	}, []);

	//  Reporte de horas pico
	useEffect(() => {
		const fetchHorasPico = async () => {
			try {
				const from = "2025-10-01";
				const to = "2025-10-31";
				const data = await horasPicoReport(from, to);
				console.log(" Reporte de horas pico:", data);
			} catch (error) {
				console.error(" Error al obtener reporte de horas pico:", error);
			}
		};
		fetchHorasPico();
	}, []);

	//  Reporte de ventas
	useEffect(() => {
		const fetchVentas = async () => {
			try {
				const from = "2025-10-01";
				const to = "2025-10-31";
				const data = await ventasReport(from, to);
				console.log(" Reporte de ventas:", data);
			} catch (error) {
				console.error(" Error al obtener reporte de ventas:", error);
			}
		};
		fetchVentas();
	}, []);

	//  Reporte de más vendidos
	useEffect(() => {
		const fetchMasVendidos = async () => {
			try {
				const from = "2025-10-01";
				const to = "2025-10-31";
				const data = await masVendidosReport(from, to);
				console.log(" Reporte de más vendidos:", data);
			} catch (error) {
				console.error(" Error al obtener reporte de más vendidos:", error);
			}
		};
		fetchMasVendidos();
	}, []);

	useEffect(() => {
		if (loaded || error) SplashScreen.hideAsync();
	}, [loaded, error]);

	if (!loaded && !error) return null;

	const reportTable = () => {
		if (reportType === "Órdenes") {
			return <ReporteOrdenes />;
		} else if (reportType === "Ventas") {
			return <ReporteVentas />;
		} else if (reportType === "Productos") {
			return <ReporteProductos />;
		} else if (reportType === "Hora Pico") {
			return <ReporteHoraPico />;
		} else {
			return <Text>Seleccione un tipo de reporte</Text>;
		}
	};

	return (
		<View style={Styles.background}>
			<View style={Styles.page}>
				<Text style={Styles.title}>Reportes</Text>
				<View style={Styles.separator} />
				<View style={Styles.container}>
					<View style={Styles.containerRows}>
						<View style={Styles.containerCols}>
							<View style={Styles.menuRows}>
								<Text style={Styles.label}>Tipo:</Text>
								<Dropdown
									style={Styles.dropdown}
									data={reportTypes.map((type) => ({
										label: type,
										value: type,
									}))}
									placeholder="Tipo de reporte"
									labelField={"label"}
									valueField={"value"}
									value={reportType}
									onChange={(item) => setReportType(item.value)}
								/>
							</View>
						</View>
						<View style={Styles.containerCols}>
							<View style={Styles.menuRows}>
								<Text style={Styles.label}>Desde:</Text>
								<Dropdown
									style={Styles.dropdown}
									data={reportTypes.map((type) => ({
										label: type,
										value: type,
									}))}
									placeholder="Tipo de reporte"
									labelField={"label"}
									valueField={"value"}
									onChange={(item) => setReportType(item.value)}
								/>
							</View>
							<View style={Styles.menuRows}>
								<Text style={Styles.label}>Hasta:</Text>
								<Dropdown
									style={Styles.dropdown}
									data={reportTypes.map((type) => ({
										label: type,
										value: type,
									}))}
									placeholder="Tipo de reporte"
									labelField={"label"}
									valueField={"value"}
									onChange={(item) => setReportType(item.value)}
								/>
							</View>
						</View>
						<View style={Styles.containerCols}>
							<View style={Styles.menuRows}>
								<Text style={Styles.label}>Estado:</Text>
								<Dropdown
									style={Styles.dropdown}
									data={reportTypes.map((type) => ({
										label: type,
										value: type,
									}))}
									placeholder="Tipo de reporte"
									labelField={"label"}
									valueField={"value"}
									onChange={(item) => setReportType(item.value)}
								/>
							</View>
							<View style={Styles.menuRows}>
								<Text style={Styles.label}>Categoria:</Text>
								<Dropdown
									style={Styles.dropdown}
									data={reportTypes.map((type) => ({
										label: type,
										value: type,
									}))}
									placeholder="Tipo de reporte"
									labelField={"label"}
									valueField={"value"}
									onChange={(item) => setReportType(item.value)}
								/>
							</View>
						</View>
						<View style={Styles.containerCols}>
							<TouchableOpacity>
								<Text style={Styles.filter}>Filtrar</Text>
							</TouchableOpacity>
						</View>
					</View>
					{reportTable()}
				</View>
			</View>
		</View>
	);
}
