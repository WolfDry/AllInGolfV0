import { ScrollView, View, Image } from 'react-native';
import globalStyles from "../../const/globalStyle"
import Inputs from '../form/Inputs'
import Post from '../feed/Post';
import COLORS from '../../const/colors';
import Add from '../feed/Add';

export function FeedScreen({navigation}) {
    
    const comments = [
        {
            id: "155",
            content: "Joli coup",
            userName: "Tiger_wood"
        },
        {
            id: "151",
            content: "Jolie photo",
            userName: "Golfeur78"
        },
        {
            id: "1578",
            content: "Wow !!",
            userName: "Mel_g"
        },
    ]

    return (
        <>
            <Add navigation={navigation}/>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={globalStyles.center} bounces={false}>
                <View style={[globalStyles.center, globalStyles.fullScreen, { flexDirection: 'row', paddingTop: '10%', paddingBottom: '5%', borderBottomWidth: 1, borderColor: COLORS.grey }]}>
                    <View style={[globalStyles.center, { flex: 0.5 }]}>
                        <Image style={{ width: 50, height: 50, borderRadius: 100 }} source={require('../../../assets/img/logo-vert.jpg')} />
                    </View>
                    <View style={[globalStyles.center, globalStyles.fullScreen]}>
                        <Inputs
                            placeholder="Rechercher"
                            search
                        />
                    </View>
                </View>
                <View style={[globalStyles.center, globalStyles.fullScreen, { marginBottom: 90 }]}>
                    <Post userName={"Tarpinho69"} bio={"Petite session golf"} initialComments={comments} img={'post.png'} />
                    <Post userName={"Tarpinho69"} bio={"Petite session golf"} initialComments={comments} />
                    <Post userName={"Tarpinho69"} bio={"Petite session golf"} initialComments={comments} />
                </View>
            </ScrollView>
        </>
    );
}