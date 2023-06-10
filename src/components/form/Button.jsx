import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import globalStyles from '../../const/globalStyle'
import COLORS from '../../const/colors'

export default function Button({ title, onPress = () => { } }) {
    return (
        <TouchableHighlight onPress={onPress} style={styles.button} underlayColor={COLORS.lightGreen} activeOpacity={0.8}>
            <Text style={[globalStyles.white, globalStyles.hongkong]}>
                {title}
            </Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        padding: 15,
        backgroundColor: COLORS.green,
        borderRadius: 100,
    }
})