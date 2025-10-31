import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import styles from "../../styles/buscarOrdenesStyle";
import { detalleOrden2, getTodayOrders, updateOrden, getOrderbyId } from "../../../services/api";
import { useAuth } from "../../../services/useAuth";

export default function BuscarOrdenes() {
  const params = useLocalSearchParams();
  const [filtro, setFiltro] = useState("numero");
  const [busqueda, setBusqueda] = useState("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [ordenesDelDia, setOrdenesDelDia] = useState([]);
  const [cargandoOrdenes, setCargandoOrdenes] = useState(true);
  const [mensajeEstado, setMensajeEstado] = useState("");

  // 🔹 Cargar órdenes del día al montar el componente
  useEffect(() => {
    const cargarOrdenesDelDia = async () => {
      try {
        setCargandoOrdenes(true);
        const resultado = await getTodayOrders();

        if (resultado.status === 200 && resultado.data) {
          setOrdenesDelDia(resultado.data);
          console.log("Órdenes del día cargadas:", resultado.data.length);
        } else {
          console.error("Error en respuesta de órdenes del día:", resultado);
          setMensajeEstado("Error al cargar las órdenes del día.");
        }
      } catch (error) {
        console.error("Error cargando órdenes del día:", error);
      } finally {
        setCargandoOrdenes(false);
      }
    };

    cargarOrdenesDelDia();
  }, []);

  // 🔹 Limpiar resultados cuando cambia el filtro
  useEffect(() => {
    setBusqueda("");
    setOrdenEncontrada(null);
    setMostrarModal(false);
  }, [filtro]);

  // 🔹 Buscar el nombre del cliente
  const buscarNombreCliente = (numeroOrden) => {
    const orden = ordenesDelDia.find((ord) =>
      ord.numero_orden == numeroOrden ||
      ord.id == numeroOrden ||
      ord.order_id == numeroOrden ||
      ord.numero == numeroOrden
    );

    if (orden) {
      return (
        orden.cliente ||
        orden.nombre_cliente ||
        orden.customer_name ||
        orden.nombre ||
        "Cliente"
      );
    }

    return "Cliente no disponible";
  };

  // 🔹 Buscar órdenes por nombre
  const buscarOrdenesPorNombre = (nombreCliente) => {
    const ordenesFiltradas = ordenesDelDia.filter((orden) => {
      const nombre =
        orden.cliente ||
        orden.nombre_cliente ||
        orden.customer_name ||
        orden.nombre;
      return nombre && nombre.toLowerCase().includes(nombreCliente.toLowerCase());
    });

    return ordenesFiltradas;
  };

  // 🔹 Efecto si se recibe número de orden por parámetros
  useEffect(() => {
    if (params.numero_orden && ordenesDelDia.length > 0) {
      setFiltro("numero");
      setBusqueda(params.numero_orden.toString());
      handleFiltrarConParametro(params.numero_orden.toString());
    }
  }, [params.numero_orden, ordenesDelDia]);

  // 🔹 Filtrar con parámetro (por número de orden)
  const handleFiltrarConParametro = async (numeroOrden) => {
    setCargando(true);
    try {
      const resultado = await detalleOrden2(numeroOrden);
      console.log("Resultado de detalleOrden2:", resultado);

      if (resultado.data && resultado.data.length > 0) {
        const nombreCliente = buscarNombreCliente(numeroOrden);

        // ✅ Buscar la orden en el listado del día (para estado correcto)
        const ordenDelDia = ordenesDelDia.find(
          (ord) =>
            ord.numero_orden == numeroOrden ||
            ord.id == numeroOrden ||
            ord.order_id == numeroOrden ||
            ord.numero == numeroOrden
        );

        const estadoActual =
          ordenDelDia?.estado || resultado.data[0].estado || "Pendiente de pago";

        setMensajeEstado(estadoActual);

        const ordenTransformada = {
          id: resultado.orden?.toString() || numeroOrden.toString(),
          cliente: nombreCliente,
          estado: estadoActual,
          productos: resultado.data.map((item) => ({
            codigo: item.id_producto?.toString(),
            descripcion: item.nombre,
            cantidad: item.cantidad,
            precio: parseFloat(item.precio_unitario),
          })),
        };

        setOrdenEncontrada(ordenTransformada);
      } else {
        setOrdenEncontrada(null);
        alert("Orden no encontrada");
      }
    } catch (error) {
      console.error("Error buscando orden:", error);
      alert("Error al buscar la orden");
    } finally {
      setCargando(false);
    }
  };

  // 🔹 Filtrar
  const handleFiltrar = async () => {
    if (!busqueda.trim()) return;

    if (cargandoOrdenes) {
      alert("Cargando órdenes del día, por favor espera...");
      return;
    }

    setCargando(true);
    try {
      if (filtro === "numero") {
        await handleFiltrarConParametro(busqueda);
      } else {
        const ordenesFiltradas = buscarOrdenesPorNombre(busqueda);

        if (ordenesFiltradas.length > 0) {
          const primeraOrden = ordenesFiltradas[0];
          const numeroOrden =
            primeraOrden.numero_orden ||
            primeraOrden.id ||
            primeraOrden.order_id ||
            primeraOrden.numero;

          if (numeroOrden) {
            setBusqueda(numeroOrden.toString());
            await handleFiltrarConParametro(numeroOrden.toString());
          } else {
            setOrdenEncontrada(null);
            alert("No se pudo obtener el número de orden");
          }
        } else {
          setOrdenEncontrada(null);
          alert("No se encontraron órdenes para ese cliente");
        }
      }
    } catch (error) {
      console.error("Error buscando orden:", error);
      alert("Error al buscar la orden");
    } finally {
      setCargando(false);
    }
  };

  // 🔹 Cambiar filtro
  const cambiarFiltro = (nuevoFiltro) => {
    if (nuevoFiltro !== filtro) setFiltro(nuevoFiltro);
  };

  // 🔹 Calcular total
  const calcularTotal = (productos) =>
    productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);

  // 🔹 Cobrar
  const handleCobrar = async () => {
    if (ordenEncontrada && ordenEncontrada.estado === "Pendiente de pago") {
      try {
        setCargando(true);
        const resultado = await updateOrden(ordenEncontrada.id, estado.estado);
        if (resultado.data) alert("Orden actualizada correctamente");

        setOrdenEncontrada({ ...ordenEncontrada, estado: "En preparación" });
        setMensajeEstado("En preparación");
      } catch (error) {
        console.error("Error al ejecutar COBRAR:", error);
        alert("Error al ejecutar COBRAR");
      } finally {
        setCargando(false);
      }
    }
  };

 return (
  <ScrollView style={styles.container}>
    <Text style={styles.titulo}>Buscar órdenes</Text>

    {/* Filtros */}
    <View style={styles.filtrosContainer}>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkboxItem}
          onPress={() => cambiarFiltro("numero")}
        >
          <Ionicons
            name={filtro === "numero" ? "checkbox" : "square-outline"}
            size={22}
            color="black"
          />
          <Text style={styles.checkboxText}>Número de orden</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxItem}
          onPress={() => cambiarFiltro("nombre")}
        >
          <Ionicons
            name={filtro === "nombre" ? "checkbox" : "square-outline"}
            size={22}
            color="black"
          />
          <Text style={styles.checkboxText}>Nombre del cliente</Text>
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
        <TouchableOpacity
          style={[
            styles.botonFiltrar,
            (cargando || cargandoOrdenes) && styles.botonDeshabilitado,
          ]}
          onPress={handleFiltrar}
          disabled={cargando || cargandoOrdenes}
        >
          <Text style={styles.textoBoton}>
            {cargando
              ? "Buscando..."
              : cargandoOrdenes
              ? "Cargando..."
              : "Filtrar"}
          </Text>
        </TouchableOpacity>
      </View>

      {cargandoOrdenes && (
        <Text style={styles.mensajeCarga}>Cargando órdenes del día...</Text>
      )}
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
            <Text style={styles.columnaImporte}>
              Q{p.cantidad * p.precio}
            </Text>
          </View>
        ))}

        {/* Total con botón cobrar */}
        {/* <View style={styles.totalRowConBoton}>
          <TouchableOpacity
            style={[
              styles.botonCobrar,
              mensajeEstado !== "Pendiente de pago" && styles.botonDeshabilitado,
            ]}
            onPress={handleCobrar}
            disabled={mensajeEstado !== "Pendiente de pago"}
          >
            <Text style={styles.textoBoton}>COBRAR</Text>
          </TouchableOpacity>
          <Text style={styles.totalText}>
            GTQ {calcularTotal(ordenEncontrada.productos)}
          </Text>
        </View> */}

        {/* Estado actual */}
        {mensajeEstado !== "" && (
          <View
            style={[
              styles.estado,
              mensajeEstado.includes("Pendiente de pago")
                ? styles.estadoPendiente
                : mensajeEstado.includes("En preparación")
                ? styles.estadoPreparacion
                : mensajeEstado.includes("Completada")
                ? styles.estadoCompletada
                : mensajeEstado.includes("Cancelada")
                ? styles.estadoCancelada
                : null,
            ]}
          >
            <Text style={styles.estadoTexto}>{mensajeEstado}</Text>
          </View>
        )}
        
        {mensajeEstado === "Pendiente de pago" && (
          <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 15 }}>
            <TouchableOpacity
              style={[styles.botonCambiar, { backgroundColor: "#B89A59" }]}
              onPress={() => {
                setOrdenEncontrada({ ...ordenEncontrada, estado: "En preparación" });
                setMensajeEstado("En preparación");
                updateOrden(ordenEncontrada.id, { estado: "En preparacion" });
              }}
            >
              <Text style={styles.textoBoton}>En preparación</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botonCambiar, { backgroundColor: "#d9534f", marginLeft: 10 }]}
              onPress={() => {
                setOrdenEncontrada({ ...ordenEncontrada, estado: "Cancelada" });
                setMensajeEstado("Cancelada");
                updateOrden(ordenEncontrada.id, { estado: "Cancelada" });
              }}
            >
              <Text style={styles.textoBoton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}

        {mensajeEstado === "En preparación" && (
          <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 15 }}>
            <TouchableOpacity
              style={[styles.botonCambiar, { backgroundColor: "#B89A59" }]}
              onPress={() => {
                setOrdenEncontrada({ ...ordenEncontrada, estado: "Completada" });
                setMensajeEstado("Completada");
                updateOrden(ordenEncontrada.id, { estado: "Completada" });
              }}
            >
              <Text style={styles.textoBoton}>Completada</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botonCambiar, { backgroundColor: "#d9534f", marginLeft: 10 }]}
              onPress={() => {
                setOrdenEncontrada({ ...ordenEncontrada, estado: "Cancelada" });
                setMensajeEstado("Cancelada");
                updateOrden(ordenEncontrada.id, { estado: "Cancelada" });
              }}
            >
              <Text style={styles.textoBoton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )}

    {/* Modal Imprimiendo */}
    <Modal visible={mostrarModal} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalCaja}>
          <Text style={styles.modalTitulo}>Imprimiendo</Text>
          <View style={styles.ticket}>
            <Text style={styles.ticketTitulo}>
              Orden #{ordenEncontrada?.id}
            </Text>
            <Text style={styles.ticketCliente}>
              Cliente: {ordenEncontrada?.cliente}
            </Text>
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
