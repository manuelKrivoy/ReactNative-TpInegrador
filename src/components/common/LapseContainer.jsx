import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { FaFlag } from "react-icons/fa";

const LapseContainer = ({ lapseList }) => {
  return (
    <ScrollView style={styles.lapseContainer}>
      <View style={{ alignItems: "center" }}>
        {lapseList.map((item, index) => (
          <Text style={{ fontSize: 24, margin: 2 }} key={index}>
            <FaFlag /> {index + 1}: {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lapseContainer: {
    marginTop: 20,
    maxHeight: 500,
    width: "100%",
  },
});

export default LapseContainer;
