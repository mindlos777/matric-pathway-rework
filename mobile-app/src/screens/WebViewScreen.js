import React, {
  useRef,
  useState,
  useEffect,
} from "react";

import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  BackHandler,
  Platform,
} from "react-native";

import { WebView } from "react-native-webview";

import { Ionicons } from "@expo/vector-icons";

export default function WebViewScreen({
  route,
  navigation,
}) {
  const { url } = route.params;

  const webViewRef = useRef(null);

  const [canGoBack, setCanGoBack] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // ================= CUSTOM TOP BACK =================
  const handleTopBack = () => {
    navigation.goBack();
  };

  // ================= RELOAD =================
  const handleReload = () => {
    webViewRef.current?.reload();
  };

  // ================= OPEN EXTERNAL =================
  const handleOpenBrowser = async () => {
    await Linking.openURL(url);
  };

  // ================= ANDROID HARDWARE BACK =================
  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack) {
        // GO BACK INSIDE WEBSITE
        webViewRef.current?.goBack();
        return true;
      }

      // BLOCK EXITING SCREEN
      return true;
    };

    const subscription =
      BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

    return () => subscription.remove();
  }, [canGoBack]);

  // ================= DISABLE HEADER GESTURE BACK =================
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>

      {/* TOP BAR */}
      <View style={styles.topBar}>

        {/* APP BACK BUTTON */}
        <TouchableOpacity
          onPress={handleTopBack}
          style={styles.iconBtn}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#111"
          />
        </TouchableOpacity>

        {/* RIGHT ACTIONS */}
        <View style={styles.rightActions}>

          {/* RELOAD */}
          <TouchableOpacity
            onPress={handleReload}
            style={styles.iconBtn}
          >
            <Ionicons
              name="reload"
              size={22}
              color="#111"
            />
          </TouchableOpacity>

          {/* OPEN EXTERNAL */}
          <TouchableOpacity
            onPress={handleOpenBrowser}
            style={styles.iconBtn}
          >
            <Ionicons
              name="open-outline"
              size={22}
              color="#111"
            />
          </TouchableOpacity>

        </View>
      </View>

      {/* WEBVIEW */}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}

        startInLoadingState

        onLoadStart={() =>
          setLoading(true)
        }

        onLoadEnd={() =>
          setLoading(false)
        }

        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}

        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator
              size="large"
              color="#4F46E5"
            />
          </View>
        )}
      />

      {/* LOADING INDICATOR */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            size="small"
            color="#4F46E5"
          />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topBar: {
    height: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#fff",
  },

  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBtn: {
    padding: 8,
    marginHorizontal: 2,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingOverlay: {
    position: "absolute",
    top: 70,
    right: 15,
  },
});