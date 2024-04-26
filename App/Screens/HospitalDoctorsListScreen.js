import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import PageHeader from "../Components/Shared/PageHeader";
import HospitalDoctorTab from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import HospitalListBig from "../Components/HospitalDoctorsScreen/HospitalListBig";
import GlobalAPI from "../Services/GlobalAPI";
import Colors from "../../assets/Shared/Colors";

export default function HospitalDoctorsListScreen() {
    const [hospitalList, setHospitalList] = useState([]);
    const param = useRoute().params;

    useEffect(() => {
        getHospitalsByCategory();
    }, []);
    const getHospitalsByCategory = () => {
        GlobalAPI.getHospitalsByCategory("Dentist").then((res) => {
            setHospitalList(res.data.data);
        });
    };
    return (
        <View style={styles.container}>
            <PageHeader title={param?.categoryName} />
            <HospitalDoctorTab />
            {!hospitalList?.length ? 
                <ActivityIndicator size={"large"} color={Colors.dodgerBlue} />
             : 
                <HospitalListBig hospitalList={hospitalList}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 55,
        paddingLeft: 15,
    },
});
