import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F2F2",
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  filtrosContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginBottom: 15,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkboxText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#EEEEEE",
    borderRadius: 25,
    borderColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  botonFiltrar: {
    backgroundColor: "#B89A59",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 5,
  },
  clienteLabel: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  resultado: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  cliente: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  tablaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 8,
  },
  tablaFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 6,
  },
  columnaCodigo: { width: "15%", fontWeight: "600", fontSize: 16 },
  columnaDescripcion: { width: "30%", fontSize: 16 },
  columnaCantidad: { width: "15%", textAlign: "center", fontSize: 16 },
  columnaPrecio: { width: "20%", textAlign: "center", fontSize: 16 },
  columnaImporte: { width: "20%", textAlign: "right", fontSize: 16 },

  totalRowConBoton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  botonCobrar: {
    backgroundColor: "#B89A59",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: "center",
  },
  totalText: { fontSize: 18, fontWeight: "700" },

  botonImprimir: {
    backgroundColor: "#8B8B8B",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: "flex-end",
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  estado: {
    marginTop: 15,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  estadoPendiente: { backgroundColor: "#E68037" },
  estadoPreparacion: { backgroundColor: "#2ECC71" },
  estadoTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCaja: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: "center",
  },
  modalTitulo: {
    backgroundColor: "#E68037",
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  ticket: { marginTop: 15, alignItems: "center" },
  ticketTitulo: { fontSize: 20, fontWeight: "800", marginBottom: 10 },
  ticketItem: { fontSize: 16, marginBottom: 5 },
  cerrarModal: {
    backgroundColor: "#B89A59",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
});








