import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocationComponent from "../pages/LocationComponent";
import Clock from "../pages/Clock";

const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Clock" component={Clock} options={{ tabBarLabel: "Clock" }} />
      <Tab.Screen name="Location" component={LocationComponent} options={{ tabBarLabel: "Location" }} />
    </Tab.Navigator>
  );
};

export default Home;
