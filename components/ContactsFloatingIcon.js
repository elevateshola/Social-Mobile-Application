import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import GlobalContext from '../context/Context'
import {useNavigation} from '@react-navigation/native'

const ContactsFloatingIcon = () => {
    const {theme:{colors}} = useContext(GlobalContext)
    const navigation = useNavigation()
    return (
    <TouchableOpacity 
    onPress ={()=>navigation.navigate("contacts")}
    style={{  
        position:'absolute',
        right:20,
        bottom:20,
        borderRadius:60,
        width:60,
        height:60,
        backgroundColor: colors.secondary,
        justifyContent: 'center'
    }}>
        <MaterialCommunityIcons 
            name='android-messages'
            size={30}
            color='white'
            style={{transform:[{scaleX: -1}]}}

        />
    </TouchableOpacity>
  )
}

export default ContactsFloatingIcon

const styles = StyleSheet.create({})