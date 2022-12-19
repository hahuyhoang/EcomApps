import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Profile = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const Favorite = useSelector((state) => state.cartFavorite);
  const [isError, setError] = useState(false);
  // const [ima, setIma]
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View style={styles.horizon} className=" flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UpdateUser");
          }}
        >
          <EvilIcons name="pencil" size={30} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.horizon} className="mt-3  ">
        <Text style={{ fontFamily: "Gilroy-Semi" }} className="text-lg ">
          My Profile
        </Text>
      </View>
      <View className="items-center">
        <View className="border border-stone-400 items-center rounded-full justify-center w-24 h-24">
          <Image
            style={styles.avatar}
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
        </View>
        <View className="items-center mt-4">
          <Text
            style={{
              fontFamily: "Gilroy-Semi",
              fontSize: 16,
              paddingBottom: 4,
            }}
          >
            {userData.user.name}
          </Text>
          <Text
            style={{ fontFamily: "Gilroy-Regula", color: "grey", fontSize: 14 }}
          >
            {userData.user.email}
          </Text>
        </View>
      </View>
      <View style={styles.horizona} className="flex-row justify-between">
        <View className="items-center">
          <Text style={{ fontFamily: "Gilroy-Regula", color: "grey" }}>
            Yêu Thích
          </Text>
          <Text style={{ fontFamily: "Gilroy-Semi", paddingVertical: 3 }}>
            {Favorite.length}
          </Text>
        </View>
        <View className="items-center">
          <Text style={{ fontFamily: "Gilroy-Regula", color: "grey" }}>
            Đang giao
          </Text>
          <Text style={{ fontFamily: "Gilroy-Semi", paddingVertical: 3 }}>
            0
          </Text>
        </View>
        <View className="items-center">
          <Text style={{ fontFamily: "Gilroy-Regula", color: "grey" }}>
            Đã giao
          </Text>
          <Text style={{ fontFamily: "Gilroy-Semi", paddingVertical: 3 }}>
            0
          </Text>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    resizeMode: "cover",
  },
});
