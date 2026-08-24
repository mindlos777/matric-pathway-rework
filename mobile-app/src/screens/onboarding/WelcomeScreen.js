import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function WelcomeScreen({
  navigation,
}) {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo01.png")} style={styles.image}/>

      <Text style={styles.subtitle}>
        Let's set up your profile.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Name")
        }
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 10,
    color: "#6B7280",
  },

  image: {
    width: "100%",
    height: 270,
    marginLeft:15,
    marginVertical: 10,
    borderRadius: 10,
    display:"flex",
    justifyContent:"center"
  },

  button: {
    marginTop: 40,
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 28,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});