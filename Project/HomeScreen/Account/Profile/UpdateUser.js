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
import Inputs from "../../../Components/Textinputs";
import Button from "../../../Components/button";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DatePicker from "react-native-datepicker";
import { Ionicons, Entypo, Octicons ,AntDesign} from "react-native-vector-icons";
import styles from "./style";
import actions from "../../../redux/actions";
import { showError } from "../../../utils/helperFunction";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";

export default function UpdateUser({ navigation }) {
  const [showCamera, setShowCamera] = useState(false);
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState("13-10-2000");
  const [isChecked, setChecked] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [state, setState] = useState({
    name: "",
    address: "",
    gender: isChecked,
    birthday: date,
  });
  const { name, gender, address, birthday } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));

  const userData = useSelector((state) => state.auth.userData);
  const user_id = userData.user.id;
  // console.log("user data in account screen",image );

  const submitInfoUser = async () => {
    setIsLoading(true);
    try {
      const res = await actions.update_user({
        user_id,
        name,
        gender,
        address,
        birthday,
      });
      setIsLoading(false);
      console.log("=>>>>>>>ssres", res);
      showMessage({
        message: "Submitted successfullyy",
        type: "success",
      });
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
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
        setShowCamera(false)
        setModalVisible(false)
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          {showCamera ? (
            <Camera type={type} style={styles.container} ref={cameraRef}>
              <TouchableOpacity  className="absolute left-10 bottom-16" onPress={() => setShowCamera(false)}>
                <AntDesign name="close" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePic}
                style={styles.buttonContainer}
              >
                <Entypo name="camera" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="absolute right-10 bottom-16 ">
                <Octicons
                  name="sync"
                  size={26}
                  color="green"
                  onPress={() => {
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back
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
                  onPress={() => setModalVisible(!modalVisible)}
                  buttonStyle={styles.btnCamera}
                  title={"Cancel"}
                  textStyle={styles.text}
                />
              </View>
            </View>
          )}
        </Modal>
        <View className="">
          <View
            style={styles.horizon}
            className=" items-center justify-between"
          >
            <TouchableOpacity
              className="absolute left-0 pt-3"
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontFamily: "Gilroy-Semi" }} className="text-lg ">
              Edit Profile
            </Text>
          </View>
          <View className="items-center pt-4 pb-4">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="border border-gray-300 items-center rounded-full justify-center w-24 h-24"
            >
              <Image
                style={styles.image}
                className="items-center rounded-full justify-center w-24 h-24"
                source={{ uri: image }}
              />
              <Ionicons
                className="absolute"
                size={40}
                color={"#fff"}
                name="add"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="">
          <Inputs
            iconName={"user-alt"}
            label="User Name"
            placeholder="Enter Your Name"
            onChangeText={(name) => updateState({ name })}
          />
          <View className="pl-5 pr-5">
            <Text style={styles.title}>Gender</Text>

            <View className="flex-row justify-between">
              <View
                style={{ width: "47%" }}
                className="border pl-4 pr-4 pt-2 pb-2 rounded-lg border-gray-300"
              >
                <BouncyCheckbox
                  size={20}
                  fillColor="#53B175"
                  text="Female "
                  iconStyle={{ borderColor: "#ccc" }}
                  textStyle={{
                    textDecorationLine: "none",
                    paddingVertical: 10,
                  }}
                  onPress={() => {
                    setChecked(!isChecked);
                  }}
                />
              </View>
              <View
                style={{ width: "47%" }}
                className="border pl-4 pr-4 pt-2 pb-2 w-5/12 rounded-lg border-gray-300"
              >
                <BouncyCheckbox
                  size={20}
                  fillColor="#53B175"
                  text="Male"
                  iconStyle={{ borderColor: "#ccc" }}
                  textStyle={{
                    textDecorationLine: "none",
                    paddingVertical: 10,
                  }}
                  onPress={() => {
                    setChecked(!isChecked);
                  }}
                />
              </View>
            </View>
          </View>
          <Inputs
            iconName={"address-card"}
            label="Address"
            placeholder="Enter Your Address"
            onChangeText={(address) => updateState({ address })}
          />
        </View>
        <Text style={styles.label}>Brithday</Text>
        <View className="justify-center items-center">
          <DatePicker
            style={styles.date}
            date={date} //initial date from state
            mode="date"
            format="DD-MM-YYYY"
            minDate="01-01-1960"
            maxDate="01-01-2020"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 4,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                height: 50,
                borderRadius: 12,
                borderColor: "#ccc",
              },
            }}
            onDateChange={(date) => {
              console.log(date);
              setDate(date);
            }}
          />
        </View>
        <View className="justify-center items-center flex-1">
          <Button
            onPress={submitInfoUser}
            buttonStyle={styles.btn}
            title={"Update Profile"}
            textStyle={styles.text}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
