import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import AppointmentHospitalInfo from '../BookAppointment/AppointmentHospitalInfo';
import ActionButton from './ActionButton';
import HorizontalLine from '../Shared/HorizontalLine';
import BookingSection from '../BookAppointment/BookingSection';
import { ScrollView } from 'react-native';

export default function BookAppointment() {
    const param  = useRoute().params;
  return (
    <ScrollView style={styles.container1}>
      <AppointmentHospitalInfo hospital={param.hospital}/>
      <ActionButton/>
      <HorizontalLine/>
      <BookingSection hospital={param.hospital}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container1:{
        marginTop: 30,
        marginLeft: 5,
        padding: 20,
        paddingLeft: 10,
    },
})