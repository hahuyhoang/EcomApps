import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import Button from "../../../Components/button";
import { colors } from "../../../theme/colors";
import { Ionicons, AntDesign, Entypo } from "react-native-vector-icons";
import Swiper from "react-native-swiper";
import axios from "axios";
import { BASE_URL } from "../../../IPA/Conect";
import { addToCart } from "../../../redux/reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../../Components/Rating"
import {
  increment,
  decrement,
} from "../../../redux/reducers/cartReducer";
import { showMessage } from "react-native-flash-message";
import { addToCartFavorite } from "../../../redux/reducers/cartFavorites";
import RenderHTML from "react-native-render-html";
const ProductDetail = ({ route, navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [hideHeart, setHideHeart] = React.useState("");
  const [item, setItem] = useState([]);
  const [img, setImg] = useState([]);
  const [weight, setWeight] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const dispatch = useDispatch();
  const [deTail, setDeTail] = useState([]);
  const { width } = useWindowDimensions();
  const source = {
    html: `${deTail}`,
  };
  //nhan id tu man product,  call api tu key de show thong tin san pham,
  useEffect(() => {
    const infoProDuct = axios
      .get(`${BASE_URL}/products/item/${route.params.paramKey}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setItem(res.data.data_product);
        setImg(res.data.data_product.media.url);
        setDeTail(res.data.data_product.description);
        setWeight( res.data.data_product.product_meta.filter((e) => e.meta_field == 'weight')[0]);
        setQuantity( res.data.data_product.product_meta.filter((e) => e.meta_field == 'quantity')[0].meta_value);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView className="flex-1 ">
      <View
        style={styles.itemImage}
        className="pl-2 pr-2 flex-1 "
        key={item.id}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <Swiper
          autoplay
          loop
          autoplayTimeout={5}
          dot={<View style={styles.dot}></View>}
          activeDot={<View style={styles.active}></View>}
        >
          <View className="items-center justify-center ">
            <Image
              style={{ width: "100%", height: "80%", resizeMode: "contain" }}
              defaultSource={require("../../../accsets/images/product_1.png")}
              source={{ uri: `${userData.url}/${img}` }}
            />
          </View>
          <View className="items-center justify-center ">
            <Image
              style={{ width: "100%", height: "80%", resizeMode: "contain" }}
              source={{ uri: `${userData.url}/${img}` }}
            />
          </View>
          <View className="items-center justify-center ">
            <Image
              style={{ width: "100%", height: "80%", resizeMode: "contain" }}
              source={{ uri: `${userData.url}/${img}` }}
            />
          </View>
        </Swiper>
      </View>
      <View className="pl-5 pr-5">
        <View className="flex-row justify-between">
          <View className="justify-center">
            <Text style={{ fontSize: 20 }} className="font-semibold">
              {item.name}
            </Text>
            <Text style={{ fontSize: 14, paddingVertical: 4 }}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity>
            {
              <Ionicons
                onPress={() => [
                  setHideHeart(!hideHeart),
                  dispatch(addToCartFavorite(item)),
                ]}
                name={hideHeart ? "heart" : "ios-heart-outline"}
                size={25}
                color={hideHeart  ? "red" : "black"}
              />
            }
          </TouchableOpacity>
        </View>
        <View
          style={{ borderBottomWidth: 1, borderColor: colors.global }}
          className="flex-row justify-between items-center"
        >
          <View className="flex-row justify-between mt-5 mb-5 items-center">
            <TouchableOpacity
              onPress={() => {
                dispatch(decrement(item.id));
              }}
            >
              <AntDesign name="minus" size={24} />
            </TouchableOpacity>
            <View style={styles.btn}>
              <Text>{quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(increment(item.id));
              }}
            >
              <AntDesign name="plus" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 16 }} className="font-semibold">
            $ {item.price}
          </Text>
        </View>
        <View className="border-b border-zinc-300">
          <View className="justify-between flex-row pt-4">
            <Text className="font-semibold" style={{ fontSize: 16 }}>
              Product Detail
            </Text>
            <Ionicons name="chevron-down" size={25} />
          </View>
          <RenderHTML source={source} contentWidth={width} />
        </View>
        <View className="border-b border-zinc-300 flex-row justify-between pt-4 pb-4">
          <Text className="font-semibold">Nutritions</Text>
          <View className="flex-row">
            <View
              style={{ borderRadius: 8 }}
              className="justify-center items-center w-14 bg-slate-200"
            >
              <Text className="font-semibold">{weight.meta_value}</Text>
            </View>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View className=" flex-row justify-between pt-4 pb-4">
          <Text className="font-semibold">Review</Text>
          <View className="flex-row">
            <View className="flex-row items-center">
              <Rating/>
            </View>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-2 mb-10">
          <Button
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
            title={"Add to Basket"}
            textStyle={styles.title}
            buttonStyle={[styles.addBtn]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProductDetail;
const styles = StyleSheet.create({
  itemImage: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "#F2F3F2",
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0.5,
    marginHorizontal: 6,
    borderColor: colors.global,
  },
  text: {
    fontSize: 13,
    color: colors.whites,
    paddingVertical: 8,
    fontFamily: "Gilroy-Medium",
    lineHeight: 18,
  },
  addBtn: {
    width: "100%",
    height: 60,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "600",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.whites,
    margin: 5,
  },
  active: {
    width: 15,
    height: 4,
    borderRadius: 6,
    backgroundColor: colors.green,
    margin: 5,
  },
});
