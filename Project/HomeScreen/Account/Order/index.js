import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import actions from "../../../redux/actions";
import { useEffect } from "react";
import AppLoader from "../../../Components/AppLoader";

const Order = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      (async () => {
        setIsLoading(true);
        try {
          let res = await actions.getOrders();
          const items = res.data;
          setData(items);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(true);
          console.log("error", error);
        }
      })();
    });
    return willFocusSubscription;
  }, []);
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <TouchableOpacity className="p-3" onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View className=" h-16 bg-[#53b175] items-center justify-center ">
          <Text
            className="text-2xl text-white"
            style={{ fontFamily: "Gilroy-Semi" }}
          >
            Orders
          </Text>
        </View>
        {data.length == 0 ? (
          <View
            style={{ height: 500 }}
            className="flex-1 justify-center items-center"
          >
            <Image
              style={{ resizeMode: "contain", width: 180, height: 180 }}
              source={require("../../../accsets/images/favorites.png")}
            />
            <Text className="text-sm font-medium ">Your Order is Empty</Text>
          </View>
        ) : (
          <ScrollView className=" ">
            {data.map((item) => {
              return (
                <View
                  className=" flex-1 flex-row justify-around mb-3 ml-3 border-b mr-3 "
                  key={item.id}
                >
                  <View className=" flex-1">
                    <Text style={styles.text}>ID: # {item.id}</Text>
                    <Text style={styles.text}>
                      Time Create: {item.created_at}
                    </Text>
                    <View>
                      <Text style={styles.text}>
                        Quantity: {item.order_detail.length}
                      </Text>
                      <Text style={styles.text}>
                        Payment: {item.payment_method}
                      </Text>
                    </View>
                  </View>
                  <View className=" right-3 justify-center">
                    <Text style={styles.text}>
                      <Text className="text-red-600">$</Text>{" "}
                      {item.total_payment.toFixed(2)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
        {!!isLoading ? <AppLoader /> : null}
      </SafeAreaView>
    </>
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
  text: {
    fontFamily: "Gilroy-Semi",
    marginBottom: 3,
  },
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
