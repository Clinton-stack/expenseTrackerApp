import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function LoadingOverlay({size}) {
  return <View style={styles.container}>
    <ActivityIndicator size= {size} color="#fff" />
  </View>;
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    }
})

export default LoadingOverlay;
