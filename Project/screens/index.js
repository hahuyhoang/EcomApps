import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { cartTotalPriceSelector } from "../redux/reducers/selectorTotal";
import { useDispatch, useSelector } from "react-redux";

const { height } = Dimensions.get('window')
export default function Add({ navigation }) {
  const totalPrice = useSelector(cartTotalPriceSelector);

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
                        <Text style={styles.text}>Select Method</Text>
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
                        <Text style={styles.text}>Pick discount</Text>
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
                        <Text style={{ fontFamily: 'Gilroy-Semi' }}>
                            <Text>Terms</Text>
                            <Text style={styles.textService} > And</Text>
                            <Text> Conditions</Text>
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 2 }}>
                <TouchableOpacity style={styles.placeOder} onPress={() => { navigation.navigate('Accepted') }}>
                    <Text style={styles.textOder} >Place Order</Text>
                </TouchableOpacity>
            </View>
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
    }
})