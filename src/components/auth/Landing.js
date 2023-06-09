import React from 'react'
import { Text, StyleSheet, View, Pressable, Image, ImageBackground } from 'react-native'
import globalStyles from '../../../assets/globalStyle'

export default function Landing({navigation}) {
  return (
    <ImageBackground source={require('../../../assets/img/bg.jpg')} style={globalStyles.fullScreen}>
            <View style={[globalStyles.fullScreen, globalStyles.center]}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/img/logo-vert.jpg')}
                />
            </View>
            <View style={[globalStyles.fullScreen, globalStyles.center]}>
                <Text style={[globalStyles.title, globalStyles.white]}>All In Golf</Text>
            </View>
            <View style={[globalStyles.fullScreen, globalStyles.center]}>
                <View style={[globalStyles.fullScreen, globalStyles.center]}>
                    <Pressable style={[styles.button, globalStyles.center, { marginBottom: 15 }]} onPress={() => navigation.navigate('Login')}>
                        <Text style={[globalStyles.hongkong]}>
                            Se connecter
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.button, globalStyles.center]} onPress={() => navigation.navigate('Register')}>
                        <Text style={[globalStyles.hongkong]}>
                            Créer un compte
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
  )
}
const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    button: {
        width: '75%',
        backgroundColor: 'white',
        padding: '3%',
        borderRadius: 100,
    }
});
