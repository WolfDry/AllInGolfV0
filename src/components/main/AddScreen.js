import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddScreen({navigation}) {
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [permission, requestPermission] = Camera.useCameraPermissions();
  
    if (!permission) {
      return <View></View>;
    }
  
    if (!permission.granted) {
      return <Text>Aucun accès à la caméra</Text>;
    }
  
    function toggleCameraType() {
      setType((current) =>
        current === CameraType.back ? CameraType.front : CameraType.back
      );
    }

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            setImage(data.uri)
        }
    }

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
  
    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Camera
          ref={ref=>setCamera(ref)}
          style={styles.fixedRatioContainer}
          type={type} />
        </View>
          <Button
            style={styles.button}
            onPress={toggleCameraType}
            title="Changer de caméra"
            />
            <Button
            title='Prendre une photo'
            onPress={()=>{takePicture()}}/>
            <Button
            title='Choisir une photo dans la galerie'
            onPress={()=>{pickImage()}}/>
            <Button
            title='Sauvegarder'
            onPress={()=>{navigation.navigate('SaveScreen', {image})}}/>
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cameraContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    fixedRatioContainer: {
      flex: 1,
      aspectRatio: 1,
    },
  });
  