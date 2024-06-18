import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const LapseContainer = ({ lapseList }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {lapseList.map((item, index) => (
        <View key={index} style={styles.lapseItem}>
          <Icon name="flag" size={24} color="#333" style={styles.icon} />
          <Text style={styles.text}>{index + 1}: {item.time}</Text>
          {item.flagUrl && <Image source={{ uri: item.flagUrl }} style={styles.flag} />}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  lapseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    width: width - 40, // Se ajusta al ancho de la pantalla restando un margen horizontal
    maxWidth: 350, // Ancho máximo para evitar que los elementos sean demasiado anchos
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    flex: 1,
  },
  flag: {
    width: 40,
    height: 25,
    marginLeft: 10,
    borderRadius: 5,
  },
});

export default LapseContainer;