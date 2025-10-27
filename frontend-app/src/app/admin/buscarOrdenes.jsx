import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import styles from "../../styles/buscarOrdenesStyle";
import { detalleOrden2, getTodayOrders } from "../../../services/api";

export default function BuscarOrdenes() {
  const params = useLocalSearchParams();
  const [filtro, setFiltro] = useState("numero");
  const [busqueda, setBusqueda] = useState("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [ordenesDelDia, setOrdenesDelDia] = useState([]);
  const [cargandoOrdenes, setCargandoOrdenes] = useState(true);

  // Cargar órdenes del día al montar el componente
  useEffect(() => {
    const cargarOrdenesDelDia = async () => {
      try {
        setCargandoOrdenes(true);
        const resultado = await getTodayOrders();
        console.log("Órdenes del día:", resultado); // Para depuración
        
        if (resultado.status === 200 && resultado.data) {
          setOrdenesDelDia(resultado.data);
        } else {
          console.error("Error en respuesta de órdenes del día:", resultado);
        }
      } catch (error) {
        console.error("Error cargando órdenes del día:", error);
      } finally {
        setCargandoOrdenes(false);
      }
    };

    cargarOrdenesDelDia();
  }, []);

  // Efecto para limpiar la búsqueda y resultados cuando cambia el filtro
  useEffect(() => {
    // Limpiar los resultados de búsqueda anteriores
    setBusqueda("");
    setOrdenEncontrada(null);
    setMostrarModal(false);
  }, [filtro]); // Se ejecuta cuando cambia el tipo de filtro

  // Buscar el nombre del cliente en las órdenes del día
  const buscarNombreCliente = (numeroOrden) => {
    console.log("Buscando cliente para orden:", numeroOrden);
    console.log("Órdenes disponibles:", ordenesDelDia);
    
    // Buscar por diferentes campos posibles
    const orden = ordenesDelDia.find(ord => {
      // Intentar diferentes campos donde podría estar el número de orden
      return ord.numero_orden == numeroOrden || 
             ord.id == numeroOrden || 
             ord.order_id == numeroOrden ||
             ord.numero == numeroOrden;
    });
    
    console.log("Orden encontrada para cliente:", orden);
    
    if (orden) {
      // Intentar diferentes campos donde podría estar el nombre del cliente
      return orden.cliente || 
             orden.nombre_cliente || 
             orden.customer_name || 
             orden.nombre || 
             "Cliente";
    }
    
    return "Cliente no disponible";
  };

  // Buscar órdenes por nombre de cliente
  const buscarOrdenesPorNombre = (nombreCliente) => {
    console.log("Buscando órdenes por nombre:", nombreCliente);
    console.log("Órdenes disponibles:", ordenesDelDia);
    
    const ordenesFiltradas = ordenesDelDia.filter(orden => {
      const nombre = orden.cliente || 
                    orden.nombre_cliente || 
                    orden.customer_name || 
                    orden.nombre;
      
      return nombre && nombre.toLowerCase().includes(nombreCliente.toLowerCase());
    });
    
    console.log("Órdenes filtradas por nombre:", ordenesFiltradas);
    return ordenesFiltradas;
  };

  // Efecto para cuando se recibe un número de orden por parámetros
  useEffect(() => {
    if (params.numero_orden && ordenesDelDia.length > 0) {
      setFiltro("numero");
      setBusqueda(params.numero_orden.toString());
      handleFiltrarConParametro(params.numero_orden.toString());
    }
  }, [params.numero_orden, ordenesDelDia]);

  const handleFiltrarConParametro = async (numeroOrden) => {
    setCargando(true);
    try {
      const resultado = await detalleOrden2(numeroOrden);
      console.log("Resultado de detalleOrden2:", resultado); // Para depuración
      
      if (resultado.data && resultado.data.length > 0) {
        const nombreCliente = buscarNombreCliente(numeroOrden);
        
        const ordenTransformada = {
          id: resultado.orden.toString(),
          cliente: nombreCliente,
          estado: "Pendiente de Pago",
          productos: resultado.data.map(item => ({
            codigo: item.id_producto.toString(),
            descripcion: item.nombre,
            cantidad: item.cantidad,
            precio: parseFloat(item.precio_unitario)
          }))
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

  const handleFiltrar = async () => {
    if (!busqueda.trim()) return;

    // Si todavía se están cargando las órdenes del día
    if (cargandoOrdenes) {
      alert("Cargando órdenes del día, por favor espera...");
      return;
    }

    setCargando(true);
    try {
      if (filtro === "numero") {
        await handleFiltrarConParametro(busqueda);
      } else {
        // Para búsqueda por nombre
        const ordenesFiltradas = buscarOrdenesPorNombre(busqueda);
        
        if (ordenesFiltradas.length > 0) {
          // Tomar la primera orden y mostrar su detalle
          const primeraOrden = ordenesFiltradas[0];
          const numeroOrden = primeraOrden.numero_orden || 
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

  // Función para cambiar el filtro y limpiar automáticamente
  const cambiarFiltro = (nuevoFiltro) => {
    if (nuevoFiltro !== filtro) {
      setFiltro(nuevoFiltro);
      // El efecto de limpieza se ejecutará automáticamente por el useEffect anterior
    }
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
            style={[styles.botonFiltrar, (cargando || cargandoOrdenes) && styles.botonDeshabilitado]} 
            onPress={handleFiltrar}
            disabled={cargando || cargandoOrdenes}
          >
            <Text style={styles.textoBoton}>
              {cargando ? "Buscando..." : cargandoOrdenes ? "Cargando..." : "Filtrar"}
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
              <Text style={styles.columnaImporte}>Q{p.cantidad * p.precio}</Text>
            </View>
          ))}

          {/* Total con botón cobrar */}
          <View style={styles.totalRowConBoton}>
            <TouchableOpacity 
              style={[
                styles.botonCobrar, 
                ordenEncontrada.estado !== "Pendiente de Pago" && styles.botonDeshabilitado
              ]} 
              onPress={handleCobrar}
              disabled={ordenEncontrada.estado !== "Pendiente de Pago"}
            >
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
              <Text style={styles.ticketCliente}>Cliente: {ordenEncontrada?.cliente}</Text>
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