import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";
import Slider from "../Components/Home/Slider";
import Categories from "../Components/Home/Categories";
import PremiumHospitals from "../Components/Home/PremiumHospitals";

export default function Home() {
  const { isLoaded, signOut } = useAuth();
  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar setSearchText={(value)=> console.log(value)}/>
      <Slider/>
      <Categories/>
      <PremiumHospitals/>

      {/* <Button title="SignOut" onPress={() => signOut()}></Button> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    marginTop: 20,
  },
});
