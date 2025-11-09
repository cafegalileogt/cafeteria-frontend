import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import {
	getSchedule,
	updateSchedule,
	createException,
	deleteException,
} from "../../../services/api";
import { styles } from "../../styles/gestionHorarioStyle";
import {
	Nunito_900Black,
	Nunito_400Regular,
	Nunito_700Bold,
	useFonts,
} from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";

export default function GestionarHorario() {
	const [horarios, setHorarios] = useState([]);
	const [excepciones, setExcepciones] = useState([]);
	const [mostrarModalHorario, setMostrarModalHorario] = useState(false);
	const [mostrarModalExcepcion, setMostrarModalExcepcion] = useState(false);
	const [formHorario, setFormHorario] = useState({
		dia: "",
		apertura: "",
		cierre: "",
		cerrado: false,
	});
	const [formExcepcion, setFormExcepcion] = useState({
		fecha: "",
		descripcion: "",
		apertura: "",
		cierre: "",
		cerrado: false,
	});
	const [loaded, error] = useFonts({
		Nunito_900Black,
		Nunito_400Regular,
		Nunito_700Bold,
	});

	useEffect(() => {
		if (loaded || error) SplashScreen.hideAsync();
	}, [loaded, error]);

	useEffect(() => {
		const fetchSchedule = async () => {
			try {
				const data = await getSchedule();

				console.log("data debug: ", data);
				setHorarios(data.dias_semana);
				const excepcionesFormateadas = (data.excepciones || []).map((ex) => ({
					...ex,
					fecha_excepcion: new Date(ex.fecha_excepcion)
						.toISOString()
						.split("T")[0],
				}));
				setExcepciones(excepcionesFormateadas);
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
			let { apertura, cierre, dia_semana, is_closed } = formHorario;
			let datos = {
				hora_apertura: formHorario.apertura,
				hora_cierre: formHorario.cierre,
				is_closed: formHorario.is_closed,
			};
			await updateSchedule(formHorario.dia_semana, datos);
			console.log("que viene en form", formHorario);
			setHorarios(
				horarios.map((h) =>
					h.dia_semana === formHorario.dia_semana ? formHorario : h,
				),
			);
			alert("✅ Cambios guardados correctamente");
			setMostrarModalHorario(false);
		} catch (error) {
			console.error("Error al guardar horario:", error);
		}
	};

	const handleEliminarExcepcion = async (id_excepcion) => {
		const confirmar = window.confirm(
			"¿Seguro que deseas eliminar esta excepción?",
		);
		if (!confirmar) return;

		try {
			const deleted = await deleteException(id_excepcion);
			console.log("delete data: ", deleted);
			setExcepciones(
				excepciones.filter((ex) => ex.id_excepcion !== id_excepcion),
			);
			window.alert("Excepción eliminada correctamente");
		} catch (error) {
			console.error("Error al eliminar excepción:", error);
			window.alert(" No se pudo eliminar la excepción.");
		}
	};

	const handleAgregarExcepcion = () => {
		setFormExcepcion({
			fecha: "",
			descripcion: "",
			apertura: "",
			cierre: "",
			cerrado: false,
		});
		setMostrarModalExcepcion(true);
	};

	const handleGuardarExcepcion = async () => {
		const nueva = {
			// id: excepciones.length + 1,
			fecha_excepcion: formExcepcion.fecha,
			descripcion: formExcepcion.descripcion,
			hora_apertura: formExcepcion.apertura,
			hora_cierre: formExcepcion.cierre,
			is_closed: formExcepcion.cerrado,
		};
		try {
			await createException(nueva);
			// createException(fecha_excepcion, hora_apertura, hora_cierre, is_closed, descripcion)
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
					<Text style={styles.colDia}>Día</Text>
					<Text style={styles.colHora}>Apertura</Text>
					<Text style={styles.colHora}>Cierre</Text>
					<Text style={styles.colActivo}>Activo</Text>
					<Text style={styles.colAccion}>Acción</Text>
				</View>

				{horarios.map((item, index) => (
					<View style={styles.row} key={index}>
						<Text style={styles.colDia}>{item.dia_semana}</Text>
						<Text style={styles.colHora}>{item.hora_apertura}</Text>
						<Text style={styles.colHora}>{item.hora_cierre}</Text>
						<Text style={styles.colActivo}>{item.is_closed ? "❌" : "☑️"}</Text>
						<View style={styles.colAccion}>
							<TouchableOpacity
								style={styles.btnPrimary}
								onPress={() => handleEditarHorario(item)}
							>
								<Text style={styles.btnText}>Modificar</Text>
							</TouchableOpacity>
						</View>
					</View>
				))}
			</View>

			{/* Excepciones */}
			<View style={styles.card}>
				<View style={styles.excepcionHeader}>
					<Text style={styles.sectionTitle}>Excepciones</Text>
					<TouchableOpacity
						style={styles.btnAdd}
						onPress={handleAgregarExcepcion}
					>
						<Text style={styles.btnText}>Agregar</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.tableHeader}>
					<Text style={styles.colFecha}>Fecha</Text>
					<Text style={styles.colDescripcion}>Descripción</Text>
					<Text style={styles.colHora}>Apertura</Text>
					<Text style={styles.colHora}>Cierre</Text>
					<Text style={styles.colAccion}>Acción</Text>
				</View>

				{excepciones.map((ex) => (
					<View style={styles.row} key={ex.id_exception}>
						<Text style={styles.colFecha}>{ex.fecha_excepcion}</Text>
						<Text style={styles.colDescripcion} numberOfLines={1}>
							{ex.descripcion}
						</Text>
						<Text style={styles.colHora}>{ex.hora_apertura}</Text>
						<Text style={styles.colHora}>{ex.hora_cierre}</Text>
						<View style={[styles.colAccion, styles.accionBtns]}>
							<TouchableOpacity style={styles.btnPrimary}>
								<Text style={styles.btnText}>Modificar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.btnDanger}
								onPress={() => handleEliminarExcepcion(ex.id_exception)}
							>
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
						<Text style={styles.modalTitle}>
							Modificar horario - {formHorario.dia_semana}
						</Text>
						<Text style={styles.label}>Hora de apertura</Text>
						<TextInput
							style={styles.input}
							placeholder="8:00 A.M."
							value={formHorario.apertura}
							onChangeText={(text) =>
								setFormHorario({ ...formHorario, apertura: text })
							}
						/>
						<Text style={styles.label}>Hora de cierre</Text>
						<TextInput
							style={styles.input}
							placeholder="18:00 P.M."
							value={formHorario.cierre}
							onChangeText={(text) =>
								setFormHorario({ ...formHorario, cierre: text })
							}
						/>
						<View style={styles.checkboxContainer}>
							<input
								type="checkbox"
								checked={formHorario.cerrado}
								onChange={(e) =>
									setFormHorario({ ...formHorario, cerrado: e.target.checked })
								}
							/>
							<Text style={styles.checkboxLabel}>Cerrado este día</Text>
						</View>
						<View style={styles.btnRow}>
							<TouchableOpacity
								style={styles.btnPrimary}
								onPress={handleGuardarHorario}
							>
								<Text style={styles.btnText}>Guardar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.btnDanger}
								onPress={() => setMostrarModalHorario(false)}
							>
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
							onChangeText={(text) =>
								setFormExcepcion({ ...formExcepcion, fecha: text })
							}
						/>
						<Text style={styles.label}>Descripción</Text>
						<TextInput
							style={styles.input}
							placeholder="Ej. Feriado Nacional"
							value={formExcepcion.descripcion}
							onChangeText={(text) =>
								setFormExcepcion({ ...formExcepcion, descripcion: text })
							}
						/>
						<View style={styles.rowBetween}>
							<View style={{ flex: 1, marginRight: 5 }}>
								<Text style={styles.label}>Hora de apertura</Text>
								<TextInput
									style={styles.input}
									placeholder="10:00 A.M."
									value={formExcepcion.apertura}
									onChangeText={(text) =>
										setFormExcepcion({ ...formExcepcion, apertura: text })
									}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<Text style={styles.label}>Hora de cierre</Text>
								<TextInput
									style={styles.input}
									placeholder="13:00 P.M."
									value={formExcepcion.cierre}
									onChangeText={(text) =>
										setFormExcepcion({ ...formExcepcion, cierre: text })
									}
								/>
							</View>
						</View>
						<View style={styles.checkboxContainer}>
							<input
								type="checkbox"
								checked={formExcepcion.cerrado}
								onChange={(e) =>
									setFormExcepcion({
										...formExcepcion,
										cerrado: e.target.checked,
									})
								}
							/>
							<Text style={styles.checkboxLabel}>Cerrado este día</Text>
						</View>
						<View style={styles.btnRow}>
							<TouchableOpacity
								style={styles.btnPrimary}
								onPress={handleGuardarExcepcion}
							>
								<Text style={styles.btnText}>Guardar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.btnDanger}
								onPress={() => setMostrarModalExcepcion(false)}
							>
								<Text style={styles.btnText}>Cancelar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	);
}
