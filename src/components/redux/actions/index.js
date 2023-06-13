import { auth, db } from "../../../../firebase";
import { doc, getDoc, collection, query, getDocs, orderBy } from "firebase/firestore";
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants";

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