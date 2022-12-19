import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import ProductCart from "./product/index";
import { useDispatch, useSelector } from "react-redux";
import { cartTotalPriceSelector } from "../../redux/reducers/selectorTotal";

const MyCart = ({ navigation }) => {
  const dataCart = useSelector((state) => state.cartReducer);
  const totalPrice = useSelector(cartTotalPriceSelector);

  return (
    <SafeAreaView className="flex-1 mb-16  bg-white">
      <View className="border-b border-gray-300 items-center h-14 justify-center">
        <Text style={{ fontFamily: "Gilroy-Bold", fontSize: 18 }}>My Cart</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        <ProductCart />
      </ScrollView>

      <View className="justify-center items-center mt-2">
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate("Add")}
        >
          <Text style={styles.Textbtn}>Go To Checkout</Text>
          <View style={styles.price} className="right-8 top-4">
            <Text style={{ color: colors.white, fontWeight: "600" }}>
              ${totalPrice.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default MyCart;
const styles = StyleSheet.create({
  horizon: {
    marginHorizontal: 25,
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
  Button: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 16,
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
