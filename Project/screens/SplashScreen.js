import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../theme/colors";
import LottieView from "lottie-react-native";
export default function SplashScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);
  useEffect(() => {
    if (loading) {
      navigation.replace("Onbording");
    }
  }, [loading]);
  return (
    <View style={styles.main}>
      <Image
        style={styles.Image}
        source={require("../accsets/images/Screen.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    resizeMode: "contain",
    height: 55,
  },
});
