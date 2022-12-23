import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { cartTotalPriceSelector } from "../redux/reducers/selectorTotal";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Components/Textinput";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "../IPA/Conect";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import Button from "../Components/button";
import LottieView from "lottie-react-native";
import { clear, removeItem } from "../redux/reducers/cartReducer";
import { useStripe } from "@stripe/stripe-react-native";
const { height } = Dimensions.get("window");
export default function Add({ navigation }) {
  const [dataCart, setDataCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const itemCart = useSelector((state) => state.cartReducer); // cái này là list product đã thêm vào giỏ hàng
  const userData = useSelector((state) => state.auth.userData);
  const [modalDone, setModalDone] = useState(false);
  const dispatch = useDispatch();

  const list_cart = [];

  itemCart.forEach((element) => {
    list_cart.push({
      product_id: element.id,
      quantity: element.quantity,
      price: element.price,
    });
  });
  // form data de send cac du lieu can thiet
  const bodyFormdata = new FormData();
  bodyFormdata.append("user_id", userData.user.id);
  bodyFormdata.append("payment_method", "Pay cash");
  bodyFormdata.append("total_payment", totalPrice.toFixed(2));
  bodyFormdata.append("total_payment_sale", totalPrice.toFixed(2));
  bodyFormdata.append("description", "description");
  bodyFormdata.append("status", "order");
  bodyFormdata.append("list_item", JSON.stringify(list_cart));

  const name = userData.user.name;
  const stripe = useStripe();
  const total = totalPrice;
  // console.log(userData);

  const subscrice = async () => {
    try {
      // sending request
      const response = await fetch("http://192.168.1.144:8080/pay", {
        method: "POST",
        body: JSON.stringify({ name, total }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      // Alert.alert("Payment complete, thank you!");

      axios({
        url: `${BASE_URL}/orders`,
        method: "POST",
        data: bodyFormdata,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      })
        .then(function (response) {
          //handle success
          // console.log('send', response);

          if (totalPrice === 0) {
            setModalVisible(true);
          } else {
            setModalDone(true);
            dispatch(clear())
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      // navigation.navigate("Homes")
    } catch (error) {
      console.log(error);
      // Alert.alert("Something went wrong, try again later!");
      setModalVisible(true);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.flexRow, styles.topheader, { flex: 1 }]}>
        <Text style={styles.textHeader}>Checkout</Text>
        <View style={{ marginHorizontal: 15 }}>
          <AntDesign
            name="close"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={[styles.flexRow, styles.Body]}>
          <Text style={styles.textBody}>Delevery</Text>
          <TouchableOpacity style={styles.leftItem}>
            <Text style={styles.text}>Master Card</Text>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.flexRow, styles.Body]}>
          <Text style={styles.textBody}>Payment</Text>
          <TouchableOpacity style={styles.leftItem}>
            <FontAwesome5 name="cc-mastercard" size={24} color="black" />
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.flexRow, styles.Body]}>
          <Text style={styles.textBody}>Promo Code</Text>
          <TouchableOpacity style={styles.leftItem}>
            <Text style={styles.text}>No discount</Text>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.flexRow, styles.Body]}>
          <View>
            <Text style={styles.textBody}>Total Cost</Text>
          </View>
          <TouchableOpacity style={styles.leftItem}>
            <Text style={styles.text}>${totalPrice.toFixed(2)}</Text>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.textService}>
            By placing an order you agree to our
          </Text>
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontFamily: "Gilroy-Semi" }}>
              <Text>Terms</Text>
              <Text style={styles.textService}> And</Text>
              <Text> Conditions</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <TouchableOpacity
          style={styles.placeOder}
          onPress={() => {
            // order(), dispatch(clear());
            subscrice();
          }}
        >
          <Text style={styles.textOder}>Place Order</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.btnClose}>
              <Pressable
                style={styles.close}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image source={require("../../assets/images/image_13.png")} />
            </View>
            <View style={{ alignItems: "center", marginTop: 20, height: 50 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.TextError}>Oops! Order Failed</Text>
                <Text style={styles.miniText}>Something went tembly wrong</Text>
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.ClickOrder}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <View>
                    <Text style={styles.doneOrder}>Please Try Again</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Homes");
                    }}
                  >
                    <Text style={styles.doneOrder1}>Back to home</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDone}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalDone(!modalDone);
        }}
      >
        <ImageBackground
          source={require("../../assets/images/MaskGroup.png")}
          resizeMode="stretch"
          style={{ flex: 1 }}
        >
          <View style={styles.container1}>
            {/* <Text>Accepted</Text> */}
            <LottieView
              style={styles.svg}
              source={require("../../assets/lottie/33886-check-okey-done.json")}
              autoPlay
            />
            <LottieView
              style={styles.svg1}
              source={require("../../assets/lottie/88486-well-done.json")}
              autoPlay
            />
          </View>
          <View style={styles.container2}>
            <View style={styles.TextDone}>
              <Text style={styles.done}>Your Order has been </Text>
              <Text style={styles.done}>accepted</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.minititle}>
                Your items has been placcd and is on
              </Text>
              <Text style={styles.minititle}>is't way to being processed</Text>
            </View>
          </View>
          <View style={styles.container3}>
            <TouchableOpacity
              style={styles.ClickOrder}
              onPress={() => {
                navigation.navigate("Homes");
              }}
            >
              <View>
                <Text style={styles.doneOrder}>Track Order</Text>
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Homes");
                }}
              >
                <Text style={styles.doneOrder1}>Back to home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    marginHorizontal: 15,
    height: height / 2,
    marginTop: 15,
  },
  topheader: {
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor: "#e7e7e7",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textHeader: {
    fontSize: 18,
    fontFamily: "Gilroy-Semi",
    marginBottom: 20,
    marginHorizontal: 15,
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBody: {
    fontSize: 15,
    color: "#7c7c7c",
    marginBottom: 20,
    marginTop: 15,
    fontFamily: "Gilroy-Semi",
  },
  Body: {
    marginTop: 10,
    borderBottomColor: "#e7e7e7",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  text: {
    fontFamily: "Gilroy-Semi",
  },
  textService: {
    color: "#7c7c7c",
    fontFamily: "Gilroy-Semi",
  },
  placeOder: {
    borderWidth: 1,
    alignItems: "center",
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#53b175",
    borderColor: "#53b175",
  },
  textOder: {
    color: "#fff",
    fontFamily: "Gilroy-Semi",
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    // marginTop: 22,
    // shadowOpacity: 2
  },
  modalView: {
    // flex: 1,
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "70%",
    height: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    // position: 'relative',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  close: {
    // flex: 1,
    top: 0,
    // marginTop: "-15%",
    marginLeft: "5%",
  },
  btnClose: {
    // flex: 1,
    top: "2%",
    height: 40,
    // position: 'absolute'
    // backgroundColor: '#cfcfcf'
  },

  TextError: {
    fontFamily: "Gilroy-Light",
    fontSize: 25,
    marginBottom: 5,
  },
  miniText: {
    fontFamily: "Gilroy-Medium",
  },
  doneOrder: {
    fontFamily: "Gilroy-Light",
    fontSize: 20,
    color: "#fff",
  },
  ClickOrder: {
    borderWidth: 1,
    width: "90%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#53b175",
    borderColor: "#53b175",
  },
  doneOrder1: {
    paddingTop: 20,
    fontSize: 20,
    fontFamily: "Gilroy-Light",
  },
  container1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20%",
  },
  svg: {
    width: 300,
    height: 300,
  },
  svg1: {
    width: 400,
    height: 400,
    position: "absolute",
  },
  container2: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  TextDone: {
    alignItems: "center",
  },
  done: {
    fontFamily: "Gilroy-Semi",
    fontSize: 25,
  },
  title: {
    marginTop: 15,
    alignItems: "center",
  },
  minititle: {
    fontFamily: "Gilroy-Medium",
    color: "#7c7c7c",
  },
  container3: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  doneOrder: {
    fontFamily: "Gilroy-Semi",
    fontSize: 20,
    color: "#fff",
  },
  ClickOrder: {
    borderWidth: 1,
    width: "90%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#53b175",
    borderColor: "#53b175",
  },
  doneOrder1: {
    paddingTop: 20,
    fontSize: 20,
    fontFamily: "Gilroy-Semi",
  },
});
