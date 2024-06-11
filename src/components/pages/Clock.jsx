import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

// React-Icons para iconos
import { IoPlay } from "react-icons/io5";
import { FaPause, FaFlag, FaSquare, FaAlignJustify, FaRegTrashAlt } from "react-icons/fa";

// Componentes propios
import LapseContainer from "../common/LapseContainer";
import ClockButton from "../common/ClockButton";

// Utilidades
import { guardarTiempo, obtenerTiempos, eliminarTiempos } from "../utils/Storage";

// Context Location
import { LocationContext } from "../context/LocationContext";
import LocationComponent from "../common/LocationComponent";
// Context User
import { useUser } from "../context/UserContext";

// DB
import { collection, addDoc, doc, getDocs, query, where, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Importa la instancia de Firestore

const Clock = () => {
  const [reloj, setReloj] = useState(0.0); // Cronometra
  const [isPaused, setIsPaused] = useState(true); // Guarda estado botón pausa
  const [isStarted, setIsStarted] = useState(false); // Inicia o resetea cronómetro
  const [lapseList, setLapseList] = useState([]); // Guarda lapsos

  const { flagUrl } = useContext(LocationContext); // Obtener flagUrl del contexto

  const { userEmail } = useUser(); // Traigo el mail del usuario registrado

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
    const newLapse = { time: formatTime(reloj), flagUrl };
    const newLapseList = [...lapseList, newLapse];
    setLapseList(newLapseList); // Para lapseList
    guardarTiempo(newLapseList); // Almacenamiento interno
  };

  const handleGuardarEnBD = async () => {
    await guardarVueltaEnBD(lapseList); // Llamar a la función para guardar en la base de datos
  };

  const handleObtenerTiempos = async () => {
    const { tiempos } = await obtenerTiempos();
    setLapseList(tiempos); // Establecer la lista de lapsos desde el almacenamiento
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
    } catch (error) {
      console.error("Error al guardar el tiempo en la base de datos", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenido, {userEmail}</Text>
      <Text style={styles.counter}>{formatTime(reloj)}</Text>
      <View style={styles.buttonList}>
        <ClockButton onPress={handleStartPause} text={isPaused ? <IoPlay /> : <FaPause />} />
        {isStarted && (
          <>
            <ClockButton onPress={handleReset} text={<FaSquare />} />
            {!isPaused && <ClockButton onPress={handleLapse} text={<FaFlag />} />}
          </>
        )}
      </View>
      <LapseContainer lapseList={lapseList} />
      <StatusBar style="auto" />
      <View style={styles.buttonList}>
        <ClockButton onPress={handleGuardarEnBD} text="Guardar en DB" />
        <ClockButton onPress={handleObtenerTiempos} text={<FaAlignJustify />} />
        <ClockButton onPress={handleEliminarTiempos} text={<FaRegTrashAlt />} />
      </View>
      <LocationComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9C7B74",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonList: {
    flexDirection: "row",
  },
  counter: {
    fontSize: 48,
    marginBottom: 50,
    textAlign: "center",
  },
  flag: {
    width: 220,
    height: 140,
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Clock;
