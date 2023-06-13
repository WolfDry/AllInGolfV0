import { View, Image, } from 'react-native';
import globalStyles from '../../const/globalStyle';
export default function Post({ uri }) {

    return (
        <>
            <View style={[globalStyles.center, globalStyles.fullScreen]}>
                <View style={[globalStyles.center, { flex: 1, width: '100%', height: 325, borderWidth: 1 }]}>
                    <Image style={{ width: '100%', height: '100%' }} source={require('../../../assets/img/post.png')} />
                </View>
            </View>
        </>
    )
}
