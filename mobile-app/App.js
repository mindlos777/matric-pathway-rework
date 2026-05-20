import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider, useAuth } from "./src/auth/AuthContext";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import BottomTabs from "./src/navigation/BottomTabs";
import WebViewScreen from "./src/screens/WebViewScreen";
import TemplatesScreen from "./src/screens/TemplatesScreen";
import TemplateViewerScreen from "./src/screens/TemplateViewerScreen";
//import "./src/data/uploadUniversitie";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {/* MAIN APP */}
            <Stack.Screen name="MainApp" component={BottomTabs} />

            {/* WEB VIEW SCREEN */}
            <Stack.Screen
              name="WebViewScreen"
              component={WebViewScreen}
              options={{ headerShown: true, title: "Apply" }}
            />
            <Stack.Screen name="Templates" component={TemplatesScreen} />
            <Stack.Screen name="TemplateViewer" component={TemplateViewerScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  }

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}