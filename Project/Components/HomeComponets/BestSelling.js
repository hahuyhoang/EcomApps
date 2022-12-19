import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import Product from "../Products";
import { useNavigation } from "@react-navigation/native";
import actions from "../../redux/actions";
import styles from "./styles";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import Selling from "../Selling";

const BestSelling = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-row pt-5 pb-5 justify-between">
        <TouchableOpacity className="font-semibold">
          <Text style={styles.Text}>Best Selling</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AllBestSell");
          }}
        >
          <Text style={{ color: colors.green }}> See all </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <Selling />
      </ScrollView>
    </View>
  );
};

export default BestSelling;
