import React from "react";
import { StyleSheet, View } from "react-native";


const LineSeparator = () => (
  <View style={styles.container}>
    <View style={styles.separator} />
  </View>
);

export default LineSeparator;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      // backgroundColor: "yellow",
      justifyContent: "center",
      padding: 10,
    },
    separator: {
      borderColor: "white",
      borderWidth: 1,
      // flex: 1,
      width: "90%",
      flexDirection: "row",
    },
  });
  