import React, { useEffect, useState } from "react";
import Clock from "./src/components/pages/Clock";
import { LocationProvider } from "./src/components/context/LocationContext";
export default function App() {
  return (
    <>
      <LocationProvider>
        <Clock></Clock>
      </LocationProvider>
    </>
  );
}
