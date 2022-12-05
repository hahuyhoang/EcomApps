import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Feather, EvilIcons } from "@expo/vector-icons";
import Inputs from "./Textinputs";
import Button from "./button";
import style from "../HomeScreen/Account/Profile/style"
import { Ionicons, Entypo, Octicons } from "react-native-vector-icons";
import styles from "../HomeScreen/Account/Profile/style";
import actions from "../redux/actions";
import { showError } from "../utils/helperFunction";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
export default function ModalImage(props) {
  const [showCamera, setShowCamera] = useState(false);
  let cameraRef = useRef();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [image, setImage] = useState(null);
  const closeModal = (bool) => {
    props.changeModalVisible(bool);
  };
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
        setImage(photo.uri);
      });
    };

    return (
      <View style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View className="justify-between flex-row h-24 bg-black w-full">
          <TouchableOpacity
            className="h-full w-20 justify-center items-center"
            onPress={sharePic}
          >
            <Ionicons name="ios-share-outline" size={30} color={"white"} />
          </TouchableOpacity>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity
              className="h-full w-20 justify-center items-center"
              onPress={savePhoto}
            >
              <Ionicons name="save" size={30} color={"white"} />
            </TouchableOpacity>
          ) : undefined}
          <TouchableOpacity
            className="h-full w-20 justify-center items-center"
            onPress={() => setPhoto(undefined)}
          >
            <Ionicons name="close-circle-sharp" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View>
      {showCamera ? (
        <Camera type={type} style={styles.container} ref={cameraRef}>
          <TouchableOpacity
            className="absolute left-10 bottom-16 "
            onPress={() => closeModal(false)}
          >
            <Ionicons name="close-outline" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePic} style={styles.buttonContainer}>
            <Entypo name="camera" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute right-10 bottom-16 ">
            <Octicons
              name="sync"
              size={26}
              color="white"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
          </TouchableOpacity>
        </Camera>
      ) : (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Upload Photo</Text>
            <Text className="pt-2 pb-2 mb-8 text-slate-400">
              Choose Your Profile Picture
            </Text>
            <Button
              buttonStyle={styles.btnCamera}
              title={"Take Photo"}
              textStyle={styles.text}
            />

            <Button
              onPress={() => setShowCamera(true)}
              buttonStyle={styles.btnCamera}
              title={"Choose From Library"}
              textStyle={styles.text}
            />

            <Button
              onPress={() => closeModal(false)}
              buttonStyle={styles.btnCamera}
              title={"Cancel"}
              textStyle={styles.text}
            />
          </View>
        </View>
      )}
    </View>
  );
}
