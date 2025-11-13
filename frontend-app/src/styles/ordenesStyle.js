import { StyleSheet } from "react-native";

export default StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: "#F7F2F2",
	},
	page: {
		height: "90%",
		width: "90%",
		backgroundColor: "#FAFAFA",
		alignSelf: "center",
		top: 44,
	},
	title: {
		fontFamily: "Nunito_900Black",
		fontSize: 32,
		padding: 20,
		alignSelf: "center",
	},
	separator: {
		borderBottomColor: "#B89A59",
		borderBottomWidth: StyleSheet.hairlineWidth * 5,
	},
	container: {
		height: "90%",
		width: "90%",
		alignSelf: "center",
	},
	header: {
		flex: 1,
		flexDirection: "row",
		paddingVertical: 8,
	},
	headerText: {
		fontFamily: "Nunito_700Bold",
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
		fontSize: 16,
		textAlign: "center",
		alignSelf: "center",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#AAAAAA",
		height: 40,
	},
	toggle: {
		alignItems: "flex-end",
		width: "80%",
		alignSelf: "center",
		marginVertical: 5,
	},
	noDataText: {
		fontFamily: "Nunito_400Regular",
		fontSize: 16,
		textAlign: "center",
	},
});
