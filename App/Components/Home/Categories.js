import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalAPI from "../../Services/GlobalAPI";
import Colors from "../../../assets/Shared/Colors";
import SubHeading from "./SubHeading";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
    const navigation = useNavigation();
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        getCategories();
    });
    const getCategories = () => {
        GlobalAPI.getCategories().then((res) => {
            // console.log(res.data.data);
            setCategoryList(res.data.data);
        });
    };
    if (!categoryList) {
        return null;
    }
    return (
        <View style={styles.container}>
            <SubHeading subHeadingTitle={'Book an appointment'}/>
            <FlatList
                numColumns={4}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: "space-between",
                }}
                data={categoryList}
                renderItem={({ item, index }) => index<4&& (
                    <TouchableOpacity
                    onPress={()=> navigation.navigate('hospital-doctor-list-screen',{
                        categoryName:  item.attributes.Name
                    })}
                    style={styles.imageContainer1}>
                        <View style={styles.imageContainer2}>
                            <Image
                                source={{ uri: item.attributes.Icon.data.attributes.url }}
                                style={styles.icon}
                            />
                        </View>
                        <Text style={styles.doctorCategoryName}>
                            {item.attributes.Name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    imageContainer1: {
        alignItems: "center",
    },

    imageContainer2: {
        backgroundColor: Colors.lightBlue,
        padding: 15,
        borderRadius: 100,
    },
    doctorCategoryName: {
        fontFamily: "outfitRegular",
    },
});
