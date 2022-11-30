import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Register from "../Register";
import Home from "../HomeScreen/Home/HomeScreen";
import MyTabs from "./TabarScreen";
import ProductDetail from "../HomeScreen/Home/Productdetail";
import Add from "../screens";
import Accepted from "../screens/DoneCheckOut";
import Profile from "../screens/Profile";
import LogIn from "../Login";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useSelector } from "react-redux";
import ForgotEmail from "../Forgot/forgotEmail";
import Verification from "../Forgot/Verification";
import ForgotPassword from "../Forgot/ForgotPassword";

const Stack = createNativeStackNavigator();

function MyStack() {
  const userData = useSelector((state) => state.auth.userData)
  // console.log("user datasss", userData.token);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          !!userData && userData?.token ?
            MainStack(Stack) : AuthStack(Stack)

        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MyStack;
