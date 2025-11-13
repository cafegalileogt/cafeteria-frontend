import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/perfilStyle";
import { useRouter } from "expo-router";
import Header from "../../components/header";
import { useUser } from "../../../services/userContext";
import { Ionicons } from "@expo/vector-icons";
import {
	Nunito_900Black,
	Nunito_400Regular,
	useFonts,
} from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";

export default function perfil() {
	const router = useRouter();
	const { user } = useUser();

	const history = () => {
		router.push("/screens/historial");
	};

	const [loaded, error] = useFonts({
		Nunito_900Black,
		Nunito_400Regular,
	});

	useEffect(() => {
		if (loaded || error) SplashScreen.hideAsync();
	}, [loaded, error]);

	return (
		<View style={styles.container}>
			{/* Header */}
			<Header></Header>

			{/* Contenido principal */}
			<View style={styles.topSection}>
				<Ionicons name="person-circle-outline" size={100} />
				<Text style={styles.sectionTitle}> Información de Usuario </Text>
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.infoRow}>
					<Ionicons name="person" size={32} />
					<Text style={styles.infoText}>{user?.nombreCompleto}</Text>
				</View>

				<View style={styles.infoRow}>
					<Ionicons name="mail" size={32} />
					<Text style={styles.infoText}>{user?.correo}</Text>
				</View>
				<TouchableOpacity onPress={() => history()}>
					<View style={styles.infoRow}>
						<Ionicons name="timer" size={32} />
						<Text style={styles.infoText}>Historial</Text>
					</View>
				</TouchableOpacity>

				<View style={styles.infoRow}>
					<Ionicons name="log-out" size={32} />
					<Text style={styles.infoText}>Logout</Text>
				</View>
			</View>
		</View>
	);
}
