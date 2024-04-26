import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import Colors from "../../../assets/Shared/Colors";
import { Ionicons } from '@expo/vector-icons';

export default function HospitalCardItem({ hospital }) {
    return (
        <View style={styles.container1}>
            <Image
                source={{ uri: hospital.attributes.Image.data.attributes.url }}
                style={styles.hospitalImage}
            />
            <View style={styles.container2}>
                <Text style={styles.hospitalName}>{hospital.attributes.Name}</Text>
                <FlatList
                data={hospital.attributes.Categories.data}
                horizontal={true}
                renderItem={({item})=>(
                    <Text style={styles.categoryName}>{item.attributes.Name},</Text>
                )}
                />
                <View style={styles.container3}></View>
                <View style={styles.container4}>
                <Ionicons name="location" size={18} color={Colors.dodgerBlue} />
                <Text style={styles.hospitalAddress}>{hospital.attributes.Address}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container1:{
        marginTop: 25,
        marginLeft: 10,
    },
    container2: {
        padding: 10,
        width: '92.5%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: 20,
        marginTop:0,
        marginLeft:1.25,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    container3:{
        borderBottomWidth: 1,
        borderColor: Colors.lightGray,
        margin: 5,
        marginBottom: 10,
    },
    container4:{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        paddingRight: 20,

    },
    hospitalImage: {
        marginLeft: 5,
        width: "90%",
        height: 140,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    hospitalName: {
        fontSize: 17,
        fontFamily: "outfitSemiBold",
    },
    categoryName:{
        marginRight: 10,
        color: Colors.otherGray,
        fontFamily: 'outfitLight',

    },
    hospitalAddress:{
        fontFamily: 'outfitRegular',
        fontSize: 13,
    },
});
