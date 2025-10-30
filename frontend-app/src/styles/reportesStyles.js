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
	containerRows: {
		flexDirection: "row",
		width: "90%",
		justifyContent: "space-evenly",
		margin: 16,
	},
	menuRows: {
		flexDirection: "row",
		width: 300,
		justifyContent: "flex-end",
		marginVertical: 5,
	},
	containerCols: {
		flexDirection: "column",
		justifyContent: "space-evenly",
		marginHorizontal: 20,
	},
	dropdown: {
		width: 200,
		height: 30,
		borderRadius: 5,
		borderWidth: 1,
		padding: 4,
		backgroundColor: "#EEEEEE",
	},
	label: {
		fontFamily: "Nunito_400Regular",
		fontSize: 16,
		margin: 6,
	},
	filter: {
		width: 180,
		height: 30,
		borderRadius: 20,
		paddingVertical: 4,
		backgroundColor: "#B89A59",
		fontFamily: "Nunito_400Regular",
		fontSize: 16,
		color: "#fff",
		textAlign: "center",
	},
});
