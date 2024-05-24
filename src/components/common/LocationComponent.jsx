import React, { useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { LocationContext } from "../context/LocationContext";
const LocationComponent = () => {
  const { location, errorMsg, flagUrl } = useContext(LocationContext);

  let text = "Esperando permisos..";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    const { latitude, longitude, accuracy } = location.coords;
    text = `Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubicación actual:</Text>
      <Text style={styles.paragraph}>{text}</Text>
      {flagUrl ? (
        <Image source={{ uri: flagUrl }} style={styles.flag} />
      ) : (
        <>
          <Text style={styles.noFlagMessage}>Obteniendo ubicación del país...</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  flag: {
    width: 220,
    height: 140,
    marginTop: 20,
  },
  noFlagMessage: {
    fontSize: 18,
    marginTop: 20,
    fontStyle: "italic",
  },
});

export default LocationComponent;
