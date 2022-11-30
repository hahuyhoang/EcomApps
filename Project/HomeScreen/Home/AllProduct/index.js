import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import React,{useState,} from "react";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import { colors } from "../../../theme/colors";
import Product from "../../../Components/Products";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");
const cardWidth = width / 2.3 - 4;

const AllProduct = ({ navigation }) => {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  const ListProduct = useSelector((state) => state.product.proDuct);
  const items = ListProduct.list_product.data;
  return (
    <SafeAreaView className="flex-1  bg-white">
      <View className="flex-1 pl-5 pr-5">
        <View className=" pt-4 pb-4  justify-center ">
          <View className="justify-center items-center ">
            <Text className="font-semibold text-base">
              All Products
            </Text>
          </View>
          <TouchableOpacity
            className="absolute left-0 p-3"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={25} />
          </TouchableOpacity>
        </View>
        <View className="flex-row ml-1 mr-1">
          <TextInput
            style={styles.Input}
            placeholder="Search Store"
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
            className="absolute left-3 top-9  w-6  "
          >
            <AntDesign size={20} name="search1" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.warp}>
            {items.map((item) => {
              return (
                <View style={styles.container}>
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
                      onPress={() => selectItem(item)}
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

export default AllProduct;

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
  },
  container: {
    width: cardWidth,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: colors.global,
    marginBottom: 10,
    marginHorizontal: 5,
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
