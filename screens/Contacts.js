import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import useContacts from '../hooks/useHooks'
import GlobalContext from '../context/Context'
import { onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import ListItems from '../components/ListItems'
import { useRoute } from '@react-navigation/native'

const Contacts = () => {
    const contacts = useContacts()
    const route = useRoute();
    const image = route.params && route.params.image
  return (
    <FlatList 
    style={{flex:1, padding:10, }}
    data={contacts}
    keyExtractor={(_, i)=>i}
    renderItem={({item})=> <ContactPreview contact={item} image={image} />}
    ></FlatList>
  )
}

const ContactPreview =({contact, image})=>{
    const {rooms}= useContext(GlobalContext)
    const [user, setUser]= useState(contact)

    useEffect(()=>{
        const qwerry = query(
            collection(db, "users"),
            where("email", "==", contact.email)
        )
        const unsubscribe= onSnapshot(qwerry, snapShot => {
            if(snapShot.docs.length){
                const userDoc = snapShot.docs[0].data()
                setUser((prevUser)=>({...prevUser, userDoc}))
            }
        })
        return () => unsubscribe()
    }, [])
    return <ListItems
      style={{marginTop:7}}  
      type="contacts"
      user={user}
      image={image}
      room={rooms.find(room=> room.participantsArray.includes(contact.email))}
    />
}

export default Contacts

const styles = StyleSheet.create({})