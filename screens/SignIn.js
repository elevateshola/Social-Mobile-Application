import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Context from '../context/Context'
import { signIn, signUp } from '../firebase'


const SignIn = () => {
  const {theme:{colors}}= useContext(Context)  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signUp')

  const handlePress = async () =>{
      if(mode === 'signUp'){
        await signUp(email, password)
      }
      if(mode === 'signIn'){
        await signIn(email, password)
      }
  }

  return (
    <View style={{
      flex:1, justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.white}}>
      <Text
      style={{color:colors.foreground, fontSize:24, marginBottom:20}}
      >Welcome to Real Chat</Text>
      <Image source={require('../assets/welcome-img.png')}
        resizeMode='cover'
        style={{width:180, height:180}}
      />
      <View style={{marginTop:20}}>
        <TextInput placeholder='Email' 
        value={email}
        onChangeText={setEmail}
        style={{
          borderBottomColor:colors.primary,
          borderBottomWidth:2,
          width:200,
          
        }}/>
         <TextInput placeholder='Password'
         secureTextEntry={true}
         value={password}
         onChangeText={setPassword}
         style={{
          borderBottomColor:colors.primary,
          borderBottomWidth:2,
          width:200,
          marginTop:20
        }}/>
        <View style={{marginTop:20}}>
          <Button title={mode === 'signUp' ? 'Sign Up' : 'Log in'} 
          color={colors.secondary}
          disabled={!password || !email}
          onPress={handlePress}
          />
        </View>
        <TouchableOpacity 
        style={{marginTop: 15}}
        onPress={()=>mode === 'signUp'? setMode('signIn') : setMode('signUp')}
        >
          <Text>
            {mode === 'signUp' ? 'Already have an account ? Sign in'
            : 'Dont have an account ? Sipn up'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})