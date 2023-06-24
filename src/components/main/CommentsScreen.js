import React, { useEffect, useState } from 'react'
import { View, Image, Text, Pressable, FlatList, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import globalStyles from '../../const/globalStyle'
import COLORS from '../../const/colors'
import {auth, db} from '../../../firebase'
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import Button from '../form/Button'
import { strRandom } from '../../services/RandomService'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../redux/actions'

function CommentsScreen(props) {

    const [isPress, setIsPress] = useState(false)
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(()=>{

        function matchUserToComments(comments){
            for (let i = 0; i < comments.length; i++) {

                if(comments[i].hasOwnProperty('user')){
                    continue
                }
                const user = props.users.find(x => x.uid === comments[i].creator)
                if(user == undefined){
                    props.fetchUsersData(comments[i].creator, false)
                }else{
                    comments[i].user = user
                }
            }
            setComments(comments)
        }

        const getComments = async () => {
            const q = query(collection(db, "posts", props.route.params.uid, 'userPosts', props.route.params.postId, "comments"));

            await getDocs(q)
            .then((snapshot)=>{
                let comments = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return {id, ...data}
                })
                matchUserToComments(comments)
            })
        }

        if(props.route.params.postId != postId){
            getComments()
            setPostId(props.route.params.postId)
        }else{
            matchUserToComments(comments)
        }

    }, [props.route.params.postId, props.users])

    let listComments = comments.map(comment => {
        return(
            <View style={{flex: 1, flexDirection: 'row', marginHorizontal: '3%' }} key={comment.id}>
                {comment.user && 
                <Text style={{ fontWeight: 'bold' }}>{comment.user.pseudo} : </Text>
                }
                <Text>{comment.text}</Text>
            </View>
        )
    })

    const onCommentSend = async () => {
        const random = strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: 25,
            startsWithLowerCase: true
        });
        await setDoc(doc(db,"posts", props.route.params.uid, 'userPosts', props.route.params.postId, "comments", random),{
            creator: auth.currentUser.uid,
            text: text
        })
    }
    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', paddingTop: '11%', paddingBottom: '3%', paddingHorizontal: '5%', borderBottomWidth: 1, borderColor: COLORS.grey }}>
                <Icon onPress={()=>props.navigation.popToTop()} style={{fontSize: 32, color: COLORS.lightGreen}} name="arrow-back-outline" />
            </View>
            <View style={globalStyles.fullScreen}>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: '3%', paddingHorizontal: '7%'}}>
                    <Image style={{width: 70, height: 70, borderRadius: 70/2}} source={require('../../../assets/img/logo-vert.jpg')}/>
                    <Text style={[globalStyles.hongkongLight, {marginLeft: 10}]}>
                        Tarpinho69
                    </Text>
                </View>
                <Image source={require('../../../assets/img/post.png')}/>
                <View style={{ flexDirection: "row" }}>
                    <Pressable style={{ marginVertical: 10, marginLeft: '5%', }} onPress={() => { setIsPress(!isPress) }}>
                        <Icon
                            style={{ fontSize: 26, color: isPress ? COLORS.lightRed : COLORS.black }}
                            name={"heart"} />
                    </Pressable>
                    <Icon style={{ fontSize: 26, marginVertical: 10, marginLeft: '5%' }} name={"chatbubble-outline"} />
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: '3%' }}>
                    <Text style={{ fontWeight: 'bold' }}>Tarpinho69 : </Text>
                    <Text>Petite session de golf</Text>
                </View>
                <View style={{flex: 1}}>
                    <TextInput
                    placeholder='Ajouter un commentaire'
                    onChangeText={(text)=> setText(text)}
                    />
                    <Button title={'Ajouter'} type={'primary'} onPress={onCommentSend}/>
                </View>
                <View style={{flex: 1}}>
                    {comments && listComments}
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (store)=>({
    users: store.usersState.users
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUsersData}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen)