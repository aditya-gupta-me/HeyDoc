import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import app from "./../../assets/images/welcomeImage.png";
import Colors from '../../assets/Shared/Colors';
import WelcomeButton from '../Navigations/WelcomeButton';


export default function WelcomeScreen() {
  return (
    <View style={styles.container1}>
      <Image style={styles.homeImage} source={app} />
      <View style={styles.container2}>
        <Text style={styles.headings}>Welcome, to Smart Health </Text>
        <Text style={styles.headings}>  Consultation System</Text>
        <Text style={styles.appDescription}>
        Connecting you to better health
        </Text>
        <WelcomeButton/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container1: {
        alignItems: "center",
        backgroundColor: "#F5DAD2",
      },
      container2: {
        padding: 25,
        alignItems: "center",
        marginTop: -50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 10,
      },
      homeImage: {
        width: 300,
        height: 515,
        objectFit: "cover",
        marginTop: 90,
        borderRadius: 20,
        bottom: 20,
      },
      headings: {
        fontSize: 28,
        fontFamily: 'outfitBold',
      },
      appDescription: {
        textAlign: "center",
        marginTop: 20,
        fontFamily: 'outfitRegular',
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