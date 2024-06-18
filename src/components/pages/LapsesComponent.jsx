import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { db, doc, getDoc } from "../../../firebase"; // Importa la instancia de Firestore

// Context User
import { useUser } from "../context/UserContext";


const LapsesComponent = () => {
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userEmail, setUserEmail } = useUser(); // Traigo el mail del usuario registrado


  useEffect(() => {
    const obtenerDocumento = async () => {
        try {
            const docRef = doc(db, "vueltas", userEmail);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDocumento(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error al obtener documento:", error);
        } finally {
            setLoading(false);
        }
    };

    obtenerDocumento();
}, [userEmail]);

if (loading) {
    return (
        <View style={[styles.container, styles.loadingContainer]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

return (
    <View style={styles.container}>
        {documento ? (
            <View>
                <Text>Email: {documento.userEmail}</Text>
                <Text>Fecha de guardado: {documento.timestamp}</Text>
                <Text>Lapses:</Text>
                {documento.lapses.map((lapse, index) => (
                    <Text key={index}>{`${index + 1}: ${lapse.time}`}</Text>
                ))}
            </View>
        ) : (
            <Text>No hay documento encontrado para {userEmail}</Text>
        )}
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
},
loadingContainer: {
    justifyContent: "center",
},
});

export default LapsesComponent;