// src/components/pages/Login.js
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useUser } from "../context/UserContext"; // Importa el hook de contexto

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUserEmail } = useUser(); // Extrae la función para setear el email

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUserEmail(email); // Guarda el email del usuario en el contexto
      navigation.replace("Home");
    } catch (error) {
      if ((error.statusCode = 400)) {
        setError("Credenciales inválidas");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
