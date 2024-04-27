import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../../../assets/Shared/Colors";
import HorizontalLine from "../Shared/HorizontalLine";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default function AppointmentCardItem({ appointment }) {
    return (
        <View style={styles.container}>
            <Text style={styles.appointmentSchedule}>
                <Ionicons name="calendar" size={15} color={Colors.dodgerBlue} /> 
                {moment(appointment.attributes.Date).format("  MMM Do, YYYY")} -{" "}
                {appointment.attributes.Time}
            </Text>
            <HorizontalLine />
            <View style={styles.container2}>
                <Image
                    source={{
                        uri: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
                    }}
                    style={{
                        height: 100,
                        width: 90,
                        borderRadius: 10,
                    }}
                />
                <View>
                    <Text style={styles.hospitalName}>
                        {appointment.attributes.hospitals.data[0].attributes.Name}
                    </Text>
                    <View style={styles.container4}>
                        <Ionicons name="location" size={18} color={Colors.dodgerBlue} />
                        <Text style={styles.hospitalAddress}>
                            {appointment.attributes.hospitals.data[0].attributes.Address}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginTop: 15,
    },
    container2: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    appointmentSchedule: {
        fontSize: 13,
        fontFamily: "outfitSemiBold",
        marginTop: 10,
    },
    hospitalName: {
        fontFamily: "outfitSemiBold",
        fontSize: 16,
        bottom: 6,
        left: 10,
    },
    container4: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingRight: 50,
        right: 5,
        bottom: 5,
    },
    hospitalAddress: {
        fontFamily: "outfitRegular",
        fontSize: 13,
        color: Colors.otherGray,
        width: 160,
    },
});
