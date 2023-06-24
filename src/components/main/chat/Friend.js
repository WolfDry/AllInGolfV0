import React, { useState } from 'react'
import { View, Image, Text, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../../../const/colors';

export default function Friend({lastChat, user}) {

    const [isPress, setIsPress] = useState(false)
    
    const chemin = '../../../../assets/img/logo-vert.jpg';
    const moduleRequis = require(chemin);


  return (
    <View style={[{flexDirection: 'row',justifyContent: 'center', width: '100%', height: 70, marginVertical: 5}]}>
        <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 50, height: 50, borderRadius: 50/2}} source={moduleRequis}/>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold'}}>{user.pseudo}</Text>
            <Text>{lastChat}</Text>
        </View>
        <View style={isPress == true ? styles.deleteBtnPress : styles.deleteBtn}>
            <Pressable style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>setIsPress(!isPress)}>
                <Icon style={{fontSize: 24}} name="trash-alt"/>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    deleteBtn:{
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.transparent,
    },
    deleteBtnPress:{
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.red,
    },
})
