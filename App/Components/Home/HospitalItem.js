import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../assets/Shared/Colors";

export default function HospitalItem({ hospital }) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: hospital.attributes.Image.data.attributes.url }}
                style={styles.image}
            />
            <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>{hospital.attributes.Name}</Text>
                <Text style={styles.hospitalAddress}>{hospital.attributes.Address}</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        marginRight: 10,

    },
    image: {
        width: "100%",
        height: 110,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    hospitalInfo:{
        padding: 7,
    },
    hospitalName:{
        fontFamily: 'outfitSemiBold',
        fontSize: 16,
    },
    hospitalAddress:{
        color: Colors.otherGray,
        fontFamily: 'outfitRegular',
    },

});
