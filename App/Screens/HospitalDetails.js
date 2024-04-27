import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PageHeader from "../Components/Shared/PageHeader";
import HospitalInfo from "../Components/HospitalDetail/HospitalInfo";
import Colors from "../../assets/Shared/Colors";

export default function HospitalDetails() {
    const navigation = useNavigation();
    const param = useRoute().params;
    const hospital = param.hospital;
    return (
        hospital && (
            <View style={styles.container1}>
                <ScrollView>
                    <View style={styles.container2}>
                        <View style={styles.container3}>
                            <PageHeader title={""} />
                        </View>
                    </View>
                    <View>
                        <Image
                            source={{ uri: hospital.attributes.Image.data.attributes.url }}
                            style={styles.hospitalImage}
                        />
                        <View style={styles.container4}>
                            <HospitalInfo hospital={hospital} />
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.bookAppointmentButton} onPress={()=> navigation.navigate('book-appointment',{
                    hospital: hospital
                })}>
                    <Text style={styles.bookAppointmentText}>Book Appointment</Text>
                </TouchableOpacity>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    container2: {
        position: "absolute",
        zIndex: 10,
        margin: 15,
    },
    container3:{
        marginTop: 30,
    },
    container4: {
        marginTop: -20,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    hospitalImage: {
        width: "100%",
        height: 260,
    },
    bookAppointmentButton: {
        padding: 13,
        backgroundColor: Colors.dodgerBlue,
        margin: 10,
        borderRadius: 100,
        left: 0,
        right: 0,
        marginBottom: 10,
        zIndex: 20,
    },
    bookAppointmentText: {
        textAlign: "center",
        fontFamily: "outfitSemiBold",
        fontSize: 17,
        color: Colors.white,
    },
});
