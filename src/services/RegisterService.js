import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth, db} from '../../firebase.js'
import { doc, setDoc } from 'firebase/firestore';

export function RegisterService(pseudo, email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        await setDoc(doc(db,'users', auth.currentUser.uid),{
            pseudo: pseudo,
            email: email
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
    });
}