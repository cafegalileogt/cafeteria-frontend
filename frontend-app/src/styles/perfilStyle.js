import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	topSection: {
		alignItems: "center",
	},
	sectionTitle: {
		fontFamily: "Nunito_900Black",
		fontSize: 48,
		color: "#B89A59",
		marginVertical: 15,
		textAlign: "center",
	},
	infoContainer: {
		marginTop: 10,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f7f7f7",
		padding: 15,
		borderRadius: 12,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 2,
		elevation: 2,
	},
	infoText: {
		marginLeft: 20,
		fontFamily: "Nunito_400Regular",
		fontSize: 16,
		color: "#333",
	},
});
