import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

import { FaFlag } from "react-icons/fa";

const LapseContainer = ({ lapseList }) => {
  return (
    <ScrollView style={styles.lapseContainer}>
      <View style={{ alignItems: "center" }}>
        {lapseList.map((item, index) => (
          <View key={index} style={styles.lapseItem}>
            <Text style={{ fontSize: 24, margin: 2 }}>
              <FaFlag /> {index + 1}: {item.time}
            </Text>
            {item.flagUrl && <Image source={{ uri: item.flagUrl }} style={styles.flag} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lapseContainer: {
    marginTop: 20,
    maxHeight: 100,
    width: "50%",
  },
  lapseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  flag: {
    width: 40,
    height: 25,
    marginLeft: 10,
  },
});

export default LapseContainer;
