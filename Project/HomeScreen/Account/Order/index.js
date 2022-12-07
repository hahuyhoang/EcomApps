import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import {
  Ionicons,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "react-native-vector-icons";
import { colors } from "../../../theme/colors";
import { Feather } from "@expo/vector-icons";

const Order = ({ navigation }) => {

  return (
    <SafeAreaView className="flex-1  bg-white">

      <ScrollView className="flex-1 ">
        <View className=" pt-4 pb-4 justify-center ">
          <View className="justify-center items-center ">
            <Text style={{ fontSize: 20, fontFamily: "Gilroy-Semi" }}>
              Order
            </Text>
          </View>
          <TouchableOpacity
            className=" absolute left-0 p-3"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={25} />
          </TouchableOpacity>
        </View>
        <View className=" h-20  pl-5 pr-5 items-center justify-center bg-slate-200">
          <View className="w-full flex-row">
            <Entypo size={20} name="location-pin" color={"green"} />
            <Text
              style={{ fontFamily: "Gilroy-Semi", marginLeft: 5, fontSize: 18 }}
            >
              Destination Address
            </Text>
          </View>
          <Text style={styles.text}>
            Sdt: 0334262754 Dc: Z115 Tân Thịnh Tp Thái Nguyên
          </Text>
        </View>
        <ScrollView
          style={{ height: 195 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="  border-b justify-center pl-5 pr-5  border-gray-300">
            <View
              style={styles.horizon}
              className="flex-row  justify-between items-center"
            >
              <View className="flex-row h-24 items-center justify-center">
                <Image
                  className=" h-full"
                  style={{ resizeMode: "contain" }}
                  source={require("../../../accsets/images/product_1.png")}
                />
                <View className="pl-7">
                  <Text style={{ fontFamily: "Gilroy-Bold", fontSize: 15 }}>
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Gilroy-Medium",
                      fontSize: 15,
                      color: "#7c7c7c",
                    }}
                  >
                    325ml, Price
                  </Text>
                </View>
              </View>
              <View className="h-full items-center">
                <Text
                  style={{
                    fontFamily: "Gilroy-Semi",
                    fontSize: 15,
                    marginVertical: 20,
                  }}
                >
                  $5.42
                </Text>
                <Text
                  style={{
                    fontFamily: "Gilroy-Semi",
                    fontSize: 15,
                    marginTop: "20%",
                  }}
                >
                  x1
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className=" flex-1 ">
          <View className=" pt-3 pb-3 flex-row justify-between  border-b border-gray-300 ">
            <View className="pl-5 pr-5 flex-row items-center">
              <Fontisto name="messenger" size={25} color={"green"} />
              <Text className="font-bold pl-3">Messenge</Text>
            </View>
            <TouchableOpacity>
              <Text className="pr-5 text-zinc-300">Note for Shop...</Text>
            </TouchableOpacity>
          </View>
          <View className=" pt-3 pb-3 flex-row justify-between  border-b border-gray-300 ">
            <View className="pl-5 pr-5 flex-row items-center">
              <MaterialIcons name="card-giftcard" size={25} color={"green"} />
              <Text className="font-bold pl-3">Voucher</Text>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <Text className=" text-zinc-300">Choose or enter voucher</Text>
              <Feather name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="pb-3 border-b border-gray-300">
            <View className=" pt-3 pb-3 flex-row justify-between  ">
              <View className="pl-5 pr-5 flex-row items-center">
                <Entypo name="v-card" size={25} color={"green"} />
                <Text className="font-bold pl-3">Payment method</Text>
              </View>
              <TouchableOpacity className="flex-row items-center">
                <Text className=" text-zinc-300">COD</Text>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between pb-1 pl-5 pr-5">
              <Text style={styles.text}>The good cost total</Text>
              <Text style={styles.text}>$21.59</Text>
            </View>
            <View className="flex-row justify-between pb-1 pl-5 pr-5">
              <Text style={styles.text}>Transist fee total</Text>
              <Text style={styles.text}>$1.59</Text>
            </View>
            <View className="flex-row justify-between pb-1 pl-5 pr-5">
              <Text className="font-bold text-sm">Price total</Text>
              <Text className="font-bold ">$20.00</Text>
            </View>
          </View>
        </View>
        <View className="justify-center items-center mt-16 flex-1 ">
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("PerparingOrder")}>
            <Text style={styles.Textbtn}>Purchase</Text>
            <View style={styles.price} className=" right-8 top-5">
              <Text style={{ color: colors.white, fontWeight: "600" }}>
                $20.00
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  Input: {
    width: "100%",
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 40,
    borderColor: colors.global,
    backgroundColor: colors.global,
    marginVertical: 20,
  },
  warp: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  text: { fontFamily: "Gilroy-Semi" },
  Button: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 20,
  },
  Textbtn: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "600",
  },
  price: {
    position: "absolute",
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: "#489E67",
    borderRadius: 4,
  },
});
