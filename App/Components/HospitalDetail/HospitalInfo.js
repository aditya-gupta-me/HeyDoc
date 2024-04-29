import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import React from "react";
import Colors from "../../../assets/Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "./ActionButton";
import PageHeader from "../Shared/PageHeader";
import SubHeading from "../Home/SubHeading";

export default function HospitalInfo({ hospital }) {
    return (
        hospital && (
            <ScrollView>
                <Text style={styles.hospitalName}>{hospital.attributes.Name}</Text>
                <FlatList
                    data={hospital.attributes.Categories.data}
                    horizontal={true}
                    renderItem={({ item, index }) => (
                        <Text style={styles.categoryName}>
                            {item.attributes.Name}
                            {index !== hospital.attributes.Categories.data.length - 1 && ","}
                        </Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.container3}></View>
                <View style={styles.container4}>
                    <Ionicons name="location" size={18} color={Colors.dodgerBlue} />
                    <Text style={styles.hospitalAddress}>
                        {hospital.attributes.Address}
                    </Text>
                </View>
                <View style={styles.container5}>
                    <Ionicons name="time" size={18} color={Colors.dodgerBlue} />
                    <Text style={styles.hospitalAddress}>Mon Sun | 11AM - 8 PM</Text>
                </View>
                <ActionButton />
                <View style={styles.container6}></View>
                <SubHeading subHeadingTitle={'About'}/>
                <Text style={styles.hospitalDescription}>{hospital.attributes.Description}</Text>
            </ScrollView>
        )
    );
}

const styles = StyleSheet.create({
    hospitalName: {
        fontSize: 23,
        fontFamily: "outfitSemiBold",
    },
    container3: {
        borderBottomWidth: 1,
        borderColor: Colors.lightGray,
        margin: 5,
        marginBottom: 15,
    },
    container4: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingRight: 20,
    },
    container5: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingRight: 20,
        marginTop: 8,
    },
    container6: {
        borderBottomWidth: 1,
        borderColor: Colors.lightGray,
        margin: 5,
        marginBottom: 15,
        marginTop: 15,
    },
    hospitalAddress: {
        fontFamily: "outfitRegular",
        fontSize: 13,
        color: Colors.otherGray,
    },
    categoryName: {
        marginRight: 5,
        color: Colors.otherGray,
        fontFamily: "outfitLight",
    },
    hospitalDescription:{
        fontFamily: 'outfitLight',
    },
});
