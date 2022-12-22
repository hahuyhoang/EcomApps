import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import styles from "./styles";

const BannerSlide = () => {
  return (
    <View style={{ height: 120 }}>
      <Swiper
        style={styles.slider}
        autoplayTimeout={5}
        autoplay
        loop
        dot={<View style={styles.dot}></View>}
        activeDot={<View style={styles.active}></View>}
      >
        <View className="items-center justify-center  w-max  ">
          <Image
            style={styles.Image}
            source={require("../../accsets/images/banner.png")}
          />
        </View>
        <View className="items-center  justify-center w-full ">
          <Image
            style={styles.Image}
            source={require("../../accsets/images/banner.png")}
          />
        </View>
        <View className="items-center  h-max justify-center w-max  ">
          <Image
            style={styles.Image}
            source={require("../../accsets/images/banner.png")}
          />
        </View>
      </Swiper>
    </View>
  );
};

export default BannerSlide;
