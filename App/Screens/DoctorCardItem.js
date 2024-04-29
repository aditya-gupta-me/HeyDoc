import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ToastAndroid
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import GlobalAPI from "../Services/GlobalAPI";
import Colors from "../../assets/Shared/Colors";

export default function DoctorCardItem() {
    const [doctorList, setDoctorList] = useState([]);
    const param = useRoute().params;
    const navigation = useNavigation();

    useEffect(() => {
        getDoctorLists();
    }, []);

    const getDoctorLists = () => {
        GlobalAPI.getDoctorLists(param?.categoryName).then((res) => {
            setDoctorList(res.data.data);
        });
    };

    const showToast = () => {
        ToastAndroid.show("Book Appointment Through Hospital Only", ToastAndroid.SHORT);
    };

    return (
        <View style={styles.container}>
            {doctorList.map((doctor, index) => (
                <View key={index} style={styles.doctorCard}>
                    <Image
                        source={{ uri: doctor.attributes.docImage.data.attributes.url }}
                        style={styles.doctorImage}
                    />
                    <View>
                        <Text style={styles.doctorName}>{doctor.attributes.docName}</Text>
                    </View>
                    <View>
                        <Text style={styles.doctorSpecialization}>
                            {doctor.attributes.Categories.data[0].attributes.Name}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.doctorEx}>
                            {doctor.attributes.Years_of_Experience}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.appointmentButton} onPress={showToast}>
                        <Text style={styles.appointmentText}>Available Now</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    doctorCard: {
        width: "84%",
        height: "37.5%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.white,
        margin: 25,
        marginBottom: 0,
        borderRadius: 10,
    },
    doctorName: {
        marginLeft: 125,
        marginTop: -80,
        fontFamily: "outfitSemiBold",
        fontSize: 14,
    },
    doctorSpecialization: {
        marginLeft: 125,
        marginTop: -60,
        fontFamily: "outfitLight",
        color: Colors.otherGray,
    },
    doctorEx: {
        marginLeft: 125,
        marginTop: -40,
        fontFamily: "outfitRegular",
        color: Colors.dodgerBlue,
    },
    doctorImage: {
        width: 100,
        height: 100,
        marginTop: 33,
        marginLeft: 10,
        borderRadius: 10,
    },
    appointmentButton:{
        marginTop:15,
        padding: 10,
        marginLeft:10,
        marginRight: 10,
        backgroundColor: Colors.lightBlue,
        borderRadius: 10,

    },
    appointmentText:{
        color: Colors.dodgerBlue,
        textAlign: 'center',
        fontFamily: 'outfitSemiBold'

    },
});
