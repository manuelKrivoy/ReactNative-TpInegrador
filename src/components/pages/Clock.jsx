import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Importar íconos desde react-native-vector-icons

// Componentes propios
import LapseContainer from "../common/LapseContainer";
import ClockButton from "../common/ClockButton";

// Utilidades
import { guardarTiempo, eliminarTiempos } from "../utils/Storage";
import { Alert } from "react-native";

// Context Location
import { LocationContext } from "../context/LocationContext";

// Context User
import { useUser } from "../context/UserContext";

// DB
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Importa la instancia de Firestore

const Clock = ({ navigation }) => {
  const [reloj, setReloj] = useState(0.0); // Cronometra
  const [isPaused, setIsPaused] = useState(true); // Guarda estado botón pausa
  const [isStarted, setIsStarted] = useState(false); // Inicia o resetea cronómetro
  const [lapseList, setLapseList] = useState([]); // Guarda lapsos

  const { flagUrl, location } = useContext(LocationContext); // Obtener flagUrl del contexto

  const { userEmail, setUserEmail } = useUser(); // Traigo el mail del usuario registrado

  useEffect(() => {
    if (isStarted && !isPaused) {
      const intervalo = setInterval(() => {
        setReloj((reloj) => reloj + 0.01);
      }, 10);
      return () => clearInterval(intervalo);
    }
  }, [isStarted, isPaused]);

  const handleStartPause = () => {
    setIsPaused(!isPaused);
    setIsStarted(true);
  };

  const handleReset = () => {
    setIsPaused(true);
    setIsStarted(false);
    setReloj(0);
    setLapseList([]);
  };

  const handleLapse = () => {
    const newLapse = { time: formatTime(reloj), flagUrl, location };
    const newLapseList = [...lapseList, newLapse];
    setLapseList(newLapseList); // Para lapseList
    guardarTiempo(newLapseList); // Almacenamiento interno
  };

  const handleEliminarTiempos = async () => {
    await eliminarTiempos();
    setLapseList([]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((time % 1) * 100)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const guardarVueltaEnBD = async (newLapseList) => {
    try {
      // Usar el email del usuario como ID del documento para asegurar que sea único por usuario
      const userDocRef = doc(db, "vueltas", userEmail);

      // Usa setDoc para crear o actualizar el documento con el ID específico
      await setDoc(userDocRef, {
        userEmail, // Email del usuario autenticado
        lapses: newLapseList, // Lista de lapsos
        timestamp: new Date().toISOString(), // Fecha y hora en que se guarda el documento
      });
      Alert.alert("Tiempos guardados correctamente", " Puedes ir a la ventana lapses para verlos.", [{ text: "OK" }]);
    } catch (error) {
      console.error("Error al guardar el tiempo en la base de datos", error);
    }
  };

  const handleGuardarEnBD = async () => {
    await guardarVueltaEnBD(lapseList); // Llamar a la función para guardar en la base de datos
  };

  const handleLogout = () => {
    setUserEmail(null);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>
          Bienvenido, <Text style={{ fontWeight: "bold" }}>{userEmail}</Text>
        </Text>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>
            {" "}
            <Icon name="log-out" size={24} />
          </Text>
        </Pressable>
      </View>
      <Text style={styles.counter}>{formatTime(reloj)}</Text>

      <View style={styles.buttonList}>
        <ClockButton
          onPress={handleStartPause}
          text={isPaused ? <Icon name="play" size={24} /> : <Icon name="pause" size={24} />}
        />
        {isStarted && (
          <>
            <ClockButton onPress={handleReset} text={<Icon name="square" size={24} />} />
            {!isPaused && <ClockButton onPress={handleLapse} text={<Icon name="flag" size={24} />} />}
          </>
        )}
      </View>
      <View style={styles.buttonList}>
        <ClockButton onPress={handleGuardarEnBD} text="Guardar en DB" />
        <ClockButton onPress={handleEliminarTiempos} text={<Icon name="trash" size={24} />} />
      </View>
      <ScrollView>
        <LapseContainer lapseList={lapseList} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // Añadir padding horizontal para el contenido
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Espacio entre el texto y el botón
    width: "100%", // Asegurar que el contenedor ocupe todo el ancho
    marginBottom: 20, // Espacio debajo del header
  },
  welcome: {
    fontSize: 16,
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: "#BD2E2E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 5,
  },
  buttonList: {
    flexDirection: "row",
    marginVertical: 10,
  },
  counter: {
    fontSize: 80,
    marginBottom: 50,
    textAlign: "center",
  },
  flag: {
    width: 220,
    height: 140,
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#BD2E2E",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Clock;
