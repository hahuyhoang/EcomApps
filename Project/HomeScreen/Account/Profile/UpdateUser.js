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
import { Ionicons, Fontisto } from "react-native-vector-icons";
import styles from "./style";
import actions from "../../../redux/actions";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function UpdateUser({ navigation }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState();
  const [isChecked, setChecked] = useState(false);
  const [imageDefault, setImageDefault] = useState(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    gender: "",
    birthday: "",
  });
  const { name, gender, address, birthday } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));
  const userData = useSelector((state) => state.auth.userData);
  const user_id = userData.user.id;

  const onchange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS == "ios");
    setDate(currentDate);
  };
  const showModal = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };
  // add thu vien iamge va camera ImagePicker
  useEffect(() => {
    const fetch = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permisson denied!");
        }
      }
    };
    fetch();
  }, []);
  const PickerCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage("data:image/jpg;base64," + result.assets[0].base64);
      setModalVisible(!modalVisible);
    }
  };
  const PickerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage("data:image/jpg;base64," + result.assets[0].base64);
      setModalVisible(!modalVisible);
    }
  };
  // submit info user axios
  const submitInfoUser = async () => {
    setIsLoading(true);
    try {
      const res = await actions.update_user({
        user_id,
        name,
        gender: isChecked,
        address,
        birthday: date,
      });
      setIsLoading(false);
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
  // submit Avatar user axios
  const submitAvatarUser = async () => {
    setIsLoading(true);
    try {
      const res = await actions.avatar_user({
        user_id,
        avatar: image,
      });
      setIsLoading(false);
      setAvatar(res);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Upload Photo</Text>
              <Text className="pt-2 pb-2 mb-8 text-slate-400">
                Choose Your Profile Picture
              </Text>
              <Button
                onPress={PickerCamera}
                buttonStyle={styles.btnCamera}
                title={"Take Photo"}
                textStyle={styles.text}
              />

              <Button
                onPress={PickerImage}
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
                style={styles.avatar}
                defaultSource={require("../../../accsets/images/user.jpg")}
                source={{ uri: image }}
              />
              <Ionicons
                className="absolute"
                size={40}
                color={"#ccc"}
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
                  text="Female"
                  value={1}
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
                  value={2}
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
          <TouchableOpacity
            title="dada"
            style={styles.date}
            onPress={() => showModal("date")}
          >
            <Fontisto
              className="absolute left-2 bottom-4"
              name="date"
              size={22}
              color="green"
            />
            <DateTimePicker
              style={styles.dateTimePicker}
              testID="dateTimePicker"
              value={date}
              mode={mode}
              onChange={onchange}
            />
          </TouchableOpacity>
        </View>
        <View className="justify-center items-center flex-1">
          <Button
            onPress={() => {
              submitAvatarUser(), submitInfoUser();
            }}
            buttonStyle={styles.btn}
            title={"Update Profile"}
            textStyle={styles.text}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
