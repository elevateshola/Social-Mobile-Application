import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { auth, db } from '../firebase'
import GlobalContext from '../context/Context'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import ContactsFloatingIcon from '../components/ContactsFloatingIcon'
import ListItems from '../components/ListItems'
import useContacts from '../hooks/useHooks'
const Chats = () => {
  const {currentUser} = auth
  const {rooms, setRooms} = useContext(GlobalContext)
  const contacts = useContacts()

  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantArray", "array-contains", currentUser.email)
  )

  useEffect(()=>{
    const unsubscribe = onSnapshot(chatsQuery, (querrSnapshot)=>{
      const parsedChats = querrSnapshot.docs
      .filter(doc=> doc.data().lastMessage)
      .map(()=>({
        ...doc.data(),
        id: doc.id,
        userB : doc.data().participants.find((p)=> p.email !== currentUser.email),
      }));
      setRooms(parsedChats)
    });
    return unsubscribe()
  }, []);

  const getUserB =(user, contacts)=>{
    const userContact = contacts.find((seen)=>seen.email === user.email);
    if(userContact && userContact.contactName){
      return{...user, contactName: userContact.contactName};
    }
    return user;
  }
    return(
    <View style={{flex:1, padding:5, paddingRight: 10}}>
      {rooms.map((room)=><ListItems type="chat" description={room.lastMessage.text} 
        key={room.id} room={room} time={chatsQuery.lastMessage.creadAt}
        user={getUserB(room.userB, contacts)}
      />)}
      <ContactsFloatingIcon/>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({})