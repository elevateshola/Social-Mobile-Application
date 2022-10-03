import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { useAssets} from 'expo-asset';
import React, {useState, useEffect, useContext} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import ContextWrapper from './context/ContextWrapper';
import Context from './context/Context'
import Profile from './screens/Profile';
import Chats from './screens/Chats';
import Chat from './screens/Chat';
import ChatHeader from './components/ChatHeader';
import Contacts from './screens/Contacts';
import  { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Ionicons } from '@expo/vector-icons';


export  function App() {
  const [currUser, setCurrUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const {theme:{colors}}= useContext(Context)

  LogBox.ignoreLogs([
    "Setting a timer",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release"
  ]);

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      setLoading(false)
      if(user){
        setCurrUser(user)
      }
    } )
    return ()=> unsubscribe()
  }, [])

  if(loading){
    return <Text>Loading...</Text>
  }
  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='signIn'component={SignIn} />
        </Stack.Navigator>)
       : (
        <Stack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor: colors.foreground,
            shadowOpacity: 0,
            elevation:0
          },
          headerTintColor:colors.white
        
        }}>
         {!currUser.displayName && (
           <Stack.Screen name='profile' component={Profile}
           options={{headerShown: false}}
           />
         )}
         <Stack.Screen name='home' component={Home}
         options={{title: "Real Social Room"}}
         />
         <Stack.Screen name='contacts' 
         options={{title: "select contacts"}} 
         component={Contacts}/>
         <Stack.Screen name='chat' component={Chat} 
          options={{headerTitle: (props)=> <ChatHeader {...props}/>}} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const Home = ()=>{
  const {theme:{colors}} = useContext(Context)
  return (
    <Tab.Navigator screenOptions={({route})=>{
      return {
        tabBarLabel : () => {
          if (route.name === 'photo'){
            return <Ionicons name='camera' size={20} color={colors.white}/>
          }else{
            return(
              <Text style={{color:colors.white}}>
                {route.name.toLocaleUpperCase()}
              </Text>
            )
          }
        },
        tabBarShownIcon : true,
        tabBarIndicatorStyle: {
          backgroundColor: colors.white
        },
        tabBarStyle: colors.foreground
      }
    } 
    
  }
   initialRouteName = "chats"
   >
      <Tab.Screen name='photo' component={Photo} />
      <Tab.Screen name='chats' component={Chats} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Main = () => {
  const [assets] = useAssets(
    require('./assets/icon.png')
  )
  if(!assets){
    return <Text>Loading...</Text>
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  )
}

export default Main