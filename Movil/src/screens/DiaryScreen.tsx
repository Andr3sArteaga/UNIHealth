import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { theme } from "@styles/them";

export default function DiaryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Diario Médico</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No hay entradas para este día</Text>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>+ Crear Entrada</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  title: {
    fontSize: theme.typography.fontSize2xl,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.space4,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.space12,
  },
  emptyText: {
    fontSize: theme.typography.fontSizeBase,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.space6,
  },
  createButton: {
    paddingHorizontal: theme.spacing.space6,
    paddingVertical: theme.spacing.space3,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  createButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizeBase,
    fontWeight: "600",
  },
});

