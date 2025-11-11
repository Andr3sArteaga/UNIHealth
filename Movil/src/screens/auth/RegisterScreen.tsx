import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@styles/them";

type FormData = {
  // Section 1: Personal Data
  fullName: string;
  idNumber: string;
  birthDate: string;
  age: string;
  biologicalSex: string;
  genderIdentity: string;
  maritalStatus: string;
  address: string;
  emergencyContact: string;
  hasInsurance: string;
  insuranceName: string;

  // Section 2: Personal Medical History
  chronicDiseases: string;
  regularMedications: string;
  surgeries: string;
  allergies: string;
  hospitalizations: string;
  disabilities: string;

  // Section 3: Family History
  familyDiseases: string;
  familyRelationship: string;
  parentsAlive: string;
  siblingsDiseases: string;

  // Section 4: Lifestyle
  smoking: string;
  alcohol: string;
  physicalActivity: string;
  diet: string;
  sleepHours: string;
  stressLevel: string;
};

const SECTIONS = [
  { id: 1, title: "Datos Personales", icon: "🧍‍♂️", required: true },
  { id: 2, title: "Antecedentes Médicos", icon: "❤️", required: true },
  { id: 3, title: "Antecedentes Familiares", icon: "🧬", required: false },
  { id: 4, title: "Hábitos y Estilo de Vida", icon: "🍎", required: false },
];

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    idNumber: "",
    birthDate: "",
    age: "",
    biologicalSex: "",
    genderIdentity: "",
    maritalStatus: "",
    address: "",
    emergencyContact: "",
    hasInsurance: "",
    insuranceName: "",
    chronicDiseases: "",
    regularMedications: "",
    surgeries: "",
    allergies: "",
    hospitalizations: "",
    disabilities: "",
    familyDiseases: "",
    familyRelationship: "",
    parentsAlive: "",
    siblingsDiseases: "",
    smoking: "",
    alcohol: "",
    physicalActivity: "",
    diet: "",
    sleepHours: "",
    stressLevel: "",
  });

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age.toString();
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "birthDate") {
        updated.age = calculateAge(value);
      }
      return updated;
    });
  };

  const validateSection = (sectionIndex: number): boolean => {
    const section = SECTIONS[sectionIndex];
    if (!section.required) return true;

    if (sectionIndex === 0) {
      // Section 1 validation
      if (
        !formData.fullName ||
        !formData.idNumber ||
        !formData.birthDate ||
        !formData.biologicalSex ||
        !formData.maritalStatus ||
        !formData.address ||
        !formData.emergencyContact ||
        !formData.hasInsurance
      ) {
        Alert.alert("Campos requeridos", "Por favor complete todos los campos obligatorios de esta sección.");
        return false;
      }
    } else if (sectionIndex === 1) {
      // Section 2 validation
      if (
        !formData.chronicDiseases ||
        !formData.regularMedications ||
        !formData.surgeries ||
        !formData.allergies ||
        !formData.hospitalizations ||
        !formData.disabilities
      ) {
        Alert.alert("Campos requeridos", "Por favor complete todos los campos obligatorios de esta sección.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateSection(currentSection)) return;

    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Submit to API via auth context
    console.log("Form Data:", formData);
    // Navigate to Tutorial screen after successful registration
    navigation.navigate("Tutorial" as never);
  };

  const renderSection1 = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>🧍‍♂️ SECCIÓN 1: DATOS PERSONALES</Text>
      <Text style={styles.sectionSubtitle}>(Obligatorios)</Text>

      <FormField
        label="Nombre completo *"
        value={formData.fullName}
        onChangeText={(text) => updateField("fullName", text)}
        placeholder="Ingrese su nombre completo"
      />

      <FormField
        label="Cédula / DNI *"
        value={formData.idNumber}
        onChangeText={(text) => updateField("idNumber", text)}
        placeholder="Ingrese su número de identificación"
        keyboardType="numeric"
      />

      <FormField
        label="Fecha de nacimiento *"
        value={formData.birthDate}
        onChangeText={(text) => updateField("birthDate", text)}
        placeholder="YYYY-MM-DD"
      />

      <FormField
        label="Edad"
        value={formData.age}
        onChangeText={() => {}}
        editable={false}
        placeholder="Se calcula automáticamente"
      />

      <SelectField
        label="Sexo biológico *"
        value={formData.biologicalSex}
        onValueChange={(value) => updateField("biologicalSex", value)}
        options={["Masculino", "Femenino", "Intersexual"]}
      />

      <SelectField
        label="Identidad de género (Opcional)"
        value={formData.genderIdentity}
        onValueChange={(value) => updateField("genderIdentity", value)}
        options={["Masculino", "Femenino", "Otro"]}
      />

      <SelectField
        label="Estado civil *"
        value={formData.maritalStatus}
        onValueChange={(value) => updateField("maritalStatus", value)}
        options={["Soltero", "Casado", "Divorciado", "Viudo", "Unión libre"]}
      />

      <FormField
        label="Dirección *"
        value={formData.address}
        onChangeText={(text) => updateField("address", text)}
        placeholder="Ingrese su dirección completa"
        multiline
      />

      <FormField
        label="Teléfono / Contacto de emergencia *"
        value={formData.emergencyContact}
        onChangeText={(text) => updateField("emergencyContact", text)}
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
        isCritical
      />

      <SelectField
        label="Seguro médico *"
        value={formData.hasInsurance}
        onValueChange={(value) => updateField("hasInsurance", value)}
        options={["Sí", "No"]}
      />

      {formData.hasInsurance === "Sí" && (
        <FormField
          label="Nombre de aseguradora"
          value={formData.insuranceName}
          onChangeText={(text) => updateField("insuranceName", text)}
          placeholder="Nombre de su aseguradora"
        />
      )}
    </View>
  );

  const renderSection2 = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>❤️ SECCIÓN 2: ANTECEDENTES MÉDICOS PERSONALES</Text>
      <Text style={styles.sectionSubtitle}>(Obligatorios)</Text>

      <FormField
        label="¿Padece actualmente alguna enfermedad crónica? *"
        value={formData.chronicDiseases}
        onChangeText={(text) => updateField("chronicDiseases", text)}
        placeholder="Ej: diabetes, hipertensión, asma, etc."
        multiline
        isCritical
      />

      <FormField
        label="¿Toma algún medicamento de forma regular? *"
        value={formData.regularMedications}
        onChangeText={(text) => updateField("regularMedications", text)}
        placeholder="Nombre y dosis del medicamento"
        multiline
        isCritical
      />

      <FormField
        label="¿Ha tenido alguna cirugía o procedimiento importante? *"
        value={formData.surgeries}
        onChangeText={(text) => updateField("surgeries", text)}
        placeholder="Describa las cirugías o procedimientos"
        multiline
      />

      <FormField
        label="¿Es alérgico a algún medicamento, alimento o sustancia? * ⚠️ CRÍTICO"
        value={formData.allergies}
        onChangeText={(text) => updateField("allergies", text)}
        placeholder="Especifique todas las alergias conocidas"
        multiline
        isCritical
      />

      <FormField
        label="¿Ha sido hospitalizado anteriormente? *"
        value={formData.hospitalizations}
        onChangeText={(text) => updateField("hospitalizations", text)}
        placeholder="Motivo y año de hospitalización"
        multiline
      />

      <FormField
        label="¿Padece alguna discapacidad física o mental? *"
        value={formData.disabilities}
        onChangeText={(text) => updateField("disabilities", text)}
        placeholder="Describa si aplica"
        multiline
      />
    </View>
  );

  const renderSection3 = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>🧬 SECCIÓN 3: ANTECEDENTES FAMILIARES</Text>
      <Text style={styles.sectionSubtitle}>(Recomendados)</Text>

      <FormField
        label="¿Hay antecedentes familiares de enfermedades hereditarias?"
        value={formData.familyDiseases}
        onChangeText={(text) => updateField("familyDiseases", text)}
        placeholder="Ej: diabetes, cáncer, hipertensión"
        multiline
      />

      <FormField
        label="Parentesco con el familiar afectado"
        value={formData.familyRelationship}
        onChangeText={(text) => updateField("familyRelationship", text)}
        placeholder="Ej: Padre, Madre, Abuelo, etc."
      />

      <SelectField
        label="¿Padres vivos?"
        value={formData.parentsAlive}
        onValueChange={(value) => updateField("parentsAlive", value)}
        options={["Ambos", "Solo padre", "Solo madre", "Ninguno"]}
      />

      <FormField
        label="¿Hermanos con enfermedades graves?"
        value={formData.siblingsDiseases}
        onChangeText={(text) => updateField("siblingsDiseases", text)}
        placeholder="Especifique si aplica"
        multiline
      />
    </View>
  );

  const renderSection4 = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>🍎 SECCIÓN 4: HÁBITOS Y ESTILO DE VIDA</Text>
      <Text style={styles.sectionSubtitle}>(Recomendados para evaluación general)</Text>

      <SelectField
        label="¿Fuma o ha fumado alguna vez?"
        value={formData.smoking}
        onValueChange={(value) => updateField("smoking", value)}
        options={["Sí", "No", "Ocasional"]}
      />

      <SelectField
        label="¿Consume alcohol?"
        value={formData.alcohol}
        onValueChange={(value) => updateField("alcohol", value)}
        options={["Nunca", "Ocasional", "Frecuente"]}
      />

      <FormField
        label="¿Realiza actividad física regularmente?"
        value={formData.physicalActivity}
        onChangeText={(text) => updateField("physicalActivity", text)}
        placeholder="Incluir frecuencia (ej: 3 veces por semana)"
      />

      <SelectField
        label="¿Cómo describiría su alimentación diaria?"
        value={formData.diet}
        onValueChange={(value) => updateField("diet", value)}
        options={["Saludable", "Regular", "Poco balanceada"]}
      />

      <FormField
        label="Horas de sueño promedio"
        value={formData.sleepHours}
        onChangeText={(text) => updateField("sleepHours", text)}
        placeholder="Ej: 7-8 horas"
        keyboardType="numeric"
      />

      <SelectField
        label="Nivel de estrés (Escala del 1 al 5)"
        value={formData.stressLevel}
        onValueChange={(value) => updateField("stressLevel", value)}
        options={["1", "2", "3", "4", "5"]}
      />
    </View>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return renderSection1();
      case 1:
        return renderSection2();
      case 2:
        return renderSection3();
      case 3:
        return renderSection4();
      default:
        return null;
    }
  };

  const progress = ((currentSection + 1) / SECTIONS.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Registro de Usuario</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Sección {currentSection + 1} de {SECTIONS.length}: {SECTIONS[currentSection].title}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderCurrentSection()}
      </ScrollView>

      <View style={styles.footer}>
        {currentSection > 0 && (
          <TouchableOpacity style={styles.buttonSecondary} onPress={handlePrevious}>
            <Text style={styles.buttonSecondaryText}>Anterior</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.buttonPrimary, currentSection === 0 && styles.buttonPrimaryFull]}
          onPress={handleNext}
        >
          <Text style={styles.buttonPrimaryText}>
            {currentSection === SECTIONS.length - 1 ? "Finalizar" : "Siguiente"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Form Field Component
type FormFieldProps = {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
  editable?: boolean;
  isCritical?: boolean;
};

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = "default",
  editable = true,
  isCritical = false,
}: FormFieldProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={[styles.fieldLabel, isCritical && styles.criticalLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          isCritical && styles.criticalInput,
          multiline && styles.inputMultiline,
          !editable && styles.inputDisabled,
        ]}
        value={value}
        onChangeText={onChangeText || (() => {})}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textTertiary}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType}
        editable={editable}
      />
    </View>
  );
}

