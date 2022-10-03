import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import { useEffect } from 'react';
import { pickImage } from '../utils';

const Photo = () => {
  const navigation = useNavigation();
  const [cancelled, setCancelled ]= useState(false)
  useEffect(()=>{
    const unsubscribe = navigation.addListener("focus", async ()=>{
      const result = await pickImage();
      navigation.navigate("contacts", {image: result});
      if(result.cancelled){
        setCancelled(true);
        setTimeout(()=> navigation.navigate("chats"), 100)
      }
    });
    return ()=> unsubscribe()
  }, [navigation, cancelled])
  return (
    <View>
      <Text>Photo</Text>
    </View>
  )
}

export default Photo

const styles = StyleSheet.create({})