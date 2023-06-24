import React, { useState } from 'react'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'
import globalStyles from '../../../const/globalStyle'
import COLORS from '../../../const/colors'
import Inputs from '../../form/Inputs'
import { G, Path, Svg } from 'react-native-svg'
import { db} from '../../../../firebase'
import { collection, query, getDocs, where } from "firebase/firestore";
import User from './User'
import Friend from './Friend'



export default function SearchScreen({navigation}) {

    const [users, setUsers] = useState([])

    const fetchUsers = async (search) => {
        if(search !== ''){
            const docRef = query(collection(db, 'users'), where('pseudo', '>=', search))
            const querySnapshot = await getDocs(docRef)
            let users = querySnapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {id, ...data}
            })
            setUsers(users)
        }else{
            setUsers([])
        }
    }

    const user = [
        {
            pseudo: 'Tom'
        },
        {
            pseudo: 'Marina'
        },
    ]

  return (
    <View style={[globalStyles.center, globalStyles.fullScreen]}>
        <View style={[globalStyles.center, {flex: 0.3, flexDirection: 'row', paddingTop: '10%', paddingBottom: '5%', borderBottomWidth: 1,backgroundColor: COLORS.background , borderColor: COLORS.grey, zIndex: 9999 }]}>
            <View style={[globalStyles.center, { flex: 0.5 }]}>
                <Image style={{ width: 50, height: 50, borderRadius: 100 }} source={require('../../../../assets/img/logo-vert.jpg')} />
            </View>
            <View style={[globalStyles.center, globalStyles.fullScreen, {paddingRight: 20}]}>
                <Inputs
                    placeholder="Rechercher"
                    onChangeText={(search)=> fetchUsers(search)}
                    search
                />
            </View>
        </View>
        <View style={[globalStyles.center, globalStyles.fullScreen, {marginTop: 5}]}>
            <View style={{position: 'absolute'}}>       
                <Svg xmlns="http://www.w3.org/2000/svg" width="290" height="290" viewBox="0 0 269.562 285.988">
                    <G id="Titre_profil_page" data-name="Titre profil page" transform="translate(-60.219 8.349)">
                        <Path id="Tracé_143" data-name="Tracé 143" d="M92.328-19.663C143.313-59.15,282.758,65.311,188.991,81.346S120.068,146.133,81.079,150.39,6.967,139.5-4.335,81.346,41.343,19.823,92.328-19.663Z" transform="translate(105.72 48.641) rotate(14)" fill="#3e7b7a" opacity="0.19"/>
                        <Path id="Tracé_144" data-name="Tracé 144" d="M92.328-19.663C143.313-59.15,282.758,65.311,188.991,81.346S120.068,146.133,81.079,150.39,6.967,139.5-4.335,81.346,41.343,19.823,92.328-19.663Z" transform="translate(197.317 258.589) rotate(-121)" fill="#3e7b7a" opacity="0.25"/>
                    </G>
                </Svg>
            </View>
            <Image style={{width: 100, height: 100, borderRadius: 100/2, borderWidth: 2, borderColor: COLORS.white}} source={require('../../../../assets/img/logo-vert.jpg')}/>
            <Text style={[globalStyles.hongkongLight,{fontSize: 20}]}>
                Messages
            </Text>
        </View>
        <View style={{flex: 3, width: '100%', padding: 20}}>
            <Friend user={user[0]} lastChat={'Aller ça marche'}/>
            <Friend user={user[1]} lastChat={'A jeudi'}/>
            {users && 
            <View style={{backgroundColor: COLORS.grey, borderRadius: 5, padding: 10}}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={users}
                    renderItem={({ item }) => { 
                        return (
                        <TouchableOpacity onPress={()=> navigation.navigate('ProfileScreen', {uid: item.id})}>
                            <User user={item} />
                        </TouchableOpacity>
                        );
                    }}
                    />
            </View>
            }
        </View>
    </View>
  )
}
