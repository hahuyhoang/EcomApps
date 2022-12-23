import {
  Image,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Text,
  Modal,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Ionicons, AntDesign, Entypo } from "react-native-vector-icons";
import { colors } from "../../../theme/colors";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../../../redux/reducers/cartReducer";
import { showMessage } from "react-native-flash-message";
import { BASE_URL } from "../../../IPA/Conect";
import Button from "../../../Components/button";
import styles from "../styles";
import actions from "../../../redux/actions";

const Search = ({ navigation }) => {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [search, setSearch] = useState([]);
  const searchRef = useRef();
  const [olData, setOlaData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const dataCate = useSelector((state) => state.categories.categories);
  const dataCategory = dataCate.list_category;
  const [dataBrand,setDataBrand] = useState([])
  const [checkBrand,setCheckBrand]=useState([])
  const categoryId = checked.toString();
  const BrandId = checkBrand.toString()
  useEffect(() => {
    (async () => {
        setIsLoading(true)
        try {
          let res = await actions.brand();
          const items = res.list_brand;
          items.forEach((element) => {
          });
          setIsLoading(false)
          setDataBrand(items);
        } catch (error) {
          setIsLoading(true)
          console.log("error", error);
        }
      })();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/products/filter-search?textSearch=&category=${categoryId}&brand=${BrandId}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then((res) => {
        let data = res.data.list_product.data;
        setData(data);
        setOlaData(data);
        setIsLoading(false);
      });
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
  const onChangeValue = (id) => {
    let index = checked.findIndex((i) => i === id);
    let arr = [...checked];
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(id);
    }
    setChecked(arr);
  };
  const onChangeValueBrand = (id) => {
    let index = checkBrand.findIndex((i) => i === id);
    let arr = [...checkBrand];
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(id);
    }
    setCheckBrand(arr);
  };
  const submitValue = () => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/products/filter-search?textSearch=&category=${categoryId}&brand=${BrandId}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then((res) => {
        let data = res.data.list_product.data;
        setData(data);
        setOlaData(data);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-1  pl-5 pr-5">
        <View className="flex-row mb-2  justify-center items-center">
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
            onPress={() => setModalVisible(true)}
            className="justify-center items-center pl-2 pt-2"
          >
            <Image
              style={{ resizeMode: "contain" }}
              source={require("../../../accsets/images/filter.png")}
            />
          </TouchableOpacity>
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
                  <View className="pb-4 pt-1 flex-row justify-between">
                    <View className="justify-center items-center">
                      <Text style={{ fontFamily: "Gilroy-Semi" }}>
                        $ {item.price.toFixed(2)}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 ">
            <View className="flex-row justify-center pt-6 pb-6">
              <TouchableOpacity
                className="absolute left-4 top-5"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="close" size={28} />
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Filters</Text>
              </View>
            </View>
            <View style={styles.filter}>
              <Text style={styles.text}>Categories</Text>
              {dataCategory.map((item) => {
                return (
                  <View key={item.id}>
                    <View className="flex-row">
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          {
                            backgroundColor:
                              checked.findIndex((i) => i === item.id) !== -1
                                ? "#53B175"
                                : "#fff",
                          },
                        ]}
                        onPress={() => {
                          onChangeValue(item.id);
                        }}
                      >
                        {checked.findIndex((i) => i === item.id) !== -1 ? (
                          <Entypo name="check" size={20} color="#fff" />
                        ) : null}
                      </TouchableOpacity>
                      <Text style={styles.textBox}>{item.name}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={styles.filter}>
              <Text style={styles.text}>Brand</Text>
              {dataBrand.map((item) => {
                return (
                  <View key={item.id}>
                    <View className="flex-row">
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          {
                            backgroundColor:
                            checkBrand.findIndex((i) => i === item.id) !== -1
                                ? "#53B175"
                                : "#fff",
                          },
                        ]}
                        onPress={() => {
                          onChangeValueBrand(item.id);
                        }}
                      >
                        {checkBrand.findIndex((i) => i === item.id) !== -1 ? (
                          <Entypo name="check" size={20} color="#fff" />
                        ) : null}
                      </TouchableOpacity>
                      <Text style={styles.textBox}>{item.name}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View
              style={{ backgroundColor: "#F2F3F2" }}
              className="items-center"
            >
              <Button
                onPress={() => [submitValue(), setModalVisible(!modalVisible)]}
                title={"Apply Filter"}
                buttonStyle={styles.Button}
                textStyle={styles.Textbtn}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
export default Search;
