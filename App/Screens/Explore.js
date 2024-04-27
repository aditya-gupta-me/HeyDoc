import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Shared/Colors';
import HospitalListBig from '../Components/HospitalDoctorsScreen/HospitalListBig';
import GlobalAPI from '../Services/GlobalAPI';
import DoctorCardItem from './DoctorCardItem';
import HospitalDoctorTab from '../Components/HospitalDoctorsScreen/HospitalDoctorTab'
import PageHeader from '../Components/Shared/PageHeader';

export default function Explore() {
    const [hospitalList, setHospitalList] = useState([]);
    const [doctorList, setDoctorList] = useState([]);
    const [activeTab, setActiveTab] = useState('Hospital');
    
    useEffect(() => {
        getAllHospital()
        getAllDoctor()
    }, []);
    const getAllHospital = () => {
        GlobalAPI.getAllHospitals().then((res) => {
            setHospitalList(res.data.data);
        });
    };
    const getAllDoctor = () => {
        GlobalAPI.getAllDoctors().then((res) => {
            setDoctorList(res.data.data);
        });
    };
  return (
    <View style={styles.container}>
      <PageHeader title={'Explore'} backButton={false}/>
      <HospitalDoctorTab activeTab={(value)=> setActiveTab(value)}/>
      {!hospitalList?.length ? 
                <ActivityIndicator size={"large"} color={Colors.dodgerBlue} style={{marginTop: '80%', marginRight: '2.5%',}} />
             : 
             activeTab=='Hospital'?
                <HospitalListBig hospitalList={hospitalList}/>
            :  <Text style={styles.unavailable}>Search through category</Text>
            }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        paddingTop: 60,
    },
    text:{
        fontSize: 25,
        fontFamily: 'outfitSemiBold',
    },
    unavailable:{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 250,
        fontFamily: 'outfitRegular',
    },
})