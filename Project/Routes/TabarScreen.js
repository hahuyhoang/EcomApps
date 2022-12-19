import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, View } from "react-native";
import Account from "../HomeScreen/Account";
import Cart from "../HomeScreen/Cart";
import Explore from "../HomeScreen/Explore";
import Favorite from "../HomeScreen/Favorite";
import Home from "../HomeScreen/Home/HomeScreen";
import { useSelector } from "react-redux";
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const data = useSelector((state) => state.cartReducer);
  const cart = useSelector((state) => state.cartFavorite);
  return (
    <Tab.Navigator
      initialRouteName="Homes"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#000",
        tabBarActiveTintColor: "#53B175",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: 10,
          paddingBottom: 10,
          height: 65,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          tabBarBackground: "#fff",
          shadowOpacity: 0.15,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Image
                source={require("../../assets/images/home.png")}
                style={{
                  width: 17,
                  height: 16,
                  tintColor: focused ? "#53B175" : "#000",
                }}
              />
              <Text
                style={{
                  fontFamily: "Gilroy-Semi",
                  color: focused ? "#53B175" : "#000",
                  fontSize: 13,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
        name="Homes"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Image
                source={require("../../assets/images/Explore.png")}
                style={{
                  width: 18,
                  height: 12,
                  tintColor: focused ? "#53B175" : "#000",
                }}
              />
              <Text
                style={{
                  fontFamily: "Gilroy-Semi",
                  color: focused ? "#53B175" : "#000",
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                Explore
              </Text>
            </View>
          ),
        }}
        name="Explore"
        component={Explore}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Image
                source={require("../../assets/images/card.png")}
                style={{
                  width: 18,
                  height: 16,
                  tintColor: focused ? "#53B175" : "#000",
                }}
              />
              <View
                className="absolute"
                style={{
                  borderRadius: 10,
                  padding: 1,
                  top: -10,
                  right: -7,
                  width: 17,
                  height: 18,
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>{data.length}</Text>
              </View>
              <Text
                style={{
                  fontFamily: "Gilroy-Semi",
                  color: focused ? "#53B175" : "#000",
                  fontSize: 13,
                }}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Image
                source={require("../../assets/images/head.png")}
                style={{
                  width: 18,
                  height: 15,
                  tintColor: focused ? "#53B175" : "#000",
                }}
              />
              <View
                className="absolute"
                style={{
                  borderRadius: 10,
                  padding: 1,
                  top: -10,
                  right: 10,
                  width: 17,
                  height: 18,
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>{cart.length}</Text>
              </View>
              <Text
                style={{
                  fontFamily: "Gilroy-Semi",
                  color: focused ? "#53B175" : "#000",
                  fontSize: 13,
                }}
              >
                Favourite
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Image
                source={require("../../assets/images/user.png")}
                style={{
                  width: 15,
                  height: 18,
                  tintColor: focused ? "#53B175" : "#000",
                }}
              />
              <Text
                style={{
                  fontFamily: "Gilroy-Semi",
                  color: focused ? "#53B175" : "#000",
                  fontSize: 13,
                }}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
