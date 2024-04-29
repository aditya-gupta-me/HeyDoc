import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";
import GlobalAPI from "../../Services/GlobalAPI";
import { useNavigation } from "@react-navigation/native";

export default function SearchBar({ setSearchText }) {
  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [noMatchFound, setNoMatchFound] = useState(false);
  const navigation = useNavigation();

  const searchHospitals = () => {
    GlobalAPI.getHospitalsByCategory(searchInput)
      .then((res) => {
        if (res.data.data.length === 0) {
          setNoMatchFound(true);
        } else {
          setHospitals(res.data.data);
          setShowResults(true);
          setNoMatchFound(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
      });
  };

  const hideResults = () => {
    setShowResults(false);
    setHospitals([]);
    setSearchInput("");
  };

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <TextInput
          placeholder="Search doctors, clinics, hospitals, etc."
          onChangeText={(value) => setSearchInput(value)}
          style={styles.searchArea}
          value={searchInput}
        />
        <TouchableOpacity onPress={searchHospitals}>
          <Ionicons name="search" size={24} color={Colors.dodgerBlue} />
        </TouchableOpacity>
      </View>
      {showResults && (
        <>
          {noMatchFound && (
            <Text style={styles.noMatchText}>No matching hospitals found.</Text>
          )}
          <View style={styles.resultsContainer}>
            {hospitals.map((hospital) => (
              <TouchableOpacity key={hospital.id} onPress={() => {
                setSearchText(hospital.attributes.Name);
                navigation.navigate('hospital-detail', {
                  hospital: hospital
                });
              }}>
                <Text style={styles.hospitalName}>{hospital.attributes.Name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={hideResults}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    marginTop: 15,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: Colors.gray,
    padding: 8,
    borderRadius: 8,
  },
  searchArea: {
    flex: 1,
    paddingLeft: 3,
    fontFamily: "outfitRegular",
  },
  resultsContainer: {
    marginTop: 10,
    borderWidth: 0.7,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 8,
    backgroundColor: Colors.lightGray,
  },
  hospitalName: {
    fontFamily: "outfitRegular",
    fontSize: 16,
    marginBottom: 5,
    color: Colors.dodgerBlue,
  },
  closeButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: Colors.dodgerBlue,
    fontFamily: "outfitRegular",
    fontSize: 16,
  },
  noMatchText: {
    fontFamily: "outfitRegular",
    fontSize: 16,
    color: Colors.red, // You can define your own color
    marginBottom: 10,
  },
});
