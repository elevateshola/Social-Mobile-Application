import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { theme } from '../utils'
import Context from './Context'
const ContextWrapper = ({children}) => {
  const [rooms, setRooms] = useState()
  return (
    <Context.Provider value={{theme, rooms, setRooms}}>
        {children}
    </Context.Provider>
  )
}

export default ContextWrapper;

const styles = StyleSheet.create({})