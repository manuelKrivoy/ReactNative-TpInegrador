import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Clock from "./src/components/pages/Clock";
import LoginScreen from './src/components/pages/Login';

import { LocationProvider } from "./src/components/context/LocationContext";

//mport HomeScreen from './src/components/pages/HomeScreen';


const Stack = createStackNavigator();


export default function App() {
  return (
    
      <LocationProvider>
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={Clock} />
            </Stack.Navigator>
          </NavigationContainer>
      </LocationProvider>
    
  );
}
