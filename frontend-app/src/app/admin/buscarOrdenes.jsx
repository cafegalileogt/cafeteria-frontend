import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/buscarOrdenesStyle";
import { useAuth } from "../../../services/useAuth";
 


export default function BuscarOrdenes() {

  const [filtro, setFiltro] = useState("numero");
  const [busqueda, setBusqueda] = useState("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  //  Datos simulados ( sin conexion al backend)
  const ordenesSimuladas = [
    {
      id: "12345",
      cliente: "Byron Ramírez",
      estado: "Pendiente de Pago",
      productos: [
        { codigo: "123", descripcion: "Torito con papas", cantidad: 2, precio: 30 },
        { codigo: "523", descripcion: "Café", cantidad: 2, precio: 5 },
        { codigo: "124", descripcion: "Desayuno huevos rancheros", cantidad: 1, precio: 25 },
        { codigo: "1", descripcion: "Jugo de naranja", cantidad: 1, precio: 5 },
      ],
    },
    {
      id: "67890",
      cliente: "Carlos López",
      estado: "En Preparación",
      productos: [
        { codigo: "44", descripcion: "Café Latte", cantidad: 2, precio: 10 },
        { codigo: "12", descripcion: "Cuerno", cantidad: 1, precio: 15 },
      ],
    },
    {
      id: "54321",
      cliente: "María García",
      estado: "Pendiente de Pago",
      productos: [
        { codigo: "98", descripcion: "Sandwich de pollo", cantidad: 1, precio: 25 },
        { codigo: "66", descripcion: "Té helado", cantidad: 2, precio: 8 },
      ],
    },
    {
      id: "11111",
      cliente: "Luis Pérez",
      estado: "En Preparación",
      productos: [
        { codigo: "88", descripcion: "Pan con jamón y queso", cantidad: 1, precio: 20 },
        { codigo: "15", descripcion: "Café americano", cantidad: 1, precio: 10 },
      ],
    },
  ];

  const handleFiltrar = () => {
    const resultado = ordenesSimuladas.find((orden) =>
      filtro === "numero"
        ? orden.id.includes(busqueda)
        : orden.cliente.toLowerCase().includes(busqueda.toLowerCase())
    );
    setOrdenEncontrada(resultado ? { ...resultado } : null);
  };

  const calcularTotal = (productos) =>
    productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);

  const handleCobrar = () => {
    if (ordenEncontrada && ordenEncontrada.estado === "Pendiente de Pago") {
      setOrdenEncontrada({
        ...ordenEncontrada,
        estado: "En Preparación",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Buscar órdenes</Text>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={styles.checkboxItem} onPress={() => setFiltro("numero")}>
            <Ionicons
              name={filtro === "numero" ? "checkbox" : "square-outline"}
              size={22}
              color="black"
            />
            <Text style={styles.checkboxText}>Número de orden</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxItem} onPress={() => setFiltro("nombre")}>
            <Ionicons
              name={filtro === "nombre" ? "checkbox" : "square-outline"}
              size={22}
              color="black"
            />
            <Text style={styles.checkboxText}>Nombre</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder={
              filtro === "numero"
                ? "Buscar por número de orden"
                : "Buscar por nombre del cliente"
            }
            value={busqueda}
            onChangeText={setBusqueda}
          />
          <TouchableOpacity style={styles.botonFiltrar} onPress={handleFiltrar}>
            <Text style={styles.textoBoton}>Filtrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtitulo}>Detalles de la orden</Text>
      <Text style={styles.clienteLabel}>Cliente:</Text>

      {ordenEncontrada && (
        <View style={styles.resultado}>
          <Text style={styles.cliente}>
            {ordenEncontrada.cliente} (Orden #{ordenEncontrada.id})
          </Text>

          {/* Tabla */}
          <View style={styles.tablaHeader}>
            <Text style={styles.columnaCodigo}>Código</Text>
            <Text style={styles.columnaDescripcion}>Producto / Descripción</Text>
            <Text style={styles.columnaCantidad}>Cantidad</Text>
            <Text style={styles.columnaPrecio}>Prec. unitario</Text>
            <Text style={styles.columnaImporte}>Importe</Text>
          </View>

          {ordenEncontrada.productos.map((p, index) => (
            <View key={index} style={styles.tablaFila}>
              <Text style={styles.columnaCodigo}>{p.codigo}</Text>
              <Text style={styles.columnaDescripcion}>{p.descripcion}</Text>
              <Text style={styles.columnaCantidad}>{p.cantidad}</Text>
              <Text style={styles.columnaPrecio}>Q{p.precio}</Text>
              <Text style={styles.columnaImporte}>Q{p.cantidad * p.precio}</Text>
            </View>
          ))}

          {/* Total con botón cobrar */}
          <View style={styles.totalRowConBoton}>
            <TouchableOpacity style={styles.botonCobrar} onPress={handleCobrar}>
              <Text style={styles.textoBoton}>COBRAR</Text>
            </TouchableOpacity>
            <Text style={styles.totalText}>
              GTQ {calcularTotal(ordenEncontrada.productos)}
            </Text>
          </View>

          {/* Imprimir solo si ya está en preparación */}
          {ordenEncontrada.estado === "En Preparación" && (
            <View style={styles.botonesContainer}>
              <TouchableOpacity
                style={styles.botonImprimir}
                onPress={() => setMostrarModal(true)}
              >
                <Text style={styles.textoBoton}>IMPRIMIR</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Estado */}
          <View
            style={[
              styles.estado,
              ordenEncontrada.estado === "Pendiente de Pago"
                ? styles.estadoPendiente
                : styles.estadoPreparacion,
            ]}
          >
            <Text style={styles.estadoTexto}>{ordenEncontrada.estado}</Text>
          </View>
        </View>
      )}

      {/* Modal Imprimiendo */}
      <Modal visible={mostrarModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalCaja}>
            <Text style={styles.modalTitulo}>Imprimiendo</Text>
            <View style={styles.ticket}>
              <Text style={styles.ticketTitulo}>Orden #{ordenEncontrada?.id}</Text>
              {ordenEncontrada?.productos.map((p, i) => (
                <Text key={i} style={styles.ticketItem}>
                  {p.cantidad} {p.descripcion}
                </Text>
              ))}
            </View>
            <TouchableOpacity
              style={styles.cerrarModal}
              onPress={() => setMostrarModal(false)}
            >
              <Text style={styles.textoBoton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

