import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Avatar = ({user, size}) => {
  return (
   <Image
    style={{
        width:size,
        height:size,
        borderRadius: size
    }}
   source={
    user.photoURL 
    ? {uri: user.phoURL}
    : require("../assets/icon-square.png")
   }
   resizeMode="cover"
   />
  )
}

export default Avatar

const styles = StyleSheet.create({})