// npm install @react-native-async-storage/async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Guardar la lista de tiempos y la URL de la bandera.
export const guardarTiempo = async (tiempos, flagUrl) => {
  try {
    const dataToStore = {
      tiempos,
      flagUrl,
    };
    await AsyncStorage.setItem("tiemposFlagData", JSON.stringify(dataToStore));
    console.log("Lista de tiempos y flag URL guardadas correctamente");
  } catch (error) {
    console.error("Error al guardar la lista de tiempos y flag URL:", error);
  }
};

// Obtener la lista de tiempos y la URL de la bandera.
export const obtenerTiempos = async () => {
  try {
    const tiemposFlagData = await AsyncStorage.getItem("tiemposFlagData");
    if (tiemposFlagData !== null) {
      console.log(tiemposFlagData);
      return JSON.parse(tiemposFlagData);
    } else {
      console.log("No hay tiempos y flag URL almacenados");
      return { tiempos: [], flagUrl: null };
    }
  } catch (error) {
    console.error("Error al obtener la lista de tiempos y flag URL:", error);
    return { tiempos: [], flagUrl: null };
  }
};

// Elimina la lista de tiempos y la URL de la bandera guardada localmente.
export const eliminarTiempos = async () => {
  try {
    await AsyncStorage.removeItem("tiemposFlagData");
    console.log("Tiempos y flag URL eliminados correctamente");
  } catch (error) {
    console.error("Error al eliminar los tiempos y flag URL:", error);
  }
};
