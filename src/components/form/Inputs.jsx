import { useState } from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../const/globalStyle';
import { StyleSheet } from 'react-native'
import COLORS from '../../const/colors';

export default function Inputs({ placeholder, error, password, search, onFocus = () => { }, ...props }) {
    const [isFocused, setIsFocused] = useState(false)
    const [hidePassword, setHidePassword] = useState(password)
    return (
        <View style={styles.inputsContainer}>
            <View style={[globalStyles.fullScreen, globalStyles.center, styles.inputContainer]}>
                {search && (
                    <Icon
                        style={{ fontSize: 22, marginRight: 5 }}
                        name={"search"} />
                )}
                <TextInput
                    {...props}
                    secureTextEntry={hidePassword}
                    placeholder={error ? error : placeholder}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus()
                        setIsFocused(true)
                    }}

                    onBlur={() => {
                        setIsFocused(false)
                    }}
                    placeholderTextColor={
                        error
                            ? COLORS.red
                            : isFocused
                                ? COLORS.grey
                                : COLORS.black
                    }
                    style={[globalStyles.hongkong, styles.input,]}
                />
                {password && (
                    <Icon
                        onPress={() => {
                            setHidePassword(!hidePassword)
                        }}
                        style={{ fontSize: 22 }}
                        name={hidePassword ? "eye-outline" : "eye-off-outline"} />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputsContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        width: '65%',
        margin: '2%',
        padding: '3%',
        borderRadius: 10,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
})