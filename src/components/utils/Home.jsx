import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importa Ionicons
import LocationComponent from "../pages/LocationComponent";
import LapsesComponent from "../pages/LapsesComponent";
import Clock from "../pages/Clock";
import Icon from "react-native-vector-icons/Ionicons"; // Importar íconos desde react-native-vector-icons

const Home = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Clock"
        component={Clock}
        options={{
          tabBarLabel: "Clock",
          tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Location"
        component={LocationComponent}
        options={{
          tabBarLabel: "Location",
          tabBarIcon: ({ color, size }) => <Ionicons name="location" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Lapses"
        component={LapsesComponent}
        options={{
          tabBarLabel: "Lapses",
          tabBarIcon: ({ color, size }) => <Ionicons name="timer" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
