import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import SubHeading from "./SubHeading";
import GlobalAPI from "../../Services/GlobalAPI";
import HospitalItem from "./HospitalItem";

export default function PremiumHospitals() {
    const [hospitalList, setHospitalList] = useState([]);

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
                        <HospitalItem hospital={item} />
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
