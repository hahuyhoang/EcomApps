import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import Button from "../Components/button";
import Input from "../Components/Textinput";

export default function ForgotPassword({ navigation }) {
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
            <Text style={styles.headertext}>New Password</Text>
          </View>
        </View>
        <View className="pl-5 pr-5 mt-10 ">
          <Input
            label={"Enter Verification Code"}
            autoFocus
            password
            placeholder="Enter Your Password"
            style={styles.input}
          />
          <Text className="pt-1 pb-1"></Text>
          <Input
            label={"Comfirm Password"}
            autoFocus
            placeholder="Enter Your Password"
            style={styles.input}
            password
          />
        </View>
        <View className="pl-5 pr-5 pt-10  ">
          <View className="w-full justify-center items-center">
            <Button
              secureTextEntry={true}
              title="Send"
              buttonStyle={styles.btn}
              textStyle={styles.texBtn}
            />
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
  TextEmail: {
    fontFamily: "Gilroy-Light",
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 10,
  },
  input: {
    width: "100%",
    height: 45,
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
});
