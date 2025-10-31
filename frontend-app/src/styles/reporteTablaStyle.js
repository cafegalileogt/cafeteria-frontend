import { StyleSheet } from "react-native";

export default StyleSheet.create({
	table: {
		width: "100%",
	},
	header: {
		flex: 1,
		flexDirection: "row",
		paddingVertical: 8,
	},
	headerText: {
		fontFamily: "Nunito_400Regular",
		fontSize: 24,
		textAlign: "center",
		alignSelf: "center",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#AAAAAA",
		backgroundColor: "#DDDDDD",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	cell: {
		fontFamily: "Nunito_400Regular",
		fontSize: 24,
		textAlign: "center",
		alignSelf: "center",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#AAAAAA",
		paddingHorizontal: 20,
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	title: {
		fontFamily: "Nunito_400Regular",
		fontSize: 24,
		width: "100%",
		textAlign: "center",
		alignSelf: "center",
		borderWidth: 1,
		borderColor: "#AAAAAA",
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	text: {
		fontFamily: "Nunito_400Regular",
		fontSize: 24,
		alignSelf: "center",
		marginVertical: 30,
	},
	dataText: {
		fontFamily: "Nunito_400Regular",
		fontSize: 24,
		alignSelf: "center",
		marginVertical: 30,
	},
});
