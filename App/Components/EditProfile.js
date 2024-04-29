import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../assets/Shared/Colors";

export default function EditProfile() {
    const { user, setUser } = useUser();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        // Set the initial values for first and last names when the component mounts
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }, [user]);

    const handleSave = async () => {
        try {
            // Check if first name and last name are not empty
            if (!firstName.trim() || !lastName.trim()) {
                showAlertEmpty();
                return;
            }

            // Call the Clerk API to update the user's profile
            await user.update({
                firstName: firstName,
                lastName: lastName,
            });
            // Optionally, display a success message to the user
            console.log("Profile updated successfully!");
            showToastWithGravitySuccess();
        } catch (error) {
            // Handle any errors that occur during the update process
            console.error("Error updating profile:", error.message);
            showToastWithGravityFail();
        }
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        // Call the Clerk API to delete the user's account
                        user.delete();
                        // Optionally, display a success message to the user
                        console.log("Account deleted successfully!");
                        showToastDeleteSuccess();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const showAlertEmpty = () => {
        Alert.alert(
            "Error",
            "First Name and Last Name cannot be empty!",
            [
                {
                    text: "OK",
                    onPress: () => console.log("OK Pressed"),
                },
            ],
            { cancelable: false }
        );
    };

    const showToastWithGravitySuccess = () => {
        ToastAndroid.showWithGravity(
            "Username Changed successfully!",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };
    const showToastWithGravityFail = () => {
        ToastAndroid.showWithGravity(
            "Can't update Username!",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const showToastDeleteSuccess = () => {
        ToastAndroid.showWithGravity(
            "Account Deleted successfully!",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.instructions}>
                    You can change your first and last names here.
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    placeholder="First Name"
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    placeholder="Last Name"
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                    <Text style={styles.deleteButtonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f6f6",
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        color: "#1d1d1d",
        marginBottom: 6,
        fontFamily: "outfitBold",
    },
    instructions: {
        fontSize: 15,
        fontFamily: "outfitRegular",
        color: "#929292",
        marginBottom: 20,
    },
    form: {
        paddingHorizontal: 24,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontFamily: "outfitRegular",
    },
    saveButton: {
        backgroundColor: Colors.dodgerBlue,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "outfitRegular",
    },
    deleteButton: {
        backgroundColor: Colors.red,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "outfitRegular",
    },
});
