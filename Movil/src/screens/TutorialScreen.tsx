import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@context/AuthContext";
import { theme } from "../styles/theme";

const TUTORIAL_STEPS = [
  {
    icon: "📋",
    title: "Tu Historial Médico",
    description: "Accede a toda tu información de salud en un solo lugar, actualízala cuando quieras.",
  },
  {
    icon: "📅",
    title: "Agenda Citas",
    description: "Programa citas con médicos generales, psicólogos y nutricionistas fácilmente.",
  },
  {
    icon: "🚨",
    title: "Alertas de Emergencia",
    description: "En caso de emergencia, contacta rápidamente al personal médico más cercano.",
  },
];

export default function TutorialScreen() {
  const navigation = useNavigation();
  const { completeTutorial } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark tutorial as completed and navigate to Home
      completeTutorial();
      navigation.navigate("MainTabs" as never);
    }
  };

  const handleSkip = () => {
    // Mark tutorial as completed even when skipped
    completeTutorial();
    navigation.navigate("MainTabs" as never);
  };

  const currentTutorial = TUTORIAL_STEPS[currentStep];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>{currentTutorial.icon}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{currentTutorial.title}</Text>
          <Text style={styles.cardDescription}>{currentTutorial.description}</Text>
        </View>

        <View style={styles.progressDots} testID="progress-dots">
          {TUTORIAL_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === TUTORIAL_STEPS.length - 1 ? "Comenzar a Usar UNIHealth" : "Siguiente"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Saltar tutorial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.space6,
  },
  iconContainer: {
    marginBottom: theme.spacing.space8,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.success,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconText: {
    fontSize: 60,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius,
    padding: theme.spacing.space6,
    marginBottom: theme.spacing.space8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: theme.typography.fontSizeXl,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space2,
  },
  cardDescription: {
    fontSize: theme.typography.fontSizeBase,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  progressDots: {
    flexDirection: "row",
    gap: theme.spacing.space2,
    marginBottom: theme.spacing.space8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
  },
  dotActive: {
    backgroundColor: theme.colors.primary,
  },
  footer: {
    padding: theme.spacing.space6,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.space4,
    paddingHorizontal: theme.spacing.space8,
    borderRadius: theme.radius,
    width: "100%",
    alignItems: "center",
    marginBottom: theme.spacing.space3,
  },
  nextButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizeBase,
    fontWeight: "600",
  },
  skipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizeSm,
  },
});

