import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import Button from "../Components/button";
import Input from "../Components/Textinput";

export default function ForgotEmail({ navigation }) {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1">
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: "absolute", left: 0 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Feather name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
          <View style={styles.TextHeader}>
            <Text style={styles.headertext}>Forgot Password</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View className="justify-center mt-10 items-center">
            <Text style={styles.TextEmail}>Enter Your Email Address</Text>
          </View>
          <Input
            autoFocus
            placeholder="Enter your Email"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="justify-center mt-3 mb-3 items-center"
          >
            <Text className="text-sm " style={{ color: colors.grey }}>
              Back To Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 pl-5 pr-5 ">
          <View className="w-full justify-center items-center">
            <Button
              onPress={() => {
                navigation.navigate("Verification");
              }}
              title="Send"
              buttonStyle={styles.btn}
              textStyle={styles.texBtn}
            />
          </View>
          <View className="justify-center items-center mt-4 mb-5">
            <Text className="font-bold">Or</Text>
          </View>
          <View className="flex-row justify-center">
            <TouchableOpacity style={styles.btnIamge}>
              <Image
                style={styles.Image}
                source={require("../accsets/images/google.jpg")}
              />
              <Text className="font-bold text-xs">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIamge}>
              <Image
                style={styles.Image}
                source={require("../accsets/images/facebook.png")}
              />
              <Text className="font-bold text-xs">Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "#7c7c7c",
  },
  TextHeader: {
    alignItems: "center",
    marginBottom: "5%",
  },
  headertext: {
    fontFamily: "Gilroy-Light",
    fontSize: 25,
  },
  container: {
    flex: 1,
    paddingTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
  },

  TextEmail: {
    marginBottom: 15,
    fontFamily: "Gilroy-Light",
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.grey,
    autoComplete: "",
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  btn: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 10,
  },
  texBtn: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 18,
  },
  Image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  btnIamge: {
    flexDirection: "row",
    width: "48%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.grey,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
