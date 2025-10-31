import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
	},
});
