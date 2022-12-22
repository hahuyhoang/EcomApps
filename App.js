import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./Project/Routes/StackNavigator";
import Account from "./Project/HomeScreen/Account";
import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";
import store from "./Project/redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "./Project/utils/utils";
import { saveUserData } from "./Project/redux/actions/auth";
import { StripeProvider } from "@stripe/stripe-react-native";
export default function App() {
  // {save token de luu dang nhap}
  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      if (!!userData) {
        saveUserData(userData);
      }
    })();
  }, []);

  // tao font cho app
  let [fontsLoaded] = useFonts({
    "Gilroy-Semi": require("./assets/font/Gilroy-SemiBold.ttf"),
    "Gilroy-Bold": require("./assets/font/SVN-GilroyBold.otf"),
    "Gilroy-ExtraBold": require("./assets/font/Gilroy-ExtraBold.otf"),
    "Gilroy-Light": require("./assets/font/Gilroy-Light.otf"),
    "Gilroy-Regula": require("./assets/font/Gilro-Regular.otf"),
    "Gilroy-Medium": require("./assets/font/SVN-GilroyMedium.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider style={{ flex: 1 }} store={store}>
      <StripeProvider publishableKey="pk_test_51MFCsgGCXQDGwaNcbB8ZsUdoKYvEz2BxdmnWXmW9qOCzTQhAFPJRGLdtnWcD56tdDOdUztWrHQArvuIVE8AVN6fB008RuXJUrh">
        <MyStack />
        <FlashMessage position="top" />
      </StripeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
