import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../../../assets/Shared/Colors'
import { Ionicons } from '@expo/vector-icons';

export default function ActionButton() {
    const actionButtonList = [
        {
            id:1,
            name: 'Website',
            icon: 'earth'
        },
        {
            id:2,
            name: 'Email',
            icon: 'chatbubble-ellipses'
        },
        {
            id:3,
            name: 'Phone',
            icon: 'call'
        },
        {
            id:4,
            name: 'Maps',
            icon: 'map'
        },
        {
            id:4,
            name: 'Share',
            icon: 'share'
        }
        
    ]
  return (
    <View style={styles.container1}>
      <FlatList 
      data={actionButtonList}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: 'space-between'
      }}
      numColumns={5}
      renderItem={({item})=>(
        <TouchableOpacity style={{alignItems: 'center',}}>
            <View style={styles.container2}>
               <Ionicons name={item.icon}  size={21} color={Colors.dodgerBlue}/>
            </View>
            <Text style={styles.iconText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container1:{
        marginTop: 15,
        marginBottom: 15,


    },
    container2:{
        backgroundColor: Colors.lightBlue,
        padding: 13,
        borderRadius: 100,
        alignItems: 'center',

    },
    iconText:{
        fontFamily: 'outfitSemiBold',
        marginTop: 5,

    },
})