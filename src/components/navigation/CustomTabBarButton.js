import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../const/colors'

export function CustomTabBarButton(props) {
    const { children, accessibilityState, onPress } = props

    if (accessibilityState.selected) {
        return (
            <View style={styles.btnWrapper}>
                <TouchableOpacity onPress={onPress} style={styles.activeBtn}>
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity onPress={onPress} style={styles.inactiveBtn}>
                {children}
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    btnWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    activeBtn: {
        flex: 1,
        position: 'absolute',
        top: -22,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: COLORS.green,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
    },
    inactiveBtn: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});