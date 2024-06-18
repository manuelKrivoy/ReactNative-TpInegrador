import React from "react";
import {Pressable, Text, StyleSheet } from "react-native";

const ClockButton = ({ onPress, text, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonText: {
    fontSize: 18,
  },
});

export default ClockButton;
