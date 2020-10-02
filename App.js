import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CameraPage } from "./src/CameraPage";
import { LoadingScreen } from "./src/LoadingScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CameraPage"
          component={CameraPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
