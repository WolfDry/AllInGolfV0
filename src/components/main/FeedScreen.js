import { useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import globalStyles from "../../const/globalStyle"
import Inputs from '../form/Inputs'
import Post from '../feed/Post';
import COLORS from '../../const/colors';
import Add from '../feed/Add';
import { connect } from "react-redux";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../redux/actions'

function FeedScreen(props) {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        function matchUserToComments(posts){
            for (let i = 0; i < posts.length; i++) {
                if(posts[i].comments !== undefined){
                    const post = posts[i]
                    for (let y = 0; y < post.comments.length; y++) {
                        const comment = post.comments[y];
                        if(comment.hasOwnProperty('user')){
                            continue
                        }
                        const user = props.users.find(x => x.uid === comment.creator)
                        if(user == undefined){
                            props.fetchUsersData(comment.creator, false)
                        }else{
                            comment.user = user
                        }
                    }
                }
                setPosts(posts)
            }
        }

        const getComments = async (posts) => {
            for (let i = 0; i < posts.length; i++) {
                const q = query(collection(db, "posts", posts[i].user.uid, 'userPosts', posts[i].id, "comments"));
    
                await getDocs(q)
                .then((snapshot)=>{
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return {id, ...data}
                    })
                    posts[i].comments = comments
                    matchUserToComments(posts)
                })
            }
        }

        let posts = []
        if(props.usersFollowingLoaded == props.following.length){
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find(el => el.uid === props.following[i])
                if(user != undefined){
                    posts = [...posts, ...user.posts]
                }
            }

            getComments(posts)
        }
    }, [props.usersFollowingLoaded])
    
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
                            <Post userName={item.user.pseudo} bio={item.caption} initialComments={item.comments} img={item.downloadURL} postId={item.id} userId={item.user.uid} navigation={props.navigation}/>
                        )}
                    />
                    }
                </View>
            </View>
        </>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUsersData}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)  