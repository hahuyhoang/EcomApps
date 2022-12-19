import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import actions from '../redux/actions';
import { colors } from '../theme/colors';
import { Image } from 'react-native';
import { FlatList } from 'react-native';

const ItemOrders = () => {
    const userData = useSelector((state) => state.auth.userData);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [odersData, setOrdersData] = useState([])
    const itemOrder = []
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                let res = await actions.getOrders();
                
                let dataOrders = res.data
                dataOrders.forEach(element => {
                    // itemOrder.push(element.order_detail)
                });
                setData(data)
            } catch (error) {

                console.log("error", error);
            }
        })();
    }, []);
    const renderItems = ({ item, index }) => {
        return (
            <View className="  border-b justify-center pl-5 pr-5  border-gray-300">
                <View
                    style={styles.horizon}
                    className="flex-row  justify-between items-center"
                >
                    <View className="flex-row h-24 items-center justify-center">
                        <Image
                            className=" h-full"
                            style={{ resizeMode: "contain" }}
                        // source={require("../../../accsets/images/product_1.png")}
                        />
                        <View className="pl-7">
                            <Text style={{ fontFamily: "Gilroy-Bold", fontSize: 15 }}>
                                aaaaaa
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Gilroy-Medium",
                                    fontSize: 15,
                                    color: "#7c7c7c",
                                }}
                            >
                                325ml, Price
                            </Text>
                        </View>
                    </View>
                    <View className="h-full items-center">
                        <Text
                            style={{
                                fontFamily: "Gilroy-Semi",
                                fontSize: 15,
                                marginVertical: 20,
                            }}
                        >
                            $
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Gilroy-Semi",
                                fontSize: 15,
                                marginTop: "20%",
                            }}
                        >
                            x1
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={renderItems}
                keyExtractor={(item) => `key-${item.id}`}
            />
        </SafeAreaView>
    )
}

export default ItemOrders

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
        justifyContent: "center",
    },
    text: { fontFamily: "Gilroy-Semi" },
    Button: {
        width: "90%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.green,
        borderRadius: 16,
        marginBottom: 20,
    },
    Textbtn: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "600",
    },
    price: {
        position: "absolute",
        paddingHorizontal: 4,
        paddingVertical: 4,
        backgroundColor: "#489E67",
        borderRadius: 4,
    },
})