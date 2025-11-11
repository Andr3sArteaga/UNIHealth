import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@context/AuthContext";
import { setAuthToken } from "@services/api";
import { theme } from "../../styles/theme";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      // Auth context handles token setting and navigation
    } catch (error: any) {
      // Handle different types of authentication errors
      let errorMessage = "Error al iniciar sesión";
      
      if (error.response?.status === 401 || error.response?.status === 400) {
        errorMessage = "Correo o contraseña incorrectos. Verifica tus credenciales e intenta nuevamente.";
      } else if (error.response?.status >= 500) {
        errorMessage = "Error del servidor. Intenta nuevamente en unos momentos.";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Tiempo de espera agotado. Verifica tu conexión a internet.";
      } else if (error.message?.includes("Network Error")) {
        errorMessage = "Error de conexión. Verifica tu conexión a internet.";
      }
      
      Alert.alert(
        "Error de Acceso", 
        errorMessage,
        [{ text: "Entendido", style: "default" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToWelcome = () => {
    navigation.navigate("WelcomeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackToWelcome}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>
            Ingresa a tu cuenta de UNIHealth
          </Text>
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email universitario</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="estudiante@universidad.edu"
              keyboardType="email-address"
              autoCapitalize="none"
              testID="email-input"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Tu contraseña"
              secureTextEntry
              testID="password-input"
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            testID="login-button"
          >
            <Text style={styles.buttonText}>
              {loading ? "Cargando..." : "Entrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.registerLinkText}>
              ¿No tienes cuenta? 
            </Text>
            <Text style={styles.registerLinkTextBold}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.space6,
  },
  backButton: {
    paddingTop: theme.spacing.space4,
    paddingBottom: theme.spacing.space2,
  },
  backButtonText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
  },
  header: {
    alignItems: "center",
    marginTop: theme.spacing.space8,
    marginBottom: theme.spacing.space8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space2,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  form: {
    gap: theme.spacing.space5,
  },
  inputGroup: {
    gap: theme.spacing.space2,
  },
  label: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textPrimary,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.space4,
    paddingVertical: theme.spacing.space3,
    fontSize: theme.typography.fontSize.medium,
    backgroundColor: theme.colors.white,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginTop: -theme.spacing.space2,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.small,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: theme.spacing.space4,
    alignItems: "center",
    marginTop: theme.spacing.space2,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: "600",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: theme.spacing.space8,
  },
  registerLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerLinkText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
  },
  registerLinkTextBold: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
    fontWeight: "600",
    marginLeft: 4,
  },
});
