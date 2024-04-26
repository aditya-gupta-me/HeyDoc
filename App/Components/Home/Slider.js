import { View, Text, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import dentistImage from "./../../../assets/images/dentist.jpg";
import GlobalAPI from "../../Services/GlobalAPI";

export default function Slider() {
    const [sliderList, setSliderList] = useState();
    // const sliderList = [
    //     {
    //         id: 1,
    //         name: "Slider 1",
    //         imageUrl: "https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?t=st=1713989437~exp=1713993037~hmac=d2088c3e6e06d716e2b1caba57641823e2f269bced282b8bef5c4f924a79aaea&w=996",
    //     },
    //     {
    //         id: 2,
    //         name: "Slider 2",
    //         imageUrl: "https://img.freepik.com/free-photo/doctor-nurse-discussing-digital-tablet_107420-84815.jpg?t=st=1713988133~exp=1713991733~hmac=92895bac4a76ec71168647f3a53761f1a230d600f0a313cdf37d571294f284e2&w=996",
    //     },
    // ];
    useEffect(() => {
        getSlider();
    }, [])
    const getSlider = () => {
        GlobalAPI.getSlider().then(res => {
            console.log(res.data.data);
            setSliderList(res.data.data)
        })
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.attributes.Image.data.attributes.url }} style={styles.banners} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    banners: {
        width: Dimensions.get('screen').width * 0.875,
        height: 170,
        borderRadius: 10,
        margin: 2,
    }
});