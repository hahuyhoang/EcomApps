import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";

import validator from "./utils/validation";
import { showError } from "./utils/helperFunction";
import actions from "./redux/actions";
import { showMessage } from "react-native-flash-message";
import AppLoader from "./Components/AppLoader";

const Register = ({ navigation }) => {
  const [getPasswordVisible, setPasswordVisible] = useState(false); // an hien password
  const [isLoading, setIsLoading] = useState(false); // set loading cho app

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  }); // nhan vao state cua {name, email, password, pass_confirm}
  const { name, email, password, password_confirmation } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data })); // update state cua 4 gia tri do

  // {start check valid}
  const isValidData = () => {
    const error = validator({
      name,
      email,
      password,
      password_confirmation,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };
  // {end checkvalid}
  // {state register}
  const onSignup = async () => {
    setIsLoading(true);
    const checkValid = isValidData();
    if (checkValid) {
      try {
        const res = await actions.signup({
          name,
          email,
          password,
          password_confirmation,
        });
        setIsLoading(false);
        showMessage("Register successfully..! Please verify your email");
        navigation.navigate("CheckCode");
      } catch (error) {
        showError(error.message);
      }
      setIsLoading(false);
    }
  };
  // {end register}
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1">
          <View className="flex-1">
            <ImageBackground
              className="w-screen h-screen"
              source={require("../assets/images/MaskGroup.png")}
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 items-center">
            <Image
              className=""
              source={require("../assets/images/Group.png")}
            />
          </View>
        </View>
        <View className="ml-5 mr-5">
          <View>
            <Text style={styles.font} className="text-2xl mb-3">
              Sign up
            </Text>
            <Text style={styles.font} className="text-gray-500">
              Enter your username emails and password
            </Text>
          </View>
        </View>
        <View className=" ml-5 mt-10  mr-5">
          <View>
            <Text style={styles.font} className="text-gray-500 mb-3">
              User name
            </Text>
            <TextInput
              onChangeText={(name) => updateState({ name })}
              className="border-b border-b-gray-300"
              style={styles.font}
              placeholder="Nhap username cua ban"
            />
          </View>
          <View className="mt-8">
            <Text style={styles.font} className="text-gray-500 mb-3">
              Email
            </Text>
            <TextInput
              onChangeText={(email) => updateState({ email })}
              className="border-b border-b-gray-300"
              style={styles.font}
              placeholder="Nhap email cua ban"
            />
          </View>

          <View className="mt-8">
            <Text style={styles.font} className="text-gray-500 mb-3">
              Password
            </Text>
            <TextInput
              onChangeText={(password) => updateState({ password })}
              className="border-b border-b-gray-300 "
              style={styles.font}
              placeholder="Nhap password cua ban"
              secureTextEntry={getPasswordVisible ? false : true}
            />

            <TouchableOpacity
              className="absolute right-0 bottom-1"
              onPress={() => {
                setPasswordVisible(!getPasswordVisible);
              }}
            >
              {getPasswordVisible ? (
                <Feather name="eye" size={24} color="gray" />
              ) : (
                <Feather name="eye-off" size={24} color="gray" />
              )}
            </TouchableOpacity>
          </View>
          <View className="mt-8">
            <Text style={styles.font} className="text-gray-500 mb-3">
              Password Confirm
            </Text>
            <TextInput
              onChangeText={(password_confirmation) =>
                updateState({ password_confirmation })
              }
              className="border-b border-b-gray-300 "
              style={styles.font}
              placeholder="Nhap password cua ban"
              secureTextEntry={getPasswordVisible ? false : true}
            />

            <TouchableOpacity
              className="absolute right-0 bottom-1"
              onPress={() => {
                setPasswordVisible(!getPasswordVisible);
              }}
            >
              {getPasswordVisible ? (
                <Feather name="eye" size={24} color="gray" />
              ) : (
                <Feather name="eye-off" size={24} color="gray" />
              )}
            </TouchableOpacity>
          </View>
          {/* viet content accept tai day */}
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity
            style={styles.green}
            onPress={onSignup}
            className="items-center h-14 justify-center rounded-2xl mt-5 w-11/12 "
          >
            <View>
              <Text style={styles.font} className="text-white text-lg">
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row mt-3">
            <Text style={styles.font}>You have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.font} className="ml-1 text-green-500">
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {isLoading ? <AppLoader /> : null}
    </>
  );
};

export default Register;
const styles = StyleSheet.create({
  font: {
    fontFamily: "Gilroy-Semi",
  },
  green: {
    backgroundColor: "#53b175",
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
    fontFamily: "Gilroy-Semi",
  },
  errors: {
    color: "red",
    fontFamily: "Gilroy-Regula",
  },
});
