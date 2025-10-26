import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const historyContainerBase = {
  margin: 10,
  backgroundColor: "#F8F8F8",
  padding: 20,
  shadowColor: "#000",
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  borderRadius: 8,
};
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  arrow: {
    fontSize: 48,
    paddingLeft: 16,
    color: "#B89A59",
  },
  orderContainer: {
    margin: 20,
    fontSize:16,
    width: "90%",
  },
  historyContainer: historyContainerBase,
  noDataText:{
    ...historyContainerBase,
    textAlign: "center",
    color:"#f23030ff",
    fontWeight: "bold"
  },
  topSection: {
    alignItems: "center",
  },
    sectionTitle: {
    fontFamily: "Playfair Display",
    fontWeight: "900",
    fontSize: 48,
    color: "#B89A59",
    marginVertical: 15,
    textAlign: "center",
  },
    modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semi-transparente
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 15,
  width: '90%',
  maxHeight: '80%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalTitle: {
  fontWeight: 'bold',
  fontSize: 20,
  marginBottom: 10,
  textAlign: 'center',
  color: '#B89A59',
},
modalContent: {
  marginVertical: 10,
},
modalText: {
  fontSize: 16,
  color: '#333',
  marginBottom: 5,
  lineHeight: 22,
},
modalCloseButton: {
  marginTop: 15,
  alignSelf: 'center',
  paddingVertical: 10,
  paddingHorizontal: 25,
  backgroundColor: '#B89A59',
  borderRadius: 8,
},
modalCloseText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
modalButtonsRow: {
  flexDirection: "row",
  justifyContent: "center",
  gap: 15,
  marginTop: 20,
},
modalCloseButton: {
  color: '#fff',
  paddingVertical: 10,
  paddingHorizontal: 25,
  borderRadius: 25,
  minWidth: 120,
  alignItems: "center",
},
modalCancelOrder: {
  color: '#fff',
  fontWeight: 'bold', // opcional
  textAlign: 'center',
}
});