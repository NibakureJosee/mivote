import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ImagePicker from 'expo-image-picker';

export default function UploadImage() {
  const [image, setImage] = useState(null);

  const addImage = () => {
    try {
      let _image = ImagePicker.launchImageLibraryAsync();

      console.log(JSON.stringify(_image));

      if (!_image.cancelled) {
        setImage(_image.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log('Media Permissions are granted');
    }
  };
  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? 'Edit' : 'Upload'} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 50,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
