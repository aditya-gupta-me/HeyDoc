import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import app from "./../../assets/images/loginPage.png";
import Colors from "../../assets/Shared/Colors";
import SignInWithOAuth from "../Components/SignInWithOAuth";

export default function Login() {
  return (
    <View style={styles.container1}>
      <Image style={styles.homeImage} source={app} />
      <View style={styles.container2}>
        <Text style={styles.headings}>Your Ultimate Doctor</Text>
        <Text style={styles.headings}>Appointment Booking App</Text>
        <Text style={styles.appDescription}>
          Book Appointments Effortlessly and manage your health journey
        </Text>
        <SignInWithOAuth/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    alignItems: "center",
    backgroundColor: "#F5DAD2",
  },
  container2: {
    backgroundColor: Colors.white,
    padding: 25,
    alignItems: "center",
    marginTop: -50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  homeImage: {
    width: 300,
    height: 500,
    objectFit: "cover",
    marginTop: 90,
    borderRadius: 20,
  },
  headings: {
    fontSize: 28,
    fontWeight: "bold",
  },
  appDescription: {
    textAlign: "center",
    marginTop: 20,
  },
  loginButton: {
    padding: 16,
    backgroundColor: Colors.dodgerBlue,
    borderRadius: 90,
    alignItems: "center",
    marginTop: 20,
    width: Dimensions.get("screen").width * 0.8,
  },
  loginButtonText: {
    fontSize: 17,
    color: Colors.white,
  },
});
