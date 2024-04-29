import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Image
          source={{ uri: user.imageUrl }}
          style={styles.userProfilePicture}
        />
        <View>
          <Text style={styles.greetingText}>Hello,👋🏻</Text>
          <Text style={styles.userName}>{user.firstName}</Text>
        </View>
      </View>
      <Ionicons name="notifications-outline" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    marginTop: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  greetingText:{
    fontFamily:'outfitRegular',
  },
  userProfilePicture: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  userName: {
    fontSize: 17,
    fontFamily: 'outfitSemiBold',
  },
});
