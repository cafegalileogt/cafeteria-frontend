import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { getSchedule, updateSchedule, createException } from "../../../services/api";
import { styles } from "../../styles/gestionHorarioStyle";

export default function GestionarHorario() {
  const [horarios, setHorarios] = useState([]);
  const [excepciones, setExcepciones] = useState([]);
  const [mostrarModalHorario, setMostrarModalHorario] = useState(false);
  const [mostrarModalExcepcion, setMostrarModalExcepcion] = useState(false);
  const [formHorario, setFormHorario] = useState({ dia: "", apertura: "", cierre: "", cerrado: false });
  const [formExcepcion, setFormExcepcion] = useState({ fecha: "", descripcion: "", apertura: "", cierre: "", cerrado: false });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getSchedule();
        if (!data || !data.horarios) {
          setHorarios([
            { dia: "Lunes", apertura: "7:00", cierre: "21:00", cerrado: false },
            { dia: "Martes", apertura: "7:00", cierre: "21:00", cerrado: false },
            { dia: "Miércoles", apertura: "7:00", cierre: "21:00", cerrado: false },
            { dia: "Jueves", apertura: "7:00", cierre: "21:00", cerrado: false },
            { dia: "Viernes", apertura: "7:00", cierre: "21:00", cerrado: false },
            { dia: "Sábado", apertura: "8:00", cierre: "18:00", cerrado: false },
            { dia: "Domingo", apertura: "--:--", cierre: "--:--", cerrado: true },
          ]);
          setExcepciones([
            { id: 1, fecha: "15/09/2025", descripcion: "Feriado Nacional", apertura: "--:--", cierre: "--:--", cerrado: true },
            { id: 2, fecha: "20/10/2025", descripcion: "Evento Especial", apertura: "10:00", cierre: "13:00", cerrado: false },
          ]);
        } else {
          setHorarios(data.horarios);
          setExcepciones(data.excepciones || []);
        }
      } catch (error) {
        console.error("Error al obtener el horario:", error);
      }
    };
    fetchSchedule();
  }, []);

  const handleEditarHorario = (item) => {
    setFormHorario(item);
    setMostrarModalHorario(true);
  };

  const handleGuardarHorario = async () => {
    try {
      await updateSchedule(formHorario);
      setHorarios(horarios.map((h) => (h.dia === formHorario.dia ? formHorario : h)));
      alert("✅ Cambios guardados correctamente");
      setMostrarModalHorario(false);
    } catch (error) {
      console.error("Error al guardar horario:", error);
    }
  };

  const handleEliminarExcepcion = (id) => {
    Alert.alert("Confirmar eliminación", "¿Seguro que deseas eliminar esta excepción?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setExcepciones(excepciones.filter((ex) => ex.id !== id));
          alert("🗑️ Excepción eliminada correctamente");
        },
      },
    ]);
  };

  const handleAgregarExcepcion = () => {
    setFormExcepcion({ fecha: "", descripcion: "", apertura: "", cierre: "", cerrado: false });
    setMostrarModalExcepcion(true);
  };

  const handleGuardarExcepcion = async () => {
    const nueva = {
      id: excepciones.length + 1,
      fecha: formExcepcion.fecha,
      descripcion: formExcepcion.descripcion,
      apertura: formExcepcion.apertura,
      cierre: formExcepcion.cierre,
      cerrado: formExcepcion.cerrado,
    };
    try {
      await createException(nueva);
      setExcepciones([...excepciones, nueva]);
      alert("✅ Excepción agregada correctamente");
      setMostrarModalExcepcion(false);
    } catch (error) {
      console.error("Error al crear excepción:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>GESTIONAR HORARIO</Text>

      {/* Horarios */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Horarios de la semana</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.col}>Día</Text>
          <Text style={styles.col}>Apertura</Text>
          <Text style={styles.col}>Cierre</Text>
          <Text style={styles.col}>Activo</Text>
          <Text style={styles.col}>Acción</Text>
        </View>

        {horarios.map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.col}>{item.dia}</Text>
            <Text style={styles.col}>{item.apertura}</Text>
            <Text style={styles.col}>{item.cierre}</Text>
            <Text style={styles.col}>{item.cerrado ? "❌" : "☑️"}</Text>
            <TouchableOpacity style={styles.btnPrimary} onPress={() => handleEditarHorario(item)}>
              <Text style={styles.btnText}>Modificar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Excepciones */}
      <View style={styles.card}>
        <View style={styles.excepcionHeader}>
          <Text style={styles.sectionTitle}>Excepciones</Text>
          <TouchableOpacity style={styles.btnAdd} onPress={handleAgregarExcepcion}>
            <Text style={styles.btnText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.col}>Fecha</Text>
          <Text style={styles.col}>Descripción</Text>
          <Text style={styles.col}>Apertura</Text>
          <Text style={styles.col}>Cierre</Text>
          <Text style={styles.col}>Acción</Text>
        </View>

        {excepciones.map((ex) => (
          <View style={styles.row} key={ex.id}>
            <Text style={styles.col}>{ex.fecha}</Text>
            <Text style={styles.col}>{ex.descripcion}</Text>
            <Text style={styles.col}>{ex.apertura}</Text>
            <Text style={styles.col}>{ex.cierre}</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TouchableOpacity style={styles.btnPrimary}>
                <Text style={styles.btnText}>Modificar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDanger} onPress={() => handleEliminarExcepcion(ex.id)}>
                <Text style={styles.btnText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Modal horario */}
      {mostrarModalHorario && (
        <View style={styles.modal}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Modificar horario - {formHorario.dia}</Text>
            <Text style={styles.label}>Hora de apertura</Text>
            <TextInput
              style={styles.input}
              placeholder="8:00 A.M."
              value={formHorario.apertura}
              onChangeText={(text) => setFormHorario({ ...formHorario, apertura: text })}
            />
            <Text style={styles.label}>Hora de cierre</Text>
            <TextInput
              style={styles.input}
              placeholder="18:00 P.M."
              value={formHorario.cierre}
              onChangeText={(text) => setFormHorario({ ...formHorario, cierre: text })}
            />
            <View style={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={formHorario.cerrado}
                onChange={(e) => setFormHorario({ ...formHorario, cerrado: e.target.checked })}
              />
              <Text style={styles.checkboxLabel}>Cerrado este día</Text>
            </View>
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btnPrimary} onPress={handleGuardarHorario}>
                <Text style={styles.btnText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDanger} onPress={() => setMostrarModalHorario(false)}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Modal excepción */}
      {mostrarModalExcepcion && (
        <View style={styles.modal}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Agregar Excepción</Text>
            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={styles.input}
              placeholder="20 de Octubre"
              value={formExcepcion.fecha}
              onChangeText={(text) => setFormExcepcion({ ...formExcepcion, fecha: text })}
            />
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Feriado Nacional"
              value={formExcepcion.descripcion}
              onChangeText={(text) => setFormExcepcion({ ...formExcepcion, descripcion: text })}
            />
            <View style={styles.rowBetween}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={styles.label}>Hora de apertura</Text>
                <TextInput
                  style={styles.input}
                  placeholder="10:00 A.M."
                  value={formExcepcion.apertura}
                  onChangeText={(text) => setFormExcepcion({ ...formExcepcion, apertura: text })}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Hora de cierre</Text>
                <TextInput
                  style={styles.input}
                  placeholder="13:00 P.M."
                  value={formExcepcion.cierre}
                  onChangeText={(text) => setFormExcepcion({ ...formExcepcion, cierre: text })}
                />
              </View>
            </View>
            <View style={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={formExcepcion.cerrado}
                onChange={(e) => setFormExcepcion({ ...formExcepcion, cerrado: e.target.checked })}
              />
              <Text style={styles.checkboxLabel}>Cerrado este día</Text>
            </View>
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btnPrimary} onPress={handleGuardarExcepcion}>
                <Text style={styles.btnText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDanger} onPress={() => setMostrarModalExcepcion(false)}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
