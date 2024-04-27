import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '../Components/Shared/PageHeader'
import GlobalAPI from '../Services/GlobalAPI'
import { useUser } from '@clerk/clerk-expo'
import AppointmentCardItem from '../Components/Appointment/AppointmentCardItem'


export default function Appointment() {
    const {user} = useUser();
    const [appointmentList, setAppointmentList] = useState([]);
    useEffect(()=>{
        if(user.firstName){
            getUsersAppointments()
        }
    }, [user])
    const getUsersAppointments = ()=>{
        GlobalAPI.getUsersAppointments(user.primaryEmailAddress.emailAddress).then(res =>{
            setAppointmentList(res.data.data);
        })
    }
  return (
    <View style={styles.container}>
    <PageHeader title={'My Appointments'} backButton={false}/>
    <FlatList
    data={appointmentList}
    showsVerticalScrollIndicator={false}
    renderItem={({item})=>(
        <AppointmentCardItem appointment={item}/>
    )}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
    padding: 25,
    marginTop: 30,
    },
})