// src/components/context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserEmail(currentUser.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ userEmail, setUserEmail }}>{children}</UserContext.Provider>;
};

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);
