import { useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import globalStyles from "../../const/globalStyle"
import Inputs from '../form/Inputs'
import Post from '../feed/Post';
import COLORS from '../../const/colors';
import Add from '../feed/Add';
import { connect } from "react-redux";

function FeedScreen(props) {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        let posts = []
        if(props.usersLoaded == props.following.length){
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find(el => el.uid === props.following[i])
                if(user != undefined){
                    posts = [...posts, ...user.posts]
                }
            }

            posts.sort(function(x,y){
                return x.creation - y.creation
            })

            setPosts(posts)
        }
    }, [props.usersLoaded])
    
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
            <Add navigation={props.navigation}/>
            <View style={[globalStyles.center, globalStyles.fullScreen]}>
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
                <View style={[globalStyles.center,{ flex: 6, marginBottom: 90, width: '100%' }]}>
                    {posts && 
                    <FlatList
                        style={globalStyles.fullScreen}
                        numColumns={1}
                        horizontal={false}
                        data={posts}
                        renderItem={({item}) => (
                            <Post userName={item.user.pseudo} bio={item.caption} initialComments={comments} img={item.downloadURL}/>
                        )}
                    />
                    }
                    {/* <Post userName={"Tarpinho69"} bio={"Petite session golf"} initialComments={comments} img={'post.png'} />
                    <Post userName={"Tarpinho69"} bio={"Petite session golf"} initialComments={comments} />
                    <Post userName={"Tarpinho69"} bio={"Petite session golf"} initialComments={comments} /> */}
                </View>
            </View>
        </>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded,
})

export default connect(mapStateToProps, null)(FeedScreen)  