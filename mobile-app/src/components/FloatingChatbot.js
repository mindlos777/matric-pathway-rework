import React, { useRef, useState } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";

export default function FloatingChatbot() {
  const pan = useRef(new Animated.ValueXY()).current;

  const [visible, setVisible] = useState(false);

  // Get current route
  const routeName = useNavigationState((state) => {
    const route = state.routes[state.index];

    // handle nested tabs
    if (route.state) {
      const nested = route.state.routes[route.state.index];
      return nested.name;
    }

    return route.name;
  });

  // HIDE on Profile screen
  //if (routeName === "Profile") return null;

  // ---------------- DRAG ----------------
  const panResponder = useRef(
    Animated.createAnimatedComponent({
      onStartShouldSetResponder: () => true,
      onResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onResponderRelease: () => {
        // optional: keep position
      },
    })
  ).current;

  return (
    <>
      {/* FLOATING BUTTON */}
      <Animated.View
        {...panResponder}
        style={[
          styles.floating,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.button}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* CHAT MODAL */}
      <Modal visible={visible} animationType="slide">
        <View style={styles.chatContainer}>
          
          {/* HEADER */}
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>AI Assistant</Text>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* BODY (placeholder) */}
          <View style={styles.chatBody}>
            <Text>Chatbot coming soon...</Text>
          </View>

        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floating: {
    position: "absolute",
    bottom: 90,
    right: 20,
    zIndex: 999,
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  chatBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});