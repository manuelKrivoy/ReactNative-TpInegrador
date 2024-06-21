import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useUser } from "../context/UserContext";
import Icon from "react-native-vector-icons/Ionicons"; // Importar Ionicons para el icono

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUserEmail } = useUser();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUserEmail(email);
      navigation.replace("Home");
    } catch (error) {
      if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
        setError("Credenciales inválidas");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="time-outline" size={32} color="#007bff" style={styles.icon} />
        <Text style={styles.title}>ClockApp</Text>
      </View>
      <Text style={styles.subtitle}>Iniciar sesión</Text>
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

      <Pressable
        style={({ pressed }) => [styles.button, { backgroundColor: pressed ? "#0056b3" : "#007bff" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    marginTop: -50,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "#007bff",
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    width: "80%",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
