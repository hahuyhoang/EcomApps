import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Ionicons, AntDesign, Entypo } from "react-native-vector-icons";
import { colors } from "../../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  removeItem,
} from "../../../redux/reducers/cartReducer";

const ProductCart = () => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cartReducer);
  return (
    <SafeAreaView className="-mt-5">
      {data.length == 0 ? (
        <View
          style={{ height: 500 }}
          className=" flex-1 justify-center items-center"
        >
          <Image
            style={{ width: "100%", resizeMode: "contain" }}
            source={require("../../../accsets/images/nocart.jpg")}
          />
          <Text className="text-sm font-medium ">Your Cart is Empty</Text>
        </View>
      ) : (
        <View>
          {data.map((item) => {
            const totalItemPrice = (item.quantity * item.price).toFixed(2);
            return (
              <View
                style={styles.horizon}
                className="flex-row  items-center"
                key={item.id}
              >
                <View className="flex-row flex-1 h-32 items-center  border-b border-gray-300 ">
                  <Image
                    style={styles.Images}
                    defaultSource={require("../../../accsets/images/product_1.png")}
                    source={{ uri: `${userData.url}/${item.media.url}` }}
                  />
                  <View className="pl-6 pt-4 justify-center ">
                    <Text style={{ fontFamily: "Gilroy-Bold", fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Text style={styles.Text}>{item.title}</Text>
                    <View className="flex-row mt-3 mb-3 items-center">
                      <TouchableOpacity
                        onPress={() => {
                          if (item.quantity === 1) {
                            dispatch(removeItem(item.id));
                            return;
                          } else {
                            dispatch(decrement(item.id));
                          }
                        }}
                        style={styles.btn}
                      >
                        <AntDesign name="minus" size={24} />
                      </TouchableOpacity>
                      <Text className="font-semibold">{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(increment(item.id));
                        }}
                        style={styles.btn}
                      >
                        <AntDesign name="plus" size={24} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className="ml-auto  w-14 h-full">
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(removeItem(item.id));
                      }}
                      className="mb-10 mt-2 ml-2"
                    >
                      <Ionicons name="close" size={28} />
                    </TouchableOpacity>
                    <Text className="font-semibold">${totalItemPrice}</Text>
                  </View>
                </View>
                <View className=" flex-row justify-center items-center"></View>
              </View>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  horizon: {
    flex: 1,
    marginHorizontal: 20,
  },
  Text: {
    fontFamily: "Gilroy-Medium",
    fontSize: 14,
    color: "#7c7c7c",
    paddingTop: 4,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0.5,
    marginHorizontal: 6,
    borderColor: colors.global,
  },
  Images: {
    width: 100,
    height: "80%",
    resizeMode: "contain",
  },
});
