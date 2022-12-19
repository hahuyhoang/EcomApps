import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import { showError } from "../utils/helperFunction";
import { showMessage } from "react-native-flash-message";
import AppLoader from "../Components/AppLoader";

export default function CheckCode({ navigation }) {
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);

  const updateState = (data) => setState(() => ({ ...state, ...data }));
  const [state, setState] = useState({
    user_id: userData.user.id,
    email: userData.user.email,
    code: "",
  });
  const { email, user_id, code } = state;
  const onVeri = async () => {
    setIsLoading(true);
    try {
      const res = await actions.verify({
        user_id,
        email,
        code,
      });
      setIsLoading(false);
      showMessage("Register successfully..! You can login");
      navigation.navigate("Login");
      actions.logout();
    } catch (error) {
      showError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <KeyboardAvoidingView
        className="flex-1"
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
              <Text style={styles.headertext}>Verify</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.body}>
              <View style={styles.infoEmail}>
                <Text style={styles.TextEmail}>
                  Code send to your email, please check in your email{" "}
                </Text>
                <MaterialCommunityIcons
                  name="email-open-outline"
                  size={28}
                  color="black"
                />
                <Text style={styles.TextEmail}>{userData.user.email}</Text>
              </View>
            </View>
            <TextInput
              keyboardType="numeric"
              autoFocus
              placeholder="Vui long nhap code"
              style={styles.input}
              onChangeText={(code) => updateState({ code })}
            />
          </View>
          <TouchableOpacity onPress={onVeri} style={styles.btn}>
            <Text style={styles.texBtn}>Ok</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
      {isLoading ? <AppLoader /> : null}
    </>
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
    marginTop: 25,
    marginHorizontal: 20,
  },
  infoEmail: {
    alignItems: "center",
  },
  TextEmail: {
    marginBottom: 15,
    fontFamily: "Gilroy-Light",
    fontSize: 14,
  },
  input: {
    position: "relative",
    width: "100%",
    backgroundColor: "#0,0,0,0",
    height: 50,
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: "#E9E9E9",
    autoComplete: "",
    fontFamily: "Gilroy-Semi",
  },
  btn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 30,
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: 20,
  },
  texBtn: {
    color: colors.white,
    fontWeight: "600",
  },
});
