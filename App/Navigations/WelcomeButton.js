import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../assets/Shared/Colors";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Get Started</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loginButton: {
        padding: 16,
        backgroundColor: Colors.red,
        borderRadius: 90,
        alignItems: "center",
        marginTop: 30,
        width: Dimensions.get("screen").width * 0.8,
    },
    loginButtonText: {
        fontSize: 19,
        color: Colors.white,
        fontFamily: "outfitRegular",
    },
});
