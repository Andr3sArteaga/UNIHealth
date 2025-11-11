import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles/theme";

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido a</Text>
          <Text style={styles.appName}>UNIHealth</Text>
          <Text style={styles.subtitle}>
            Tu aplicación de salud universitaria
          </Text>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Gestiona tu historial médico, agenda citas con profesionales de la salud,
            y mantén un registro de tu bienestar durante tu vida universitaria.
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Comenzar Registro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Al continuar, aceptas nuestros términos y condiciones
          </Text>
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
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.space6,
    paddingVertical: theme.spacing.space8,
  },
  header: {
    alignItems: "center",
    marginTop: theme.spacing.space8,
  },
  title: {
    fontSize: theme.typography.fontSize.large,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.space2,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: theme.spacing.space4,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textTertiary,
    textAlign: "center",
  },
  description: {
    paddingHorizontal: theme.spacing.space4,
  },
  descriptionText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  buttons: {
    gap: theme.spacing.space4,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.space4,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "transparent",
    paddingVertical: theme.spacing.space4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
  },
  registerButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textTertiary,
    textAlign: "center",
  },
});