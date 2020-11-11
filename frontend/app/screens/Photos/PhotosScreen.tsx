import React, { useState } from "react";
import { View, SafeAreaView, } from "react-native";
import { Button, Text } from "../../components";
import navigationOptions from "./PhotosScreen.navigationOptions";
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

import Loader from "../../components/Loader";
import PhotoList from "./PhotoList";



const PhotosScreen = (props) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUploadedImage, setLastUploadedImage] = useState([])


  async function uploadImageAsync(uri) {
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(`Vapour/${9999999999999 - Date.now()}`);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL()
  }

  const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  };

  const _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  };

  const _handleImagePicked = async pickerResult => {
    try {
      // this.setState({ uploading: true });
      setIsLoading(true)
      if (!pickerResult.cancelled) {
        setLastUploadedImage([{ imgURL: pickerResult.uri, isUploaded: false }])
        let uploadImageObject = await uploadImageAsync(pickerResult.uri);
        setLastUploadedImage([uploadImageObject])
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  };

  if (isLoading)
    return <Loader isShow={true} />
  else
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: "3%",
        }}
      >
        <View style={{ flex: 1 }}>

          <View style={{ flex: 11 }}>
            <PhotoList />
          </View>

          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
            <View style={{ width: '49%', marginTop: 5 }}>
              <Button.Primary
                textType={"Primary"}
                onPress={_takePhoto}
              >
                <Text.Secondary bold center white style={{ fontSize: 13 }}>
                  Take Photo
                </Text.Secondary>
              </Button.Primary>
            </View>
            <View style={{ width: '49%', marginTop: 5 }}>
              <Button.Primary
                textType={"Primary"}
                onPress={_pickImage}
              >
                <Text.Secondary bold center white style={{ fontSize: 13 }}>
                  Choose Photo
                </Text.Secondary>
              </Button.Primary>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
};

PhotosScreen.navigationOptions = navigationOptions;

export default PhotosScreen;