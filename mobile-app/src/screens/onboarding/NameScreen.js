import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function NameScreen({
  navigation,
  route,
}) {
  const [name, setName] = useState("");

  const handleNext = () => {
    if (!name.trim()) {
      Alert.alert(
        "Name Required",
        "Please enter your name before continuing."
      );
      return;
    }

    navigation.navigate("Hobbies", {
      name: name.trim(),
    });
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      enableOnAndroid
      extraScrollHeight={20}
    >
      
    <View style={styles.container}>
      <Image source={require("../../../assets/edu.png")} style={styles.image}/>
      <Text style={styles.title}>
        What's your name?
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    padding:25,
    backgroundColor:"#fff"
  },

  title:{
    fontSize:28,
    fontWeight:"700",
    marginBottom:20
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:28,
    padding:15
  },

  button:{
    marginTop:20,
    backgroundColor:"#4F46E5",
    padding:15,
    borderRadius:28
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"700"
  },

  image: {
    width: "100%",
    height: 270,
    marginVertical: 10,
    borderRadius: 10,
    display:"flex",
    justifyContent:"center"
  },
});