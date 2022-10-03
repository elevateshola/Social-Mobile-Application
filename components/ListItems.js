import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import GlobalContext from '../context/Context'
import {Grid} from 'react-native-easy-grid'
import  Avatar from "./Avatar"


const ListItems = ({
    type, description,
    user, style, time, room, image
}) => {
    const {theme:{colors}}= useContext(GlobalContext)
    const navigation = useNavigation()
  return (
    <TouchableOpacity style={{height:80, ...style}}
    onPress={()=>navigation.navigate("chat", {user, image, room})}
    >
       <Grid style={{maxHeight: 80}}>
            <col style={{width:80, alignItems:"center", justifyContent:"center"}}>
                <Avatar user={user} size={type === "contacts" ? 40 : 65} />
            </col>
            <col style={{marginLeft: 10}}>
                <Row style={{alignItems:"center"}}>
                    <col>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:16, color: colors.text
                        }}>
                            {user.contactName || user.displayName}
                        </Text>
                    </col>
                        {time && (
                            <col style={{alignItems: "flex-end"}}>
                                <Text>{new Date(time.seconds * 1000).toLocaleString()}</Text>
                            </col>
                        )}
                </Row>
                {description && (
                    <Row style={{marginTop:-5}}>
                        <Text style={{color:colors.secondaryText, fontSize:13}}>{description}</Text>
                    </Row>
                )}
            </col>
       </Grid>
    </TouchableOpacity>
  )
}

export default ListItems

const styles = StyleSheet.create({})