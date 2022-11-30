import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { Entypo, AntDesign } from "react-native-vector-icons";
import { colors } from "./../../theme/colors";
import Product from "../../Components/Products";
import Swiper from "react-native-swiper";
import Exclusive from "../../Components/HomeComponets/Exclusive";
import BestSelling from "../../Components/HomeComponets/BestSelling";
import Groceries from "../../Components/HomeComponets/Groceries";
import BannerSlide from "../../Components/HomeComponets/BannerSlide";
import styles from "./style";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 mb-16 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 pl-5 pr-5 "
      >
        <View className="flex-1 ml-1 mr-1">
          <View className="justify-center items-center ">
            <Image
              style={{ resizeMode: "contain", width: 30 }}
              source={require("../../accsets/images/baner.png")}
            />
          </View>
          <View className="flex-row justify-center items-center">
            <Entypo size={18} name="location-pin" />
            <Text style={{ fontFamily: "Gilroy-Semi" }}>Dhaka, Banassre</Text>
          </View>
          <View className="flex-row ">
            <TextInput style={[styles.Input]} placeholder="Search Store" />
            <TouchableOpacity className="absolute left-3 top-9  w-6  ">
              <AntDesign size={20} name="search1" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Banner */}
        <BannerSlide />
        {/* End Banner */}
        {/* Components Exclusive */}
        <View>
          <Exclusive />
        </View>
        {/* End Components Exclusive */}

        {/* Components BestSelling */}
        <View>
          <BestSelling />
        </View>
        {/* End Components BestSelling */}

        {/* Components Groceries */}
        <View>
          <Groceries />
        </View>
        {/* End Components Groceries */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
