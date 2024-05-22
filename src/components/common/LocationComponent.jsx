// npx expo install expo-location
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import * as Location from 'expo-location';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);

  useEffect(() => {
      (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              setErrorMsg('Permisos denegados.');
              return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);

          if (location) {
              const { latitude, longitude } = location.coords;
              fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`)
                  .then(response => response.json())
                  .then(data => {
                      if (data && data.country) {
                          const countryCode = data.prov;
                          setFlagUrl(`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`);
                      }
                  })
                  .catch(error => {
                      setErrorMsg('Error fetching country data');
                      console.error(error);
                  });
          }
      })();
  }, []);

  let text = 'Esperando permisos..';
  
  if (errorMsg) {
      text = errorMsg;
  } else if (location) {
      const { latitude, longitude, accuracy } = location.coords;
      text = `Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`;
  }

  return (
      <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
          {flagUrl && <Image source={{ uri: flagUrl }} style={styles.flag} />}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
  paragraph: {
      fontSize: 18,
      textAlign: 'center',
  },
  flag: {
      width: 220,
      height: 140,
      marginTop: 20,
  },
});

export default LocationComponent;