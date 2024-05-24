import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

//React-Icons para iconos
import { IoPlay } from "react-icons/io5";
import { FaPause, FaFlag, FaSquare, FaAlignJustify, FaRegTrashAlt } from "react-icons/fa";

//Componentes propios
import LapseContainer from "../common/LapseContainer";
import ClockButton from "../common/ClockButton";

// Utilidades
import { guardarTiempo, obtenerTiempos, eliminarTiempos } from "../utils/Storage";

//Context
import { LocationContext } from "../context/LocationContext"; // Importar LocationContext
import LocationComponent from "../common/LocationComponent";

const Clock = () => {
  const [reloj, setReloj] = useState(0.0); // Cronometra
  const [isPaused, setIsPaused] = useState(true); // Guarda estado botón pausa
  const [isStarted, setIsStarted] = useState(false); // Inicia o resetea cronómetro
  const [lapseList, setLapseList] = useState([]); // Guarda lapsos

  const { flagUrl } = useContext(LocationContext); // Obtener flagUrl del contexto

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
    setLapseList(newLapseList); //Para lapseList
    guardarTiempo(newLapseList); // Almacenamiento interno
  };

  const handleObtenerTiempos = async () => {
    const { tiempos } = await obtenerTiempos();
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

  return (
    <View style={styles.container}>
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
});

export default Clock;
