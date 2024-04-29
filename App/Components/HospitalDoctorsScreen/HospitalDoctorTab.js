import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Colors from "../../../assets/Shared/Colors";

export default function HospitalDoctorTab({activeTab}) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.container2}>
                <TouchableOpacity
                    onPress={() => {setActiveIndex(0); activeTab('Hospital')}}
                    style={[activeIndex == 0 ? styles.activeTab : styles.inActiveTab]}
                >
                    <Text
                        style={[
                            activeIndex == 0 ? styles.activeTabText : styles.inActiveTabText,
                        ]}
                    >
                        Hospital
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {setActiveIndex(1); activeTab('Doctor')}}
                    style={[activeIndex == 1 ? styles.activeTab : styles.inActiveTab]}
                >
                    <Text
                        style={[
                            activeIndex == 1 ? styles.activeTabText : styles.inActiveTabText,
                        ]}
                    >
                        Doctors
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        
    },
    container2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // marginTop:10,
        marginRight: 15,
        justifyContent: "space-around",
    },
    activeTabText: {
        textAlign: "center",
        fontFamily: "outfitRegular",
        fontSize: 18,
        color: Colors.dodgerBlue,
    },
    inActiveTabText: {
        textAlign: "center",
        fontFamily: "outfitRegular",
        fontSize: 18,
        color: Colors.otherGray,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.dodgerBlue,
        padding: 3,
    },
    inActiveTab: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.otherGray,
        padding: 3,
    },
});
