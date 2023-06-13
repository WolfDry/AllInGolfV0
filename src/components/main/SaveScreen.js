import React, { useState } from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import Inputs from '../form/Inputs'
import Button from '../form/Button'
import globalStyles from '../../const/globalStyle'
import COLORS from '../../const/colors'
import { strRandom } from '../../services/RandomService'
import { auth, db } from '../../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { G, Path, Svg } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Ionicons'

export default function SaveScreen({navigation}) {

    const [caption, setCaption] = useState("")
    const [image, setImage] = useState("")
    const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`


    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            aspect: [1,1],
            quality: 1
        })

        if(!result.canceled){
            setImage(result.assets[0].uri)
        }
    }

    const cancelImage = () => {
        setImage(null)
    }

    const uploadImage = async () => {
        console.log(image)
        const uri = image
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
        // console.log(caption)
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
            navigation.popToTop()
        }))
    }

    const handleOnChange = (text) => {
        setCaption(text)
    }

  return (
    <View style={[globalStyles.fullScreen, globalStyles.center]}>
        <View style={[globalStyles.center, { flex: 0.5, width: '100%', flexDirection: 'row', paddingTop: '10%', paddingBottom: '5%', borderBottomWidth: 1, borderColor: COLORS.grey }]}>
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
        <View style={[globalStyles.center, {flex: 1, width: '100%'}]}>
            <View style={{position: 'absolute'}}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="330.75" height="182.319" viewBox="0 0 330.75 182.319">
                    <G id="Groupe_123" data-name="Groupe 123" transform="translate(-42.499 -42.435)">
                        <Path id="Tracé_143" data-name="Tracé 143" d="M116.358-22.846C179.831-46.009,353.431,27,236.7,36.408s-85.8,38.005-134.342,40.5S10.09,70.522-3.98,36.408,52.885.318,116.358-22.846Z" transform="translate(98.72 82.948) rotate(14)" fill="#3e7b7a" opacity="0.19"/>
                        <Path id="Tracé_144" data-name="Tracé 144" d="M37.622-14.9C60.178-78.835,121.87,122.7,80.386,148.666s-30.492,104.908-47.741,111.8S-.142,242.831-5.143,148.666,15.066,49.044,37.622-14.9Z" transform="matrix(-0.259, -0.966, 0.966, -0.259, 93.36, 201.308)" fill="#3e7b7a" opacity="0.25"/>
                    </G>
                </Svg>
            </View>
            <Text style={[globalStyles.hongkongLight,{fontSize: 18}]}>
                Ajouter une publication
            </Text>
        </View>
        <View style={[globalStyles.center, {flex: 4, width: '100%', marginBottom: 25}]}>
            <View style={[globalStyles.fullScreen, globalStyles.center, {borderWidth: 1, borderColor: COLORS.grey}]}>
                {image &&
                    <Image source={{uri: image}} style={{aspectRatio: 1/1, width: '100%'}}/>
                }
                <Pressable style={[globalStyles.fullScreen, globalStyles.center]} onPress={()=>{pickImage()}}>
                    <Icon name={'add-circle'} style={[globalStyles.center,{fontSize: 70, color: COLORS.lightGreen}]}/>
                    <Text style={globalStyles.hongkongLight}>
                        Choisir une photo
                    </Text>
                </Pressable>
            </View>
            <View style={{height: 80, width: '100%'}}>
                <Inputs placeholder="Ajouter une légende ..." onChangeText={text => handleOnChange(text)}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingVertical: 30}}>
                <View style={{width: '35%'}}>
                    <Button title={'Annuler'} type={'secondary'} icon={'close'} color={COLORS.lightGreen} onPress={()=>cancelImage()}/>
                </View>
                <View style={{width: '35%'}}>
                    <Button title={'Publier'}  type={'primary'} icon={'check'} color={COLORS.lightGreen} onPress={()=>uploadImage()}/>
                </View>
            </View>
        </View>
    </View>
  )
}
