import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SubHeading from "./SubHeading";
import GlobalAPI from "../../Services/GlobalAPI";
import HospitalItem from "./HospitalItem";
import { useNavigation } from "@react-navigation/native";

export default function PremiumHospitals() {
    const [hospitalList, setHospitalList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getPremiumHospitals()
    }, []);

    const getPremiumHospitals = () => {
        GlobalAPI.getPremiumHospitals().then(res => {
            setHospitalList(res.data.data);
        })
    }
    return (
        hospitalList && (
            <View style={styles.container}>
                <SubHeading subHeadingTitle={"Our Premium Hospitals"} />
                <FlatList
                    data={hospitalList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={
                            ()=> navigation.navigate('hospital-detail',{
                                hospital: item
                            })
                        }>
                        <HospitalItem hospital={item} />
                        </TouchableOpacity>
                    )} />
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});
