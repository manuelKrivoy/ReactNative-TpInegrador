import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//React-Icons para iconos
import { IoPlay } from "react-icons/io5";
import { FaPause, FaFlag, FaSquare, FaAlignJustify, FaRegTrashAlt } from "react-icons/fa";

//Componentes propios
import LapseContainer from "../common/LapseContainer";
import ClockButton from "../common/ClockButton";

// Utilidades
import { guardarTiempo, obtenerTiempos, eliminarTiempos } from '../utils/Storage'; //


const Clock = () => {
  const [reloj, setReloj] = useState(0.0); //Cronometra
  const [isPaused, setIsPaused] = useState(true); //Guarda estado boton pausa
  const [isStarted, setIsStarted] = useState(false); //Inicia o resetea cronometro
  const [lapseList, setLapseList] = useState([]); // Guarda lapsos


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
    setLapseList([...lapseList, formatTime(reloj)]);
    guardarTiempo([...lapseList, formatTime(reloj)]);
  };

  const handleObtenerTiempos = async () => {
    const tiempos = await obtenerTiempos();
    if (tiempos.length != 0) {
      console.log('Tiempos obtenidos:', tiempos);
    }
  };

  const handleEliminarTiempos = async () => {
    await eliminarTiempos();
  };



  const formatTime = (time) => {
    //Formatea lo cronometrado para que salga en formato 00:00.00
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");

    const seconds = Math.floor(time % 60).toString().padStart(2, "0");

    const milliseconds = Math.floor((time % 1) * 100).toString().padStart(2, "0");
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
});

export default Clock;
