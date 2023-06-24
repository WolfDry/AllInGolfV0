import React from 'react'
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native'
import Inputs from '../form/Inputs'
import COLORS from '../../const/colors'
import globalStyles from '../../const/globalStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function GameScreen() {
  return (
    <ScrollView style={{marginBottom: 50}}>
        <View style={[globalStyles.center, { flexDirection: 'row', paddingTop: '10%', paddingBottom: '5%', borderBottomWidth: 1, borderColor: COLORS.grey }]}>
            <View style={[globalStyles.center, { flex: 0.5 }]}>
                <Image style={{ width: 50, height: 50, borderRadius: 100 }} source={require('../../../assets/img/logo-vert.jpg')} />
            </View>
            <View style={[globalStyles.center, globalStyles.fullScreen, {paddingRight: 20}]}>
                <Inputs
                    placeholder="Rechercher"
                    search
                />
            </View>
        </View>
        <View style={[globalStyles.center, {padding: 20}]}>
            <Text style={[globalStyles.hongkongLight, {fontSize: 24}]}>
                Les parcours
            </Text>
        </View>
        <View style={[globalStyles.center, {padding: 20}]}>
            <View style={[styles.container,{justifyContent: 'center', alignItems: 'center', width: '80%', height: 450, padding: 20}]}>
                <Image style={{width: 250, height: 150, borderRadius: 30, margin: 10}} source={require('../../../assets/img/golf.jpg')}/>
                <Text style={[globalStyles.hongkong,{textAlign: 'center', margin: 10}]}>GOLF UGOLF Mionnay</Text>
                <Text style={[globalStyles.hongkongLight, {textAlign: 'center', margin: 10}]}>France</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', height: 25, width: '40%',}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star"/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'flex-end', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star"/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star"/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'flex-end', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star"/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star-o"/>
                    </View>
                </View>
            </View>
            <View style={[styles.container,{justifyContent: 'center', alignItems: 'center', width: '80%', height: 450, padding: 20, margin: 20}]}>
                <Image style={{width: 250, height: 150, borderRadius: 30, margin: 10}} source={require('../../../assets/img/golf.jpg')}/>
                <Text style={[globalStyles.hongkong,{textAlign: 'center', margin: 10}]}>GOLF UGOLF Mionnay</Text>
                <Text style={[globalStyles.hongkongLight, {textAlign: 'center', margin: 10}]}>France</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', height: 25, width: '40%',}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star"/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'flex-end', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star"/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star"/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'flex-end', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star"/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon style={{color: COLORS.yellow}} name="star-o"/>
                    </View>
                </View>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3
    },
    container: {
        backgroundColor: '#FFFFFF', // Couleur de fond de la boîte
        borderRadius: 8, // Optionnel : ajoutez un rayon de bordure si nécessaire
        elevation: 4, // Niveau de profondeur pour créer l'ombre
        shadowColor: '#000000', // Couleur de l'ombre
        shadowOpacity: 0.25, // Opacité de l'ombre
        shadowOffset: {
          width: 0, // Décalage horizontal de l'ombre
          height: 2, // Décalage vertical de l'ombre
        },
        shadowRadius: 4, // Rayon de l'ombre
      },
})
