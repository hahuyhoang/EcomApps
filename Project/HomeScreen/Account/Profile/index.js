import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Profile = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  // console.log("user data in profile screen", userData);
  const Favorite = useSelector((state) => state.cartFavorite);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View style={styles.horizon} className=" flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <EvilIcons name="pencil" size={30} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.horizon} className="mt-3  ">
        <Text style={{ fontFamily: "Gilroy-Semi" }} className="text-lg ">
          My Profile
        </Text>
      </View>
      <View className="items-center">
        <View className="border items-center rounded-full justify-center w-20 h-20">
          <Image
            style={{ resizeMode: "cover" }}
            className="items-center rounded-full justify-center w-24 h-24"
            source={require("../../../accsets/images/image.jpg")}
          />
        </View>
        <View className="items-center mt-4">
          <Text style={{ fontFamily: "Gilroy-Semi" }}>
            {userData.user.name}
          </Text>
          <Text style={{ fontFamily: "Gilroy-Regula", color: "grey" }}>
            {userData.user.email}
          </Text>
        </View>
      </View>
      <View style={styles.horizona} className="flex-row justify-between">
        <View className="items-center">
          <Text style={{ fontFamily: "Gilroy-Regula", color: "grey" }}>
            Yêu Thích
          </Text>
          <Text style={{ fontFamily: "Gilroy-Semi",paddingVertical:3 }}>{Favorite.length}</Text>
        </View>
        <View className="items-center">
          <Text style={{ fontFamily: "Gilroy-Regula", color: "grey" }}>
            Đang giao
          </Text>
          <Text style={{ fontFamily: "Gilroy-Semi" ,paddingVertical:3}}>0</Text>
        </View>
        <View className="items-center">
          <Text style={{ fontFamily: "Gilroy-Regula", color: "grey" }}>
            Đã giao
          </Text>
          <Text style={{ fontFamily: "Gilroy-Semi",paddingVertical:3 }}>0</Text>
        </View>
      </View>
      <View className="flex-1 bg-slate-300 justify-center items-center">
        <Text>lich su xem san pham se hien o day</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  horizon: {
    marginHorizontal: 18,
  },
  horizona: {
    marginTop: 20,
    marginHorizontal: 80,
  },
});
