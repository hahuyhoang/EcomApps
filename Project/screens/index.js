import { Dimensions, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { cartTotalPriceSelector } from "../redux/reducers/selectorTotal";
import { useDispatch, useSelector } from "react-redux";
import actions from '../redux/actions';
import { showMessage } from 'react-native-flash-message';
import { showError } from '../utils/helperFunction';
import Input from "../Components/Textinput";
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import axios, { Axios } from 'axios';
import { BASE_URL } from '../IPA/Conect';
import { getProduct } from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height } = Dimensions.get("window");
export default function Add({ navigation }) {
    const [dataCart, setDataCart] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const totalPrice = useSelector(cartTotalPriceSelector);
    const itemCart = useSelector((state) => state.cartReducer) // cái này là list product đã thêm vào giỏ hàng
    const userData = useSelector((state) => state.auth.userData)

    const list_cart = [];

    itemCart.forEach(element => {
        list_cart.push(
            { "product_id": element.id, "quantity": element.quantity, "price": element.price }
        );
    });
    console.log('====================================');
    console.log(list_cart);
    console.log('====================================');

    const bodyFormdata = new FormData()
    bodyFormdata.append('user_id', userData.user.id);
    bodyFormdata.append('payment_method', 'pay pal');
    bodyFormdata.append('total_payment', totalPrice);
    bodyFormdata.append('total_payment_sale', totalPrice);
    bodyFormdata.append('description', 'alssd');
    bodyFormdata.append('status', '444');
    bodyFormdata.append('list_item', JSON.stringify(list_cart));

    useEffect(() => {
console.log('====================================');
console.log();
console.log('====================================');
    }, [])
    const order = () => {

        axios({
            url: `${BASE_URL}/orders`,
            method: 'POST',
            data: bodyFormdata,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData.token}` 
            }
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.flexRow, styles.topheader, { flex: 1 }]}>
                <Text style={styles.textHeader}>Checkout</Text>
                <View style={{ marginHorizontal: 15 }}>
                    <AntDesign name="close" size={24} color="black" onPress={() => { navigation.navigate('Cart') }} />
                </View>
            </View>
            <View style={styles.container}>
                <View style={[styles.flexRow, styles.Body]}>
                    <Text style={styles.textBody}>Delevery</Text>
                    <TouchableOpacity style={styles.leftItem}>
                        <Text style={styles.text}>Pay Cash</Text>
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
                <View className="border-b border-gray-200">
                    <Input style={{ fontFamily: 'Gilroy-Semi' }} placeholder="Address" />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.textService}>
                        By placing an order you agree to our
                    </Text>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Gilroy-Semi' }}>
                            <Text>Terms</Text>
                            <Text style={styles.textService} > And</Text>
                            <Text> Conditions</Text>
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 2 }}>
                <TouchableOpacity style={styles.placeOder} onPress={order}>
                    <Text style={styles.textOder} >Place Order</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.btnClose} >
                            <Pressable style={styles.close} onPress={() => setModalVisible(!modalVisible)}>
                                <Ionicons name="close" size={24} color="black" />
                            </Pressable>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../../assets/images/image_13.png')} />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20, height: 50 }}>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={styles.TextError}>
                                    Oops! Order Failed
                                </Text>
                                <Text style={styles.miniText}>Something went tembly wrong</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={styles.ClickOrder} onPress={() => setModalVisible(!modalVisible)}>
                                    <View>
                                        <Text style={styles.doneOrder}>Please Try Again</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
                                        <Text style={styles.doneOrder1}>Back to home</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 8,
        marginHorizontal: 15,
        height: height / 2,
        marginTop: 15
    },
    topheader: {
        borderBottomWidth: 1,
        marginTop: 20,
        borderBottomColor: '#e7e7e7'

    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textHeader: {
        fontSize: 18,
        fontFamily: 'Gilroy-Semi',
        marginBottom: 20,
        marginHorizontal: 15
    },
    leftItem: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    textBody: {
        fontSize: 15,
        color: '#7c7c7c',
        marginBottom: 20,
        marginTop: 15,
        fontFamily: "Gilroy-Semi"
    },
    Body: {
        marginTop: 10,
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Gilroy-Semi'
    },
    textService: {
        color: '#7c7c7c',
        fontFamily: 'Gilroy-Semi'
    },
    placeOder: {
        borderWidth: 1,
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#53b175',
        borderColor: '#53b175'
    },
    textOder: {
        color: '#fff',
        fontFamily: 'Gilroy-Semi',
        fontSize: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        // marginTop: 22,
        // shadowOpacity: 2
    },
    modalView: {
        // flex: 1,
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: '70%',
        height: '70%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        // position: 'relative',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    close: {

        // flex: 1,
        top: 0,
        // marginTop: "-15%",
        marginLeft: '5%',

    },
    btnClose: {
        // flex: 1,
        top: '2%',
        height: 40,
        // position: 'absolute'
        // backgroundColor: '#cfcfcf'
    },

    TextError: {
        fontFamily: 'Gilroy-Light',
        fontSize: 25,
        marginBottom: 5
    },
    miniText: {
        fontFamily: 'Gilroy-Medium'
    },
    doneOrder: {
        fontFamily: 'Gilroy-Light',
        fontSize: 20,
        color: '#fff'
    },
    ClickOrder: {
        borderWidth: 1,
        width: '90%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#53b175',
        borderColor: '#53b175'
    },
    doneOrder1: {
        paddingTop: 20,
        fontSize: 20,
        fontFamily: 'Gilroy-Light'
    }
})
