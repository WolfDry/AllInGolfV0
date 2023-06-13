import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import globalStyles from '../../const/globalStyle'
import COLORS from '../../const/colors'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Button({ title, type, icon, onPress = () => { } }) {

    let background
    if(type == 'primary')
        background = true
    if(type == 'secondary')
        background = false

    return (
        <TouchableHighlight
        onPress={onPress}
        style={
            background
                ? styles.primary
                : styles.secondary
        }
        underlayColor={COLORS.lightGreen}
        activeOpacity={0.8}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
                <Text style={
                    background
                        ? styles.primaryText
                        : styles.secondaryText
                }>
                    {title}
                </Text>
                {icon && 
                    <Icon name={icon} style={
                        background
                            ? styles.primaryIcon
                            : styles.secondaryIcon
                    }/>
                }
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 100,
    },
    primary:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 100,
        backgroundColor: COLORS.green,
    },
    secondary: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.lightGreen,
    },
    primaryText:{
        width: '100%',
        textAlign: 'center',
        color: COLORS.white,
        fontFamily: 'HongKongLight'
    },
    secondaryText:{
        width: '100%',
        textAlign: 'center',
        color: COLORS.lightGreen,
        fontFamily: 'HongKongLight'
    },
    primaryIcon:{
        color: COLORS.white,
    },
    secondaryIcon: {
        color: COLORS.lightGreen
    },
})