import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

const PerparingOrder = () => {
  return (
    <SafeAreaView className=" bg-[#ffffff] flex-1 items-center">
      <Animatable.Image
        source={require("../../assets/images/113209-grocery-shopping-bag-pickup-and-delivery.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
    </SafeAreaView>
  );
};

export default PerparingOrder;

const styles = StyleSheet.create({});
