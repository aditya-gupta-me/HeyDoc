import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React from "react";
import HospitalCardItem from "../Shared/HospitalCardItem";
import { useNavigation } from "@react-navigation/native";

export default function HospitalListBig({ hospitalList }) {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <FlatList
                data={hospitalList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('hospital-detail', 
                            {
                                hospital: item
                            })}>
                        <HospitalCardItem hospital={item} />
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
}



