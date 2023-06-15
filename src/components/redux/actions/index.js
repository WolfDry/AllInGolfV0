import { auth, db } from "../../../../firebase";
import { doc, getDoc, collection, query, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, CLEAR_DATA } from "../constants";

export function clearData(){
    return ((dispatch)=>{
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser(){
    return(async (dispatch) => {
        const docRef = doc(db, "users", auth.currentUser.uid)
        await getDoc(docRef)
        .then((snapshot)=>{
            if(snapshot.exists()){
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }else{
                console.log('does not exist')
            }
        })
    })
}

export function fetchUserPosts(){
    return(async (dispatch) => {
        const q = query(collection(db, "posts", auth.currentUser.uid, 'userPosts'), orderBy("creation", "asc"));

        await getDocs(q)
        .then((snapshot)=>{
            let posts = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {id, ...data}
            })
            dispatch({type: USER_POSTS_STATE_CHANGE, posts: posts})
        })
    })
}

export function fetchUserFollowing(){
    console.log('fetchUserFollowing')
    return(async (dispatch) => {
        const q = onSnapshot(collection(db, 'following', auth.currentUser.uid, 'userFollowing'), (snapshot) => {
            let following = snapshot.docs.map( doc => {
                const id = doc.id
                return id
            })
            dispatch({type: USER_FOLLOWING_STATE_CHANGE, following: following})
            for (let i = 0; i < following.length; i++) {
                dispatch(fetchUsersData(following[i]))
            }
        })
    })
}

export function fetchUsersData(uid){
    console.log('fetchUsersData()')
    return(async (dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid)
        if(!found){
            const docRef = doc(db, "users", uid)
            await getDoc(docRef)
            .then((snapshot)=>{
                if(snapshot.exists()){
                    let user = snapshot.data()
                    user.uid = snapshot.id
                    dispatch({type: USERS_DATA_STATE_CHANGE, user})
                    console.log('call fetchUserFollowingPosts')
                    dispatch(fetchUserFollowingPosts(user.uid))
                }else{
                    console.log('does not exist')
                }
            })
        }
    })
}

export function fetchUserFollowingPosts(uid){
    console.log('fetchUserFollowingPosts')
    return(async (dispatch, getState) => {
        const q = query(collection(db, "posts", uid, 'userPosts'), orderBy("creation", "desc"));

        await getDocs(q)
        .then((snapshot)=>{

            const user = getState().usersState.users.find(el => el.uid === uid)

            let posts = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {id, ...data, user}
            })
            dispatch({type: USERS_POSTS_STATE_CHANGE, posts: posts, uid})
        })
    })
}