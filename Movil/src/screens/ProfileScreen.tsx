import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "@context/AuthContext";
import { theme } from "@styles/them";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || "Usuario"}</Text>
          <Text style={styles.email}>{user?.id || ""}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CUENTA</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Información Personal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Historial Médico</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICACIONES</Text>
          <View style={styles.card}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Recordatorios de citas</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Notificaciones push</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Alertas de emergencia</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIVACIDAD Y SOPORTE</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Privacidad y Seguridad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Ayuda y Soporte</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.version}>UNIHealth v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.space6,
    alignItems: "center",
    paddingTop: theme.spacing.space10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.space3,
  },
  avatarText: {
    fontSize: theme.typography.fontSize2xl,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  name: {
    fontSize: theme.typography.fontSizeXl,
    fontWeight: "600",
    color: theme.colors.white,
    marginBottom: theme.spacing.space1,
  },
  email: {
    fontSize: theme.typography.fontSizeSm,
    color: theme.colors.white,
    opacity: 0.9,
  },
  section: {
    marginTop: theme.spacing.space6,
    paddingHorizontal: theme.spacing.space4,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeXs,
    fontWeight: "600",
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.space2,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius,
    overflow: "hidden",
  },
  menuItem: {
    padding: theme.spacing.space4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemText: {
    fontSize: theme.typography.fontSizeBase,
    color: theme.colors.textPrimary,
  },
  logoutButton: {
    margin: theme.spacing.space4,
    padding: theme.spacing.space4,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: theme.typography.fontSizeBase,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  version: {
    textAlign: "center",
    fontSize: theme.typography.fontSizeSm,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.space4,
  },
});

