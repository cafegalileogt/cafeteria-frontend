import { View, Text, TouchableOpacity } from "react-native";
import Styles from "../styles/reportFooter";

export default function ReportFooter() {
	return (
		<View style={Styles.footer}>
			<TouchableOpacity>
				<Text style={Styles.button}>Exportar CSV</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text style={Styles.button}>Exportar Excel</Text>
			</TouchableOpacity>
		</View>
	);
}
