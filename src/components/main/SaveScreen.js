import React, { useState } from 'react'
import { View, Image } from 'react-native'
import Inputs from '../form/Inputs'
import Button from '../form/Button'
import globalStyles from '../../const/globalStyle'
import { auth, db } from '../../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore';
import { strRandom } from '../../services/RandomService'

export default function SaveScreen(props) {

    const [caption, setCaption] = useState("")
    const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`

    const uploadImage = async () => {
        const uri = props.route.params.image
        const response = await fetch(uri)
        const blob = await response.blob()

        const storage = getStorage()
        const storageRef = ref(storage, childPath)

        const uploadTask = uploadBytesResumable(storageRef, blob);


        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                    console.log('Upload is paused');
                    break;
                    case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log('User don\'t have the permission to access the object')
                    break;
                    case 'storage/canceled':
                    // User canceled the upload
                    console.log('User canceled the upload')
                    break;
                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    console.log('Error Serveur')
                    break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    savePostData(downloadURL)
                    console.log('File available at', downloadURL);
                });
            }
        );

    }

    const savePostData = async (downloadURL) => {
        console.log(caption)
        const currentTime = new Date 
        const random = strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: 25,
            startsWithLowerCase: true
          });
        await setDoc(doc(db,'posts', auth.currentUser.uid,'userPosts', random),{
            downloadURL: downloadURL,
            caption: caption,
            creation: currentTime
        }).then((function (){
            props.navigation.popToTop()
        }))
    }

    const handleOnChange = (text) => {
        setCaption(text)
    }

  return (
    <View style={[globalStyles.fullScreen, globalStyles.center]}>
        <Image style={{flex: 1}} source={{uri: props.route.params.image}}/>
        <Inputs placeholder="Titre" onChangeText={text => handleOnChange(text)}/>
        <Button title={'Sauvegarder'} onPress={()=>uploadImage()}/>
    </View>
  )
}
