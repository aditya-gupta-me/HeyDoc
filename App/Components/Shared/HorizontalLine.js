import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../assets/Shared/Colors";

export default function HorizontalLine() {
    return <View style={styles.container}></View>;
}


const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: Colors.lightGray,
        margin: 5,
        marginBottom: 15,
    },
})