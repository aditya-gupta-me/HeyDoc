import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";

export default function Home() {
  const { isLoaded, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar setSearchText={(value)=> console.log(value)}/>
      {/* <Button title="SignOut" onPress={() => signOut()}></Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    marginTop: 20,
  },
});
