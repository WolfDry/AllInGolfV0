import { auth, db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { USER_STATE_CHANGE } from "../constants";

export function fetchUser(){
    return(async (dispatch) => {
        const docRef = doc(db, "users", auth.currentUser.uid)
        await getDoc(docRef)
        .then((snapshot)=>{
            if(snapshot.exists()){
                console.log(snapshot.data())
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }else{
                console.log('does not exist')
            }
        })
    })
}