import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Button from "../../Components/button";
import { useSelector } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import { useDispatch } from "react-redux";
import {
  increment,
  decrement,
  clear,
  removeItem,
} from "../../redux/reducers/cartReducer";
const Favorite = () => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cartFavorite);
  return (
    //san pham yeu thich
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="border-b border-gray-300 items-center h-14 justify-center">
        <Text style={{ fontFamily: "Gilroy-Bold", fontSize: 18 }}>
          Favorite
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="ml-5 mr-5">
        {item.map((item) => {
          return (
            <View className="border-b w-full  h-32 border-gray-300">
              <View
                style={styles.horizon}
                className="flex-row w-full h-full items-center"
              >
                <View className="flex-row h-full w-full items-center ">
                  <Image
                    className="p"
                    style={styles.Images}
                    source={{ uri: `${userData.url}/${item.media.url}` }}
                  />
                  <View className="pl-7">
                    <Text style={{ fontFamily: "Gilroy-Bold", fontSize: 15 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Gilroy-Medium",
                        fontSize: 15,
                        color: "#7c7c7c",
                        paddingTop: 4,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View className="ml-auto flex-row items-center">
                  <Text style={{ fontFamily: "Gilroy-Semi", fontSize: 15 }}>
                    ${item.price}
                  </Text>
                  <Feather name="chevron-right" size={24} color="black" />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={[styles.horizon]} className="mb-20">
        <Button
          onPress={() => dispatch(addToCart(item))}
          buttonStyle={{
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            backgroundColor: "#53b175",
            width: "90%",
          }}
          title={"Add All To Cart "}
          textStyle={{
            fontFamily: "Gilroy-Semi",
            color: "#fff",
            fontSize: 16,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  horizon: {
    alignItems: "center",
    justifyContent: "center",
  },
  Images: {
    width: 100,
    height: "80%",
    resizeMode: "contain",
  },
});
