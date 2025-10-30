import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f5f3",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#cfc2a4",
    paddingVertical: 6,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    alignItems: "center",
  },
  col: {
    flex: 1,
    textAlign: "center",
    color: "#000",
  },
  btnPrimary: {
    backgroundColor: "#bfa36f",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  btnDanger: {
    backgroundColor: "#d91518",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  btnAdd: {
    backgroundColor: "#bfa36f",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  excepcionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  // === MODAL GENERAL ===
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 25,
    width: 380, // tamaño compacto como el mockup
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#000",
  },
  label: {
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRadius: 6,
    padding: 8,
    color: "#000",
    backgroundColor: "#fff",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 5,
    color: "#000",
    fontWeight: "600",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  // === BOTONES MODAL ===
  btnModalGuardar: {
    backgroundColor: "#bfa36f",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
  },
  btnModalCancelar: {
    backgroundColor: "#d91518",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
  },
});
