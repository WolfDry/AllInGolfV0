import { View, Image, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../const/globalStyle';
import COLORS from '../../const/colors';
import { useState } from 'react';

export default function Post({ userName, bio, initialComments, img }) {

    const [isPress, setIsPress] = useState(false)

    const listComments = initialComments.map(commentInfo => {
        return (
            <View key={commentInfo.id} style={{ flexDirection: 'row', marginHorizontal: '5%' }}>
                <Text style={{ fontWeight: 'bold' }}>{commentInfo.userName} : </Text>
                <Text>{commentInfo.content}</Text>
            </View>
        )
    })

    return (
        <View style={[globalStyles.fullScreen]}>
            <View style={[globalStyles.center, globalStyles.fullScreen]}>
                <View style={[globalStyles.fullScreen, { flexDirection: 'row', paddingVertical: '4%' }]}>
                    <View style={{ justifyContent: 'center', padding: '3%' }}>
                        <Image style={{ width: 50, height: 50, borderRadius: 100 }} source={require('../../../assets/img/logo-vert.jpg')} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text>{userName}</Text>
                    </View>
                </View>
                <View style={[globalStyles.center, { flex: 1, width: '100%', height: 325, borderWidth: 1 }]}>
                    <Image style={{ width: '100%', height: '100%' }} source={{uri: img}} />
                </View>
            </View>
            <View style={[globalStyles.fullScreen, { flexDirection: "row" }]}>
                <Pressable style={{ marginVertical: 10, marginLeft: '5%', }} onPress={() => { setIsPress(!isPress) }}>
                    <Icon
                        style={{ fontSize: 26, color: isPress ? COLORS.lightRed : COLORS.black }}
                        name={"heart"} />
                </Pressable>
                <Icon style={{ fontSize: 26, marginVertical: 10, marginLeft: '5%' }} name={"chatbubble-outline"} />
            </View>
            <View style={[globalStyles.fullScreen]}>
                <View style={{ flexDirection: 'row', marginHorizontal: '5%' }}>
                    <Text style={{ fontWeight: 'bold' }}>{userName} : </Text>
                    <Text>{bio}</Text>
                </View>
                <Text style={{ marginLeft: '5%', marginVertical: '1%' }}>Voir tous les commentaires</Text>
                <View>
                    {listComments}
                </View>
            </View>
        </View>
    )
}
