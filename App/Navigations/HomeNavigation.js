import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import HospitalDoctorsListScreen from "../Screens/HospitalDoctorsListScreen";
import HospitalDetails from "../Screens/HospitalDetails";
import BookAppointment from "../Components/HospitalDetail/BookAppointment";
import Login from "../Screens/Login";
import WelcomeScreen from "../Screens/WelcomeScreen";
import { LogBox } from "react-native";
import EditProfile from "../Components/EditProfile";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="hospital-doctor-list-screen"
        component={HospitalDoctorsListScreen}
      />
      <Stack.Screen name="hospital-detail" component={HospitalDetails} />
      <Stack.Screen name="book-appointment" component={BookAppointment} />
      <Stack.Screen name="edit-profile" component={EditProfile} />
    </Stack.Navigator>
  );
}
