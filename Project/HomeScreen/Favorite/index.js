import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import Button from "../../Components/button";
import { useSelector } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import { useDispatch } from "react-redux";
import { clear, removeItem } from "../../redux/reducers/cartFavorites";
import { showMessage } from "react-native-flash-message";
const Favorite = () => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);
  const data = useSelector((state) => state.cartFavorite);

  useEffect(() => {
    try {
      data.forEach((items) => {
        setItem(items);
      });
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  // console.log("error", data);

  const AlertItem = () => {
    Alert.alert(
      "Are you sure you want to clear all the item the Favorite?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => dispatch(clear()) },
      ],
      { cancelable: false }
    );
  };

  return (
    //san pham yeu thich
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="border-b border-gray-300 items-center h-14 justify-center">
        <Text style={{ fontFamily: "Gilroy-Bold", fontSize: 18 }}>
          Favorite
        </Text>
        <TouchableOpacity onPress={AlertItem} className="absolute p-4  right-2">
          <FontAwesome5 name="trash" color={"green"} size={22} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="ml-5 mr-5">
        {data.length == 0 ? (
          <View
            style={{ height: 500 }}
            className="flex-1 justify-center items-center"
          >
            <Image
              style={{ resizeMode: "contain", width: 180, height: 180 }}
              source={require("../../accsets/images/favorites.png")}
            />
            <Text className="text-sm font-medium ">
              Your Cart Favorite is Empty
            </Text>
          </View>
        ) : (
          <View>
            {data.map((item) => {
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
                        // onError={this.replaceImage}
                        source={{ uri: `${userData.url}/${item.media.url}` }}
                      />
                      <View className="pl-7">
                        <Text
                          style={{ fontFamily: "Gilroy-Bold", fontSize: 15 }}
                        >
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
          </View>
        )}
      </ScrollView>

      <View style={[styles.horizon]} className="mb-20">
        <Button
          onPress={() => {
            data.forEach(
              (item) => dispatch(addToCart(item)),
              dispatch(clear())
            );
          }}
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
