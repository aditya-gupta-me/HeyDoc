import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";
import Slider from "../Components/Home/Slider";
import Categories from "../Components/Home/Categories";
import PremiumHospitals from "../Components/Home/PremiumHospitals";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar setSearchText={(value)=> console.log(value)}/>
      <Slider/>
      <Categories/>
      <PremiumHospitals/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    marginTop: 20,
  },
});
