import React, { useEffect, useState, createContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { colors } from "../theme/colors";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const cardWidth = width / 2.4 - 4;
import actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native";


const Product = ({}) => {
  const userData = useSelector((state) => state.auth.userData);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      (async () => {
        setIsLoading(true);
        try {
          let res = await actions.product();
          const items = res.list_product.data;
          // console.log(items);
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
      <SafeAreaView className="flex-row">
            <View style={styles.warp}>
              {data.map((item) => {
                return (
                  <View style={styles.container} key={item.id}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ProductDetail", {
                          paramKey: item.id,
                        });
                      }}
                    >
                      <View className="justify-center h-28  items-center ">
                        <Image
                          style={{
                            width: "100%",
                            height: "80%",
                            resizeMode: "contain",
                          }}
                          source={{ uri: `${userData.url}/${item.media.url}` }}
                        />
                      </View>
                      <View className="pb-2 pt-2">
                        <Text style={{ fontFamily: "Gilroy-Bold" }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{ color: colors.whites, paddingVertical: 4 }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View className="pb-4 pt-4 flex-row justify-between">
                      <View className="justify-center items-center">
                        <Text style={{ fontFamily: "Gilroy-Semi" }}>
                          ${item.price.toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          dispatch(addToCart(item));
                          showMessage({
                            message: "Add to cart successfully",
                            description: "Go to check Cart",
                            icon: (props) => (
                              <Image
                                source={require("../accsets/images/iconn.png")}
                                {...props}
                              />
                            ),
                            type: "success",
                          });
                        }}
                      >
                        <Ionicons size={25} color={"#fff"} name="add" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
      </SafeAreaView>
      {isLoading ? <ActivityIndicator /> : null}
    </>
  );
};
export default Product;
const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: colors.global,
    marginBottom: 10,
    // marginHorizontal: 5,
    marginRight: 10,
  },
  btn: {
    width: 40,
    height: 40,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    fontFamily: "Gilroy-Bold",
  },
  warp: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
});
