import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function WebViewScreen({ route, navigation }) {
  const { url, title } = route.params;

  const [loading, setLoading] = useState(true);

  return (
    <View style={{ flex: 1 }}>

      {/* LOADER */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={styles.loader}
        />
      )}

      {/* WEBVIEW */}
      <WebView
        source={{ uri: url }}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState
      />
    </View>
  );
}

const styles = StyleSheet.create({

  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -10,
  },
});