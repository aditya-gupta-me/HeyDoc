import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../assets/Shared/Colors";
import SubHeading from "../Home/SubHeading";
import moment from "moment";
import { useUser } from "@clerk/clerk-expo";
import GlobalAPI from "../../Services/GlobalAPI";

export default function BookingSection({ hospital }) {
    const { user } = useUser();
    const [next7days, setNext7Days] = useState([]);
    const [timeList, setTimeList] = useState([]);
    const [appointmentMade, setAppointmentMade] = useState(false);

    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [notes, setNotes] = useState();

    useEffect(() => {
        getDays();
        getTime();
    }, []);
    const getDays = () => {
        const today = moment();
        const nextSevenDays = [];
        for (let i = 0; i < 7; i++) {
            const date = moment().add(i, "days");
            nextSevenDays.push({
                date: date,
                day: date.format("ddd"),
                formatedDate: date.format("YYYY-MM-DD"), // Format as 'YYYY-MM-DD'
            });
        }
        setNext7Days(nextSevenDays);
    };
    const getTime = () => {
        const timeList = [];
        for (let i = 8; i <= 12; i++) {
            timeList.push({
                time: i + ":00 AM",
            });
            timeList.push({
                time: i + ":30 AM",
            });
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push({
                time: i + ":00 PM",
            });
            timeList.push({
                time: i + ":30 PM",
            });
        }
        setTimeList(timeList);
    };
    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          "Booking Appointment...",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      };
    const bookAppointment = () => {
        const data = {
            data: {
                UserName: user.fullName,
                Email: user.primaryEmailAddress.emailAddress,
                Date: selectedDate,
                Time: selectedTime,
                hospitals: hospital.id,
                Note: notes,
            },
        };
        showToastWithGravity();
        GlobalAPI.createAppointment(data)
            .then((res) => {
                console.log(res);
                setAppointmentMade(true);

                ToastAndroid.show("Appointment successfully made!", ToastAndroid.LONG);
            })
            .catch((error) => {
                console.error("Error creating appointment:", error);
                ToastAndroid.show("Failed to make appointment", ToastAndroid.LONG);
            });
    };
    return (
        <View>
            <Text style={styles.bookingAppointmentText}>Book Appointment</Text>
            <SubHeading subHeadingTitle={"Day"} seeAll={false} />
            <FlatList
                data={next7days}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.days,
                            selectedDate == item.date
                                ? { backgroundColor: Colors.dodgerBlue }
                                : null,
                        ]}
                        onPress={() => setSelectedDate(item.date)}
                    >
                        <Text
                            style={[
                                styles.daysText,
                                selectedDate == item.date ? { color: Colors.white } : null,
                            ]}
                        >
                            {item.day}
                        </Text>
                        <Text
                            style={[
                                styles.formatedDateText,
                                selectedDate == item.date ? { color: Colors.white } : null,
                            ]}
                        >
                            {item.formatedDate}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <SubHeading subHeadingTitle={"Time"} seeAll={false} />
            <FlatList
                data={timeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.days,
                            {
                                paddingVertical: 16,
                            },
                            selectedTime == item.time
                                ? { backgroundColor: Colors.dodgerBlue }
                                : null,
                        ]}
                        onPress={() => setSelectedTime(item.time)}
                    >
                        <Text
                            style={[
                                styles.formatedDateText,
                                selectedTime == item.time ? { color: Colors.white } : null,
                            ]}
                        >
                            {item.time}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <SubHeading subHeadingTitle={"Note"} seeAll={false} />
            <TextInput
                numberOfLines={3}
                onChangeText={(value) => setNotes(value)}
                placeholder="Write Notes Here"
                style={{
                    backgroundColor: Colors.lightGray,
                    padding: 10,
                    textAlignVertical: "top",
                    borderRadius: 10,
                    borderColor: Colors.lightBlue,
                    borderWidth: 1,
                    fontFamily: "outfitRegular",
                }}
            />
            <TouchableOpacity
                onPress={ appointmentMade ? null : bookAppointment}
                style={[
                    styles.bookAppointmentButton,
                    appointmentMade && styles.disabledButton,
                ]}
                disabled={appointmentMade}
            >
                <Text style={styles.bookAppointmentText}>Make Appointment</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bookingAppointmentText: {
        fontSize: 18,
        fontFamily: "outfitRegular",
        color: Colors.otherGray,
    },
    days: {
        borderWidth: 1,
        borderRadius: 99,
        padding: 5,
        paddingHorizontal: 20,
        alignItems: "center",
        marginRight: 10,
        borderColor: Colors.lightGray,
    },
    daysText: {
        fontFamily: "outfitRegular",
    },
    formatedDateText: {
        fontFamily: "outfitSemiBold",
        fontSize: 16,
    },
    bookAppointmentButton: {
        padding: 13,
        backgroundColor: Colors.dodgerBlue,
        margin: 10,
        borderRadius: 100,
        left: 0,
        right: 0,
        marginBottom: 10,
        marginTop: 13,
        zIndex: 20,
    },
    disabledButton: {
        backgroundColor: Colors.lightGray,
    },
    bookAppointmentText: {
        textAlign: "center",
        fontFamily: "outfitSemiBold",
        fontSize: 17,
        color: Colors.white,
    },
});
