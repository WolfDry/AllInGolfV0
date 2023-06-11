import React from 'react'
import { View, Text, Pressable } from 'react-native'

export default function Feed({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable onPress={() => navigation.navigate('badgeScreen')}>
          <Text>
              Se connecter
          </Text>
      </Pressable>
    </View>
  )
}
