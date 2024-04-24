import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";

export default function SearchBar({setSearchText}) {
    const [searchInput, setSearchInput] = useState();
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Ionicons name="search-outline" size={24} color={Colors.dodgerBlue} />
        <TextInput
          placeholder="Search doctors, clinics hospitals, etc."
          onChangeText={(value) => setSearchInput(value)}
          onSubmitEditing={()=> setSearchText(searchInput)}
          style={styles.searchArea}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    marginTop: 15,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: Colors.gray,
    padding: 8,
    borderRadius: 8,
  },
  searchArea:{
    width: '100%',
    paddingLeft: 3,
    fontFamily: 'outfitRegular',
  }
});
