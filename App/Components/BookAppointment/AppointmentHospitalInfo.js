import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import PageHeader from "../Shared/PageHeader";
import Colors from "../../../assets/Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import HorizontalLine from "../Shared/HorizontalLine";

export default function AppointmentHospitalInfo({ hospital }) {
    return (
        <View style={styles.container1}>
            <PageHeader title={"Book Appointment"} />
            <View style={styles.container2}>
                <Image
                    source={{ uri: hospital.attributes.Image.data.attributes.url }}
                    style={styles.hospitalImage}
                />
                <View>
                    <Text style={styles.hospitalName}>{hospital.attributes.Name}</Text>
                    <View style={styles.container4}>
                    <Ionicons name="location" size={18} color={Colors.dodgerBlue} />
                    <Text style={styles.hospitalAddress}>
                        {hospital.attributes.Address}
                    </Text>
                </View>
                </View>
            </View>
            <HorizontalLine/>
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        marginTop: 0,

    },
    container2:{
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,

    },
    hospitalImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    container4: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingRight: 20,
    },
    hospitalAddress: {
        fontFamily: "outfitRegular",
        fontSize: 13,
        color: Colors.otherGray,
        width: '70%',
    },
    hospitalName:{
        fontSize: 20,
        fontFamily: 'outfitSemiBold',
        marginBottom: 8,
    },
});
