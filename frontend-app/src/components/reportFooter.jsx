import { View, Text, TouchableOpacity } from "react-native";
import Styles from "../styles/reportFooter";

export default function ReportFooter() {
	const exportCsv = () => {
		console.log("Exportar a CSV");
	};

	const exportXlsx = () => {
		console.log("Exportar a Excel");
	};

	return (
		<View style={Styles.footer}>
			<TouchableOpacity onPress={exportCsv}>
				<Text style={Styles.button}>Exportar CSV</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={exportXlsx}>
				<Text style={Styles.button}>Exportar Excel</Text>
			</TouchableOpacity>
		</View>
	);
}
