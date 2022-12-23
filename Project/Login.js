import {
  View,
  Text,
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
import AppLoader from "./Components/AppLoader";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

const LogIn = ({ navigation }) => {
  const [getPasswordVisible, setPasswordVisible] = useState(false); // an hien password
  const [isLoading, setIsLoading] = useState(false); // loading khi vao app
  const [state, setState] = useState({
    email: "",
    password: "",
  }); // nhan vao state cua email, password
  const { email, password } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data })); // update state khi nhap vao email moi
  // {start check valid}
  const isValidData = () => {
    const error = validator({
      email,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };
  // {end check valid}

  // {start func login}
  const onLogin = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      try {
        setIsLoading(true);
        const res = await actions.login({
          email,
          password,
        });
        setIsLoading(false);
        showMessage("Login success");
        if (!res.user.email_verified_at) {
          navigation.navigate("CheckCode");
        }
      } catch (error) {
        // showError()
        setIsLoading(false)
        showMessage("error password")
      }
    }
  };
  // {end func login}
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
              Login
            </Text>
            <Text style={styles.font} className="text-gray-500">
              Enter your emails and password
            </Text>
          </View>
        </View>
        <View className=" ml-5 mt-10  mr-5">
          <View>
            <Text style={styles.font} className="text-gray-500 mb-3">
              Email
            </Text>
            <TextInput
              onChangeText={(email) => updateState({ email })}
              className="border-b border-b-gray-300"
              style={styles.input}
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
              style={styles.input}
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
          <View className=" flex-row justify-between items-center mt-3">
            <TouchableOpacity className=" p-2">
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgotEmail");
              }}
            >
              <Text style={styles.font} className=" text-gray-700">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity
            style={styles.green}
            onPress={onLogin}
            className="items-center h-14 justify-center rounded-2xl mt-5 w-11/12 "
          >
            <View>
              <Text style={styles.font} className="text-white text-lg">
                Log In
              </Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row mt-3">
            <Text style={styles.font}>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
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

export default LogIn;
const styles = StyleSheet.create({
  font: {
    fontFamily: "Gilroy-Semi",
  },
  input: {
    fontFamily: "Gilroy-Semi",
    paddingVertical: 5,
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
