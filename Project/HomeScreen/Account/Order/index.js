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

const Order = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      (async () => {
        // setIsLoading(true);
        try {
          let res = await actions.getOrders();
          // console.log(res.data);
          const items = res.data;
          setData(items);
          // setIsLoading(false);
        } catch (error) {
          // setIsLoading(true);
          console.log("error", error);
        }
      })();
    });
    return willFocusSubscription;
  }, []);
  return (
    <>
      {/* {data.map((item) => {
        console.log("itemSS,", item);
        return ( */}
      <SafeAreaView className="flex-1 bg-slate-400">

        <View className=" bg-white items-center">
          <Text className="text-2xl" style={{ fontFamily: 'Gilroy-Semi' }}>
            Header
          </Text>
        </View>
        <ScrollView className="">
          <View className=" flex-1 flex-row justify-around">
            <View className="bg-slate-100">
              <Text>
                ID
              </Text>
              <Text>
                TIme
              </Text>
              <View>
                <Text>
                  Quantity
                </Text>
                <Text>
                  Payment
                </Text>
              </View>
            </View>
            <View className="bg-red-500 right-3">
              <Text>
                $Total
              </Text>
            </View>
          </View>

        </ScrollView>

      </SafeAreaView>
      {/* );
      })} */}
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
