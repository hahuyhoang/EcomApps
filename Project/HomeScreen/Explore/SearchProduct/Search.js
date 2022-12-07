import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import { colors } from "../../../theme/colors";
import { useSelector, useDispatch } from "react-redux";
const { width } = Dimensions.get("window");
const cardWidth = width / 2.3;
import actions from "../../../redux/actions";
import { addToCart } from "../../../redux/reducers/cartReducer";
import { showMessage } from "react-native-flash-message";
const Search = ({ navigation }) => {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [search, setSearch] = useState([]);
  const searchRef = useRef();
  const [olData, setOlaData] = useState(); // master search
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      (async () => {
        setIsLoading(true);
        try {
          let res = await actions.product();
          const items = res.list_product.data;
          console.log('====================================');
          console.log(items);
          console.log('====================================');
          setData(items);
          setIsLoading(false);
          setOlaData(items);
        } catch (error) {
          setIsLoading(true);
          console.log("error", error);
        }
      })();
    });
    return willFocusSubscription;
  }, []);
  const onSearch = (text) => {
    if (text == "") {
      setData(olData);
    } else {
      let tempList = data.filter((item) => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-1  pl-5 pr-5">
        <View className="flex-row  justify-center items-center">
          <TextInput
            ref={searchRef}
            style={styles.Input}
            placeholder="Search Store"
            value={search}
            onChangeText={(text) => {
              onSearch(text);
              setSearch(text);
            }}
          ></TextInput>

          <TouchableOpacity className="absolute left-3 top-9 w-6 ">
            <AntDesign size={20} name="search1" />
          </TouchableOpacity>
          {search == "" ? null : (
            <TouchableOpacity
              onPress={() => {
                searchRef.current.clear();
                setSearch("");
              }}
              className="absolute right-11 top-8"
            >
              <Ionicons name="close-circle" color={"#C5C5C5"} size={24} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter");
            }}
            className="justify-center items-center pl-2 pt2"
          >
            <Image
              style={{ resizeMode: "contain" }}
              source={require("../../../accsets/images/filter.png")}
            />
          </TouchableOpacity>
        </View>
        {isLoading ? <ActivityIndicator /> : null}
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.warp}>
            {data.map((item) => {
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

export default Search;

const styles = StyleSheet.create({
  Input: {
    width: "92%",
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 35,
    borderColor: colors.global,
    backgroundColor: colors.global,
    marginTop: 20,
    marginBottom: 10,
    position: "relative",
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
