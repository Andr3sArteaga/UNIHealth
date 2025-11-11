import { useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import * as Location from "expo-location";
import dayjs from "dayjs";
import { sendEmergency } from "@services/alerts";

export default function AlertsScreen() {
  const [type, setType] = useState("caída");
  const [desc, setDesc] = useState("");

  const onSend = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Activa permisos de ubicación.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    try {
      await sendEmergency({
        type,
        description: desc,
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
        occurred_at: dayjs().toISOString(),
      });
      Alert.alert("Enviado", "Alerta médica registrada.");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "No se pudo enviar la alerta.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Generar alerta médica</Text>
      <Text>Tipo</Text>
      <TextInput
        value={type}
        onChangeText={setType}
        placeholder="caída, desmayo, etc."
        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
      />
      <Text>Descripción</Text>
      <TextInput
        value={desc}
        onChangeText={setDesc}
        placeholder="¿Qué ocurrió?"
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, minHeight: 80 }}
        multiline
      />
      <Button title="Enviar alerta" onPress={onSend} />
      <Text style={{ opacity: 0.6 }}>
        Criterio: notificación instantánea al dashboard se resuelve en el backend.
      </Text>
    </View>
  );
}