// Select Field Component
type SelectFieldProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
};

function SelectField({ label, value, onValueChange, options }: SelectFieldProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.selectContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.selectOption,
              value === option && styles.selectOptionActive,
            ]}
            onPress={() => onValueChange(option)}
          >
            <Text
              style={[
                styles.selectOptionText,
                value === option && styles.selectOptionTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.space4,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    shadowColor: "#92143A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize2xl,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space3,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: theme.spacing.space2,
  },
  progressBar: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: theme.typography.fontSizeSm,
    color: theme.colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.space4,
  },
  sectionContainer: {
    marginBottom: theme.spacing.space6,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeXl,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space1,
  },
  sectionSubtitle: {
    fontSize: theme.typography.fontSizeSm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.space6,
  },
  fieldContainer: {
    marginBottom: theme.spacing.space5,
  },
  fieldLabel: {
    fontSize: theme.typography.fontSizeBase,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space2,
  },
  criticalLabel: {
    color: theme.colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    padding: theme.spacing.space3,
    fontSize: theme.typography.fontSizeBase,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  criticalInput: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputDisabled: {
    backgroundColor: theme.colors.backgroundAlt,
    color: theme.colors.textSecondary,
  },
  selectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.space2,
  },
  selectOption: {
    paddingHorizontal: theme.spacing.space4,
    paddingVertical: theme.spacing.space2,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  selectOptionActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  selectOptionText: {
    fontSize: theme.typography.fontSizeBase,
    color: theme.colors.textPrimary,
  },
  selectOptionTextActive: {
    color: theme.colors.white,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    padding: theme.spacing.space4,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.space3,
    shadowColor: "#92143A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.space3,
    paddingHorizontal: theme.spacing.space4,
    borderRadius: theme.radius,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryFull: {
    flex: 1,
  },
  buttonPrimaryText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizeBase,
    fontWeight: "600",
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: theme.colors.backgroundAlt,
    paddingVertical: theme.spacing.space3,
    paddingHorizontal: theme.spacing.space4,
    borderRadius: theme.radius,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonSecondaryText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizeBase,
    fontWeight: "600",
  },
});

