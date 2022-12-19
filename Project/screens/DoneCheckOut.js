import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Accepted({ navigation }) {
  return (
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
        <TouchableOpacity style={styles.ClickOrder}>
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
  );
}

const styles = StyleSheet.create({
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
