// npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';


// Guardar la lista de tiempos.
export const guardarTiempo = async (tiempos) => {
    try {
        await AsyncStorage.setItem('tiempos', JSON.stringify(tiempos));
        console.log('Lista de tiempos guardada correctamente');
    } catch (error) {
        console.error('Error al guardar la lista de tiempos:', error);
    }
};


// Obtener la lista de tiempos.
export const obtenerTiempos = async () => {
    try {
        const tiemposGuardados = await AsyncStorage.getItem('tiempos');
        if (tiemposGuardados !== null) {
            return JSON.parse(tiemposGuardados);
        } else {
            console.log('No hay tiempos almacenados');
            return [];
        }
    } catch (error) {
        console.error('Error al obtener la lista de tiempos:', error);
        return [];
    }
};


// Elimina la lista de tiempos guardada localmente.
export const eliminarTiempos = async () => {
    try {
        await AsyncStorage.removeItem('tiempos');
        console.log('Tiempos eliminados correctamente');
    } catch (error) {
        console.error('Error al eliminar los tiempos:', error);
    }
};