import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Product from "../Products";
import { colors } from "../../theme/colors";
import styles from "./styles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import actions from "../../redux/actions";
import { useDispatch } from "react-redux";
const Groceries = () => {

  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth.userData);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const Product = useSelector((state) => state.product.proDuct)

  // console.log(Product.list_product.data);
  useEffect(() => {
    (async () => {
        setIsLoading(true)
        try {
          let res = await actions.brand();
          const items = res.list_brand;
          items.forEach((element) => {
          });
          setIsLoading(false)
          setData(items);
        } catch (error) {
          setIsLoading(true)
          console.log("error", error);
        }
      })();
  }, []);
  return (
    <>
      <View>
        <View className="flex-row ml-1 mr-1 pt-5 pb-5 justify-between">
          <TouchableOpacity className="font-semibold">
            <Text style={styles.Text}>Groceries</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllProduct");
            }}
          >
            <Text style={{ color: colors.green, fontFamily: "Gilroy-Semi" }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {data.map((item) => {
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    style={styles.btnItem}
                    className=" flex-row items-center pt-2 pb-2"
                    onPress={() => {
                      navigation.navigate("Beverages");
                    }}
                  >
                    <Image
                      className="ml-2 "
                      style={{ width: 80, height: 70 }}
                      source={{ uri: `${userData.url}/${item.media.url}` }}
                    />
                    <Text style={{ fontFamily: "Gilroy-Semi", paddingLeft: 10 }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <Product />
        </ScrollView>
      </View>
      {isLoading ? <ActivityIndicator /> : null}
    </>
  );
};

export default Groceries;
