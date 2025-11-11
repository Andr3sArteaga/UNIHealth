import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@context/AuthContext";
import { theme } from "../styles/theme";
import { getMyAppointments } from "@services/appointments";
import { getMyProfile } from "@services/patients";

export default function HomeScreen() {
	const navigation = useNavigation<any>();
	const { user } = useAuth();
	const [nextAppointment, setNextAppointment] = useState<any>(null);
	const [lastVitals, setLastVitals] = useState<any>(null);
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			setLoading(true);
			// Load appointments
			const appointments = await getMyAppointments();
			const upcoming = appointments
				.filter((apt) => new Date(apt.fecha) > new Date())
				.sort(
					(a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
				)[0];
			setNextAppointment(upcoming);

			// Load profile
			const profileData = await getMyProfile();
			setProfile(profileData);

			// Mock last vitals (would come from medical API)
			setLastVitals({
				fecha_registro: "2024-01-15",
				presion_sistolica: 120,
				presion_diastolica: 80,
				frecuencia_cardiaca: 72,
				temperatura: 36.5,
			});
		} catch (error) {
			console.error("Error loading data:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleEmergencyAlert = () => {
		navigation.navigate("AlertScreen");
	};

	const QuickAccessCard = ({
		title,
		icon,
		onPress,
		color = theme.colors.primary,
	}: any) => (
		<TouchableOpacity
			style={[styles.quickAccessCard, { borderLeftColor: color }]}
			onPress={onPress}
		>
			<Text style={styles.quickAccessIcon}>{icon}</Text>
			<Text style={styles.quickAccessTitle}>{title}</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.welcomeSection}>
						<Text style={styles.welcomeText}>¡Hola!</Text>
						<Text style={styles.userName}>{user?.name || "Estudiante"}</Text>
					</View>

					<TouchableOpacity
						style={styles.emergencyButton}
						onPress={handleEmergencyAlert}
						testID="emergency-alert-button"
					>
						<Text style={styles.emergencyButtonText}>
							🚨 Alerta de Emergencia
						</Text>
					</TouchableOpacity>
				</View>

				{/* Quick Access Cards */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Accesos Rápidos</Text>
					<View style={styles.quickAccessGrid}>
						<QuickAccessCard
							title="Historial Médico"
							icon="📋"
							onPress={() => navigation.navigate("ProfileScreen")}
							color="#4CAF50"
						/>
						<QuickAccessCard
							title="Agendar Cita"
							icon="📅"
							onPress={() => navigation.navigate("AppointmentsScreen")}
							color="#2196F3"
						/>
						<QuickAccessCard
							title="Diario Médico"
							icon="📝"
							onPress={() => navigation.navigate("DiaryScreen")}
							color="#FF9800"
						/>
						<QuickAccessCard
							title="Chat Médico"
							icon="💬"
							onPress={() =>
								Alert.alert("Próximamente", "Función de chat en desarrollo")
							}
							color="#9C27B0"
						/>
					</View>
				</View>

				{/* Next Appointment */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Próxima Cita</Text>
					{nextAppointment ? (
						<View style={styles.appointmentCard}>
							<View style={styles.appointmentHeader}>
								<Text style={styles.appointmentDate}>
									{new Date(nextAppointment.fecha).toLocaleDateString("es-ES", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</Text>
								<Text style={styles.appointmentTime}>
									{nextAppointment.hora_inicio} - {nextAppointment.hora_fin}
								</Text>
							</View>
							<View style={styles.appointmentDetails}>
								<Text style={styles.appointmentService}>
									{nextAppointment.servicio.nombre}
								</Text>
								<Text style={styles.appointmentDoctor}>
									Dr. {nextAppointment.medico.nombre}
								</Text>
							</View>
							<TouchableOpacity
								style={styles.viewAppointmentButton}
								onPress={() => navigation.navigate("AppointmentsScreen")}
							>
								<Text style={styles.viewAppointmentButtonText}>
									Ver Detalles
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.noAppointmentCard}>
							<Text style={styles.noAppointmentText}>
								No tienes citas programadas
							</Text>
							<TouchableOpacity
								style={styles.scheduleButton}
								onPress={() => navigation.navigate("AppointmentsScreen")}
							>
								<Text style={styles.scheduleButtonText}>Agendar Cita</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>

				{/* Last Vital Signs */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Últimos Signos Vitales</Text>
					{lastVitals ? (
						<View style={styles.vitalsCard}>
							<View style={styles.vitalsHeader}>
								<Text style={styles.vitalsDate}>
									{new Date(lastVitals.fecha_registro).toLocaleDateString(
										"es-ES"
									)}
								</Text>
								<Text style={styles.vitalsSubtext}>Registrado por médico</Text>
							</View>
							<View style={styles.vitalsGrid}>
								<View style={styles.vitalItem}>
									<Text style={styles.vitalLabel}>Presión</Text>
									<Text style={styles.vitalValue}>
										{lastVitals.presion_sistolica}/
										{lastVitals.presion_diastolica}
									</Text>
									<Text style={styles.vitalUnit}>mmHg</Text>
								</View>
								<View style={styles.vitalItem}>
									<Text style={styles.vitalLabel}>Pulso</Text>
									<Text style={styles.vitalValue}>
										{lastVitals.frecuencia_cardiaca}
									</Text>
									<Text style={styles.vitalUnit}>bpm</Text>
								</View>
								<View style={styles.vitalItem}>
									<Text style={styles.vitalLabel}>Temperatura</Text>
									<Text style={styles.vitalValue}>
										{lastVitals.temperatura}
									</Text>
									<Text style={styles.vitalUnit}>°C</Text>
								</View>
							</View>
						</View>
					) : (
						<View style={styles.noVitalsCard}>
							<Text style={styles.noVitalsText}>
								No hay signos vitales registrados
							</Text>
						</View>
					)}
				</View>

				{/* Student Info */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Mi Información</Text>
					{loading ? (
						<View style={styles.infoCard}>
							<Text style={styles.noVitalsText}>Cargando información...</Text>
						</View>
					) : (
						<View style={styles.infoCard}>
							<View style={styles.infoItem}>
								<Text style={styles.infoLabel}>Nombre Completo</Text>
								<Text style={styles.infoValue}>
									{profile?.nombres && profile?.apellidos
										? `${profile.nombres} ${profile.apellidos}`
										: "No registrado"}
								</Text>
							</View>
							<View style={styles.infoItem}>
								<Text style={styles.infoLabel}>Fecha de Nacimiento</Text>
								<Text style={styles.infoValue}>
									{profile?.fecha_nacimiento
										? new Date(profile.fecha_nacimiento).toLocaleDateString(
												"es-ES"
										  )
										: "No registrado"}
								</Text>
							</View>
							<View style={styles.infoItem}>
								<Text style={styles.infoLabel}>Tipo de Sangre</Text>
								<Text style={styles.infoValue}>
									{profile?.tipo_sangre || "No registrado"}
								</Text>
							</View>
							<View style={styles.infoItem}>
								<Text style={styles.infoLabel}>Contacto de Emergencia</Text>
								<Text style={styles.infoValue}>
									{profile?.contacto_emergencia || "No registrado"}
								</Text>
							</View>
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	scrollView: {
		flex: 1,
	},
	header: {
		padding: theme.spacing.space6,
		backgroundColor: theme.colors.white,
	},
	welcomeSection: {
		marginBottom: theme.spacing.space4,
	},
	welcomeText: {
		fontSize: theme.typography.fontSize.medium,
		color: theme.colors.textSecondary,
	},
	userName: {
		fontSize: theme.typography.fontSize.xlarge,
		fontWeight: "bold",
		color: theme.colors.textPrimary,
	},
	emergencyButton: {
		backgroundColor: "#FF5722",
		borderRadius: 8,
		paddingVertical: theme.spacing.space3,
		paddingHorizontal: theme.spacing.space4,
		alignItems: "center",
	},
	emergencyButtonText: {
		color: theme.colors.white,
		fontSize: theme.typography.fontSize.medium,
		fontWeight: "600",
	},
	section: {
		padding: theme.spacing.space6,
	},
	sectionTitle: {
		fontSize: theme.typography.fontSize.large,
		fontWeight: "600",
		color: theme.colors.textPrimary,
		marginBottom: theme.spacing.space4,
	},
	quickAccessGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: theme.spacing.space3,
	},
	quickAccessCard: {
		width: "47%",
		backgroundColor: theme.colors.white,
		borderRadius: 12,
		padding: theme.spacing.space4,
		borderLeftWidth: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	quickAccessIcon: {
		fontSize: 24,
		marginBottom: theme.spacing.space2,
	},
	quickAccessTitle: {
		fontSize: theme.typography.fontSize.medium,
		fontWeight: "500",
		color: theme.colors.textPrimary,
	},
	appointmentCard: {
		backgroundColor: theme.colors.white,
		borderRadius: 12,
		padding: theme.spacing.space5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	appointmentHeader: {
		marginBottom: theme.spacing.space3,
	},
	appointmentDate: {
		fontSize: theme.typography.fontSize.medium,
		fontWeight: "600",
		color: theme.colors.textPrimary,
		textTransform: "capitalize",
	},
	appointmentTime: {
		fontSize: theme.typography.fontSize.medium,
		color: theme.colors.primary,
		fontWeight: "500",
	},
	appointmentDetails: {
		marginBottom: theme.spacing.space4,
	},
	appointmentService: {
		fontSize: theme.typography.fontSize.medium,
		color: theme.colors.textPrimary,
		marginBottom: theme.spacing.space1,
	},
	appointmentDoctor: {
		fontSize: theme.typography.fontSize.small,
		color: theme.colors.textSecondary,
	},
	viewAppointmentButton: {
		backgroundColor: theme.colors.primary,
		borderRadius: 6,
		paddingVertical: theme.spacing.space2,
		alignItems: "center",
	},
	viewAppointmentButtonText: {
		color: theme.colors.white,
		fontSize: theme.typography.fontSize.small,
		fontWeight: "600",
	},
	noAppointmentCard: {
		backgroundColor: theme.colors.white,
		borderRadius: 12,
		padding: theme.spacing.space5,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	noAppointmentText: {
		fontSize: theme.typography.fontSize.medium,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.space3,
	},
	scheduleButton: {
		backgroundColor: theme.colors.primary,
		borderRadius: 6,
		paddingVertical: theme.spacing.space2,
		paddingHorizontal: theme.spacing.space4,
	},
	scheduleButtonText: {
		color: theme.colors.white,
		fontSize: theme.typography.fontSize.small,
		fontWeight: "600",
	},
	vitalsCard: {
		backgroundColor: theme.colors.white,
		borderRadius: 12,
		padding: theme.spacing.space5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	vitalsHeader: {
		marginBottom: theme.spacing.space4,
	},
	vitalsDate: {
		fontSize: theme.typography.fontSize.medium,
		fontWeight: "600",
		color: theme.colors.textPrimary,
	},
	vitalsSubtext: {
		fontSize: theme.typography.fontSize.small,
		color: theme.colors.textSecondary,
	},
	vitalsGrid: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	vitalItem: {
		alignItems: "center",
		flex: 1,
	},
	vitalLabel: {
		fontSize: theme.typography.fontSize.small,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.space1,
	},
	vitalValue: {
		fontSize: theme.typography.fontSize.large,
		fontWeight: "600",
		color: theme.colors.textPrimary,
	},
	vitalUnit: {
		fontSize: theme.typography.fontSize.small,
		color: theme.colors.textSecondary,
	},
	noVitalsCard: {
		backgroundColor: theme.colors.white,
		borderRadius: 12,
		padding: theme.spacing.space5,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	noVitalsText: {
		fontSize: theme.typography.fontSize.medium,
		color: theme.colors.textSecondary,
	},
	infoCard: {
		backgroundColor: theme.colors.white,
		borderRadius: 12,
		padding: theme.spacing.space5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	infoItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: theme.spacing.space2,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border,
	},
	infoLabel: {
		fontSize: theme.typography.fontSize.medium,
		color: theme.colors.textSecondary,
	},
	infoValue: {
		fontSize: theme.typography.fontSize.medium,
		fontWeight: "500",
		color: theme.colors.textPrimary,
	},
});
