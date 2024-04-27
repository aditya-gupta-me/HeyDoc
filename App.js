import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Login from "./App/Screens/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithOAuth from "./App/Components/SignInWithOAuth";
import Home from "./App/Screens/Home";
import TabNavigation from "./App/Navigations/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import WelcomeScreen from "./App/Screens/WelcomeScreen";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    outfitLight: require("./assets/fonts/Outfit-Light.ttf"),
    outfitRegular: require("./assets/fonts/Outfit-Regular.ttf"),
    outfitSemiBold: require("./assets/fonts/Outfit-SemiBold.ttf"),
    outfitBold: require("./assets/fonts/Outfit-Bold.ttf"),
    welcomeFont: require("./assets/fonts/CedarvilleCursive-Regular.ttf"),
  });
  if(!fontsLoaded){
    return null
  }
  return (
    <ClerkProvider
      publishableKey={
        "pk_test_dW5pZmllZC13YWxsYWJ5LTY4LmNsZXJrLmFjY291bnRzLmRldiQ"
      }
    >
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <Login/>
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
