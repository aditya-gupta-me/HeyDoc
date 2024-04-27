import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../../assets/Shared/Colors'

export default function SubHeading({subHeadingTitle, seeAll = true}) {
  return (
    <View>
                  <View style={styles.container}>
                <Text style={styles.heading}>{subHeadingTitle}</Text>
                {seeAll?<Text style={styles.seeAllButton}>See All</Text>:null}
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
    },
    heading: {
        fontSize: 19,
        fontFamily: "outfitSemiBold",
        marginLeft: 3,
    },
    seeAllButton: {
        fontFamily: "outfitRegular",
        color: Colors.dodgerBlue,
    },
})