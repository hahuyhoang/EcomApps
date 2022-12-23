import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "react-native-vector-icons";
import { colors } from "../../../theme/colors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reducers/cartReducer";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import { BASE_URL } from "../../../IPA/Conect";
const { width } = Dimensions.get("window");
const cardWidth = width / 2.3;

const Brand = ({ navigation, route }) => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const BrandId = route.params.paramKey.id;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/products/filter-search?textSearch=&category=&brand=${BrandId}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then((res) => {
        let data = res.data.list_product.data;
        setData(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 pl-5 pr-5">
        <View className="flex-row justify-between pt-4 pb-4 ">
          <TouchableOpacity
            className=""
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={28} />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {route.params.paramKey.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter");
            }}
            className="justify-center items-center pr-3"
          ></TouchableOpacity>
        </View>
        {isLoading ? <ActivityIndicator size="small" color="#53b175" /> : null}
        <ScrollView showsVerticalScrollIndicator={false}>
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
                        $ {item.price}
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
                              source={require("../../../accsets/images/iconn.png")}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Brand;

const styles = StyleSheet.create({
  Input: {
    width: "100%",
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 35,
    borderColor: colors.global,
    backgroundColor: colors.global,
    marginVertical: 20,
  },
  warp: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    width: cardWidth,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: colors.global,
    marginBottom: 10,
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
});
