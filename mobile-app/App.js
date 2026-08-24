import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";

import { AuthProvider, useAuth } from "./backend/auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import BottomTabs from "./src/navigation/BottomTabs";
import WebViewScreen from "./src/screens/WebViewScreen";
import TemplatesScreen from "./src/screens/TemplatesScreen";

import WelcomeScreen from "./src/screens/onboarding/WelcomeScreen";
import NameScreen from "./src/screens/onboarding/NameScreen";
import HobbiesScreen from "./src/screens/onboarding/HobbiesScreen";
import ProvinceScreen from "./src/screens/onboarding/ProvinceScreen";
import DoneScreen from "./src/screens/onboarding/DoneScreen";
import {registerForPushNotifications} from "./src/services/notificationService";
//import "./src/data/uploadUniversities";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const {
      onboardingComplete,
      loading,
    } = useAuth();

  if (loading) return null;
  
  console.log(
    "onboardingComplete:",
    onboardingComplete
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!onboardingComplete ? (
        <>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Name"
            component={NameScreen}
          />
          <Stack.Screen
            name="Hobbies"
            component={HobbiesScreen}
          />
          <Stack.Screen
            name="Province"
            component={ProvinceScreen}
          />
          <Stack.Screen
            name="Done"
            component={DoneScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Tabs"
            component={BottomTabs}
          />

          <Stack.Screen
            name="WebViewScreen"
            component={WebViewScreen}
          />

          <Stack.Screen
            name="Templates"
            component={TemplatesScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
  }


export default function App() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}