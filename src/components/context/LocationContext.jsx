// LocationContext.js
import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

// Crear el contexto
export const LocationContext = createContext();

// Crear el proveedor del contexto
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permisos denegados.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location) {
        const { latitude, longitude } = location.coords;
        getFlagUrl(latitude, longitude);
      }
    })();
  }, []);

  const getFlagUrl = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`);
      const data = await response.json();
      if (data && data.country) {
        console.log("Attempting to fetch country data");
        const countryCode = data.prov;
        setFlagUrl(`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`);
      }
    } catch (error) {
      setErrorMsg("Error fetching country data");
      console.error(error);
    }
  };

  return <LocationContext.Provider value={{ location, errorMsg, flagUrl }}>{children}</LocationContext.Provider>;
};
