import React from 'react'
import { View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../const/colors';
import globalStyles from '../../const/globalStyle';

export default function Add({navigation}) {
  return (
    <View style={{position: 'absolute', bottom: 70, right: 20, backgroundColor: COLORS.lightGreen, borderRadius: 100, width: 50, height: 50, zIndex: 99999}}>
        <Pressable style={[globalStyles.center, globalStyles.fullScreen]} onPress={()=>{navigation.navigate('AddScreen')}}>
            <View style={[globalStyles.center, globalStyles.fullScreen]}>
            <Icon name={"add-outline"} style={{color:COLORS.white, fontSize:35}} />
            </View>
        </Pressable>
    </View>
  )
}
