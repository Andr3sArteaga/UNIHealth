import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";
import { useAuth } from "@context/AuthContext";

type MedicalFormData = {
  // Phase 1: Basic Info & Account
  email: string;
  password: string;
  confirmPassword: string;
  nombre: string;
  cedula: string;
  
  // Phase 2: Personal Data
  fecha_nacimiento: string;
  telefono: string;
  direccion: string;
  contacto_emergencia_nombre: string;
  contacto_emergencia_telefono: string;
  
  // Phase 3: Medical History
  alergias: string;
  medicamentos_actuales: string;
  condiciones_medicas: string;
  tipo_sangre: string;
  
  // Phase 4: Insurance & Lifestyle
  numero_seguro_social: string;
  numero_poliza: string;
  compania_seguro: string;
  fuma: boolean;
  consume_alcohol: boolean;
  actividad_fisica: string;
  horas_sueno: string;
};

const PHASES = [
  { id: 1, title: "Información Básica", icon: "👤" },
  { id: 2, title: "Datos Personales", icon: "📋" },
  { id: 3, title: "Historial Médico", icon: "⚕️" },
  { id: 4, title: "Seguro y Estilo de Vida", icon: "🏥" },
];

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const { register } = useAuth();
  const [currentPhase, setCurrentPhase] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<MedicalFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    cedula: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
    contacto_emergencia_nombre: "",
    contacto_emergencia_telefono: "",
    alergias: "",
    medicamentos_actuales: "",
    condiciones_medicas: "",
    tipo_sangre: "",
    numero_seguro_social: "",
    numero_poliza: "",
    compania_seguro: "",
    fuma: false,
    consume_alcohol: false,
    actividad_fisica: "",
    horas_sueno: "",
  });

  // Function removed - using setFormData directly for better state management

  const validatePhase = () => {
    switch (currentPhase) {
      case 1:
        if (!formData.email || !formData.password || !formData.nombre || !formData.cedula) {
          Alert.alert("Error", "Por favor completa todos los campos obligatorios");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          Alert.alert("Error", "Las contraseñas no coinciden");
          return false;
        }
        break;
      case 2:
        if (!formData.fecha_nacimiento || !formData.telefono) {
          Alert.alert("Error", "Por favor completa los campos obligatorios");
          return false;
        }
        break;
      case 3:
        if (!formData.tipo_sangre) {
          Alert.alert("Error", "Por favor indica tu tipo de sangre");
          return false;
        }
        break;
      case 4:
        break;
    }
    return true;
  };

  const nextPhase = () => {
    if (validatePhase()) {
      setCurrentPhase(prev => Math.min(prev + 1, 4));
    }
  };

  const prevPhase = () => {
    setCurrentPhase(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validatePhase()) return;
    
    setLoading(true);
    try {
      const registrationData = {
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        cedula: formData.cedula,
        fecha_nacimiento: formData.fecha_nacimiento,
        telefono: formData.telefono,
        direccion: formData.direccion,
        contacto_emergencia_nombre: formData.contacto_emergencia_nombre,
        contacto_emergencia_telefono: formData.contacto_emergencia_telefono,
        alergias: formData.alergias,
        medicamentos_actuales: formData.medicamentos_actuales,
        condiciones_medicas: formData.condiciones_medicas,
        tipo_sangre: formData.tipo_sangre,
        numero_seguro_social: formData.numero_seguro_social,
        numero_poliza: formData.numero_poliza,
        compania_seguro: formData.compania_seguro,
      };
      
      await register(registrationData);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case 1:
        return (
          <View style={styles.phaseContent}>
            <Text style={styles.phaseTitle}>Información de Cuenta</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => setFormData(prev => ({ ...prev, email: value }))}
                placeholder="correo@universidad.edu"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                testID="email-input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contraseña *</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => {
                  console.log("Password changed:", value);
                  setFormData(prev => ({ ...prev, password: value }));
                }}
                placeholder="Mínimo 8 caracteres"
                secureTextEntry
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                testID="password-input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar Contraseña *</Text>
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
                placeholder="Repite tu contraseña"
                secureTextEntry
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                testID="confirm-password-input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre Completo *</Text>
              <TextInput
                style={styles.input}
                value={formData.nombre}
                onChangeText={(value) => setFormData(prev => ({ ...prev, nombre: value }))}
                placeholder="Tu nombre completo"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                testID="name-input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cédula de Identidad *</Text>
              <TextInput
                style={styles.input}
                value={formData.cedula}
                onChangeText={(value) => setFormData(prev => ({ ...prev, cedula: value }))}
                placeholder="12345678"
                keyboardType="numeric"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                testID="cedula-input"
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.phaseContent}>
            <Text style={styles.phaseTitle}>Datos Personales</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha de Nacimiento *</Text>
              <TextInput
                style={styles.input}
                value={formData.fecha_nacimiento}
                onChangeText={(value) => setFormData(prev => ({ ...prev, fecha_nacimiento: value }))}
                placeholder="1990-01-15"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                testID="birth-date-input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Teléfono *</Text>
              <TextInput
                style={styles.input}
                value={formData.telefono}
                onChangeText={(value) => {
                  console.log("Phone input changed:", value);
                  setFormData(prev => ({ ...prev, telefono: value }));
                }}
                placeholder="412 123 4567"
                keyboardType="phone-pad"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                maxLength={15}
                returnKeyType="next"
                testID="phone-input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dirección</Text>
              <TextInput
                style={styles.input}
                value={formData.direccion}
                onChangeText={(value) => setFormData(prev => ({ ...prev, direccion: value }))}
                placeholder="Tu dirección de residencia"
                multiline
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contacto de Emergencia</Text>
              <TextInput
                style={styles.input}
                value={formData.contacto_emergencia_nombre}
                onChangeText={(value) => setFormData(prev => ({ ...prev, contacto_emergencia_nombre: value }))}
                placeholder="Nombre del contacto"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Teléfono de Emergencia</Text>
              <TextInput
                style={styles.input}
                value={formData.contacto_emergencia_telefono}
                onChangeText={(value) => setFormData(prev => ({ ...prev, contacto_emergencia_telefono: value }))}
                placeholder="412 123 4567"
                keyboardType="phone-pad"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.phaseContent}>
            <Text style={styles.phaseTitle}>Historial Médico</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo de Sangre *</Text>
              <TextInput
                style={styles.input}
                value={formData.tipo_sangre}
                onChangeText={(value) => setFormData(prev => ({ ...prev, tipo_sangre: value }))}
                placeholder="A+, O-, B+, etc."
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                testID="blood-type-input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Alergias</Text>
              <TextInput
                style={styles.input}
                value={formData.alergias}
                onChangeText={(value) => setFormData(prev => ({ ...prev, alergias: value }))}
                placeholder="Describe tus alergias (medicamentos, alimentos, etc.)"
                multiline
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Medicamentos Actuales</Text>
              <TextInput
                style={styles.input}
                value={formData.medicamentos_actuales}
                onChangeText={(value) => setFormData(prev => ({ ...prev, medicamentos_actuales: value }))}
                placeholder="Lista los medicamentos que tomas regularmente"
                multiline
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Condiciones Médicas</Text>
              <TextInput
                style={styles.input}
                value={formData.condiciones_medicas}
                onChangeText={(value) => setFormData(prev => ({ ...prev, condiciones_medicas: value }))}
                placeholder="Describe condiciones médicas relevantes"
                multiline
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.phaseContent}>
            <Text style={styles.phaseTitle}>Seguro y Estilo de Vida</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número de Seguro Social</Text>
              <TextInput
                style={styles.input}
                value={formData.numero_seguro_social}
                onChangeText={(value) => setFormData(prev => ({ ...prev, numero_seguro_social: value }))}
                placeholder="Número de seguro social"
                keyboardType="numeric"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Póliza de Seguro</Text>
              <TextInput
                style={styles.input}
                value={formData.numero_poliza}
                onChangeText={(value) => setFormData(prev => ({ ...prev, numero_poliza: value }))}
                placeholder="Número de póliza"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Compañía de Seguro</Text>
              <TextInput
                style={styles.input}
                value={formData.compania_seguro}
                onChangeText={(value) => setFormData(prev => ({ ...prev, compania_seguro: value }))}
                placeholder="Nombre de la compañía de seguros"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Actividad Física</Text>
              <TextInput
                style={styles.input}
                value={formData.actividad_fisica}
                onChangeText={(value) => setFormData(prev => ({ ...prev, actividad_fisica: value }))}
                placeholder="Describe tu nivel de actividad física"
                multiline
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Horas de Sueño</Text>
              <TextInput
                style={styles.input}
                value={formData.horas_sueno}
                onChangeText={(value) => setFormData(prev => ({ ...prev, horas_sueno: value }))}
                placeholder="Promedio de horas de sueño por noche"
                keyboardType="numeric"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Registro Médico</Text>
        <Text style={styles.headerSubtitle}>
          Fase {currentPhase} de {PHASES.length}: {PHASES[currentPhase - 1].title}
        </Text>
        
        <View style={styles.progressBar}>
          {PHASES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index < currentPhase ? styles.progressDotActive : styles.progressDotInactive
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {renderPhaseContent()}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          {currentPhase > 1 && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={prevPhase}
            >
              <Text style={styles.secondaryButtonText}>Anterior</Text>
            </TouchableOpacity>
          )}

          {currentPhase < PHASES.length ? (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={nextPhase}
            >
              <Text style={styles.primaryButtonText}>Siguiente</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? "Registrando..." : "Completar Registro"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.backToLogin}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.backToLoginText}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.space6,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.space2,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.space4,
    gap: theme.spacing.space2,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressDotActive: {
    backgroundColor: theme.colors.primary,
  },
  progressDotInactive: {
    backgroundColor: theme.colors.border,
  },
  scrollView: {
    flex: 1,
  },
  phaseContent: {
    padding: theme.spacing.space6,
  },
  phaseTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space6,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: theme.spacing.space4,
  },
  label: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space2,
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
  footer: {
    padding: theme.spacing.space6,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: theme.spacing.space4,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.space4,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: "600",
  },
  backToLogin: {
    alignItems: "center",
    marginTop: theme.spacing.space4,
  },
  backToLoginText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
  },
});