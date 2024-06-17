import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import LoginScreen from "./src/components/pages/Login";
import { LocationProvider } from "./src/components/context/LocationContext";
import { UserProvider } from "./src/components/context/UserContext";
import Home from "./src/components/utils/Home";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserProvider>
      <LocationProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </LocationProvider>
    </UserProvider>
  );
}
