import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Button from "../../Components/button";
import { useSelector } from "react-redux";
import actions from "../../redux/actions";
import AppLoader from "../../Components/AppLoader";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

const Account = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [isError, setError] = useState(false);

  const onLogoutAlert = () => {
    Alert.alert(
      "Logout",
      "Are you sure, you want to logout from this device",
      [{ text: "Yes", onPress: logout }, { text: "No" }],
      { cancelable: true }
    );
  };
  const logout = () => {
    setIsLoading(true);
    setTimeout(
      () => {
        actions.logout();
      },
      3000,
      showMessage("Log out sucess")
    );
  };
  return (
    <>
      <SafeAreaView className="bg-white flex-1 text-black">
        <ScrollView className="pt-2">
          <View style={styles.horizon}>
            <View className="flex-row  pl-5 pr-5  items-center">
              <Image
                style={styles.avatar}
                defaultSource={require("../../accsets/images/user.jpg")}
                onError={() => {
                  setError(true);
                }}
                source={{
                  uri:
                    userData.user.media == null
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFghe9NlnM-gPygO1pbXIp3QDflsCer36gLxnfHQWqVXSamYNUshZe6mbW98mFYAw4Hl0&usqp=CAU"
                      : `${userData.url}/${userData.user.media.url}`,
                }}
              />
              <View className="ml-4">
                <Text style={styles.bold}>{userData.user.name}</Text>
                <Text style={styles.regula} className="text-gray-400">
                  {userData.user.email}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Order");
            }}
            className="border-t pl-5 pr-5 mt-4 border-gray-300 border-b flex-row justify-between"
          >
            <View style={styles.horizon} className="flex-row items-center h-14">
              <Image source={require("../../../assets/images/icon_1.png")} />
              <Text style={styles.semi} className="ml-5">
                Order
              </Text>
            </View>
            <View className=" justify-center items-center">
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            className="border-gray-300 pl-5 pr-5 border-b flex-row justify-between"
          >
            <View style={styles.horizon} className="flex-row items-center h-14">
              <Image source={require("../../../assets/images/icon_2.png")} />
              <Text style={styles.semi} className="ml-5">
                My Details
              </Text>
            </View>
            <View className=" justify-center items-center">
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View className="border-gray-300 pl-5 pr-5 border-b flex-row justify-between">
            <TouchableOpacity
              style={styles.horizon}
              className="flex-row items-center h-14"
            >
              <Image source={require("../../../assets/images/icon_3.png")} />
              <Text style={styles.semi} className="ml-5">
                Delivery Address
              </Text>
            </TouchableOpacity>
            <View className=" justify-center items-center">
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </View>
          <View className="border-gray-300 pl-5 pr-5 border-b flex-row justify-between">
            <TouchableOpacity
              style={styles.horizon}
              className="flex-row items-center h-14"
            >
              <Image source={require("../../../assets/images/icon_4.png")} />
              <Text style={styles.semi} className="ml-5">
                Payment Methods
              </Text>
            </TouchableOpacity>
            <View className=" justify-center items-center">
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </View>
          <View className="border-gray-300 pl-5 pr-5 border-b flex-row justify-between">
            <TouchableOpacity
              style={styles.horizon}
              className="flex-row items-center h-14"
            >
              <Image source={require("../../../assets/images/icon_5.png")} />
              <Text style={styles.semi} className="ml-5">
                Promo Cord
              </Text>
            </TouchableOpacity>
            <View className=" justify-center items-center">
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </View>
          <View className="border-gray-300 pl-5 pr-5 border-b flex-row justify-between">
            <TouchableOpacity
              style={styles.horizon}
              className="flex-row items-center h-14"
            >
              <Image source={require("../../../assets/images/icon_6.png")} />
              <Text style={styles.semi} className="ml-5">
                Notifications
              </Text>
            </TouchableOpacity>
            <View className=" justify-center items-center">
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </View>
          <View className="border-gray-300 pl-5 pr-5 border-b flex-row justify-between">
            <TouchableOpacity
              style={styles.horizon}
              className="flex-row items-center h-14"
            >
              <Image source={require("../../../assets/images/icon_7.png")} />
              <Text style={styles.semi} className="ml-5">
                Help
              </Text>
            </TouchableOpacity>
            <View className=" justify-center items-center">
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </View>
          <View className="border-gray-300 pl-5 pr-5 border-b flex-row justify-between">
            <TouchableOpacity
              style={styles.horizon}
              className="flex-row items-center h-14"
            >
              <Image source={require("../../../assets/images/icon_8.png")} />
              <Text style={styles.semi} className="ml-5">
                About
              </Text>
            </TouchableOpacity>
            <View className=" justify-center items-center">
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </View>
          <View style={styles.horizon} className="mt-3 pl-5 pr-5 mb-20">
            <Button
              buttonStyle={{
                alignItems: "center",
                justifyContent: "center",
                height: 60,
                borderRadius: 12,
                backgroundColor: "#f2f3f2",
              }}
              title={"Log Out"}
              textStyle={{
                fontFamily: "Gilroy-Semi",
                color: "#53b175",
                fontSize: 18,
              }}
              onPress={onLogoutAlert}
            />
            <Image
              style={{ position: "absolute", top: "30%", left: "10%" }}
              source={require("../../../assets/images/out.png")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {!!isLoading ? <AppLoader /> : null}
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  regula: {
    fontFamily: "Gilroy-Regula",
    fontSize: 15,
    paddingTop: 3,
  },
  horizon: {
    // flex: 1,
  },
  flex: {
    flex: 1,
  },
  bold: {
    fontFamily: "Gilroy-Semi",
    fontSize: 18,
    fontWeight: "600",
  },
  semi: {
    fontFamily: "Gilroy-Semi",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "contain",
  },
});
