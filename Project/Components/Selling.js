import React, { useEffect, useState, createContext } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { colors } from "../theme/colors";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const cardWidth = width / 2.4 - 4;
import actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { SafeAreaView } from "react-native-safe-area-context";

const Product = ({ }) => {
    const userData = useSelector((state) => state.auth.userData);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                let res = await actions.bestselling();
                const items = res.data;

                // console.log(items);
                setData(items);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(true)
                console.log("error", error);
            }
        })();
    }, []);
    // console.log(data);
    return (
        <>
            <View className="flex-row">
                {data.map((dataProDuct) => {
                    const item = dataProDuct.product
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
                                    <Text style={{ fontFamily: "Gilroy-Bold" }}>{item.name}</Text>
                                    <Text style={{ color: colors.whites, paddingVertical: 4 }}>
                                        {item.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View className="pb-4 pt-4 flex-row justify-between">
                                <View className="justify-center items-center">
                                    <Text style={{ fontFamily: "Gilroy-Semi" }}>${item.price}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => dispatch(addToCart(item))}
                                >
                                    <Ionicons size={25} color={"#fff"} name="add" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </View>
            {isLoading ? <ActivityIndicator /> : null}
        </>
    );
};
export default Product;
const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderColor: colors.global,
        marginBottom: 10,
        // marginHorizontal: 5,
        marginRight: 10,
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
