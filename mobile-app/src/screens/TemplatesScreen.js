import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function TemplatesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Application Templates</Text>

      {/* EMAIL TEMPLATE */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("TemplateViewer", {
            type: "email",
          })
        }
      >
        <Text style={styles.cardTitle}>📧 Email Template</Text>
        <Text style={styles.cardDesc}>
          Professional bursary application email
        </Text>
      </TouchableOpacity>

      {/* CV TEMPLATE */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("TemplateViewer", {
            type: "cv",
          })
        }
      >
        <Text style={styles.cardTitle}>📄 CV Template</Text>
        <Text style={styles.cardDesc}>
          Student CV format for applications
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 30,
  },

  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 15,
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  cardDesc: {
    color: "#666",
    marginTop: 5,
  },
});