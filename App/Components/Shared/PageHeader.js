import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PageHeader({ title, backButton=true }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {backButton?<TouchableOpacity onPress={()=> navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={33} color="black" />
            </TouchableOpacity>: null}
            <Text style={styles.doctorCategory}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    doctorCategory: {
        marginLeft:5,
        fontSize: 25,
        fontFamily: 'outfitSemiBold',
    },
});
