import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,Dimensions
} from "react-native";
import React,{useState,} from "react";
import { Ionicons } from "react-native-vector-icons";
import { colors } from "../../../theme/colors";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const cardWidth = width / 2.3 ;

const Beverages = ({ navigation }) => {
  
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [search, setSearch] = useState("");

  const ListProduct = useSelector((state) => state.product.proDuct);
  const items = ListProduct.list_product.data;

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
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Beverages</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter");
            }}
            className="justify-center items-center pr-3"
          >
            <Image
              style={{ resizeMode: "contain" }}
              source={require("../../../accsets/images/filter.png")}
            />
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

export default Beverages;

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
