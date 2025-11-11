import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "@context/AuthContext";
import { setAuthToken } from "@services/api";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      const res = await login(email, password);
      // el contexto ya setea user; aún así fija token global si tu login lo retorna aquí
      // setAuthToken(res?.token);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "No se pudo iniciar sesión");
    }
  };

  return (
    <View style={{ flex:1, padding:16, gap:12 }}>
      <Text style={{ fontSize:20, fontWeight:"600" }}>Ingresar</Text>
      <TextInput placeholder="email" autoCapitalize="none" value={email} onChangeText={setEmail}
        style={{ borderWidth:1, borderRadius:8, padding:10 }} />
      <TextInput placeholder="password" secureTextEntry value={password} onChangeText={setPassword}
        style={{ borderWidth:1, borderRadius:8, padding:10 }}/>
      <Button title="Entrar" onPress={onLogin}/>
    </View>
  );
}
