import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { Component, useContext, useState } from "react";
const { WIDTH, HEIGHT } = Dimensions.get("window");

const Onbording = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../accsets/images/back.jpg")}
        resizeMode="cover"
      >
        <View style={{ flex: 2 }}></View>
        <Image
          style={styles.logo}
          source={require("../accsets/images/baner.png")}
        />
        <View style={styles.body}>
          <Text style={styles.firstTitle}>Welcome</Text>
          <Text style={styles.secondTitle}>to our store</Text>
          <Text style={styles.title}>
            Ger your groceries in as fast as one hour
          </Text>
          <TouchableOpacity
            style={styles.getstarted}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.text}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Onbording;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
  },
  background: {
    width: "100%",
    height: "100%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 60,
    resizeMode: "contain",
  },
  body: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    marginBottom: 60,
    paddingVertical: 20,
  },
  firstTitle: {
    color: "white",
    fontSize: 40,
    fontFamily: "Gilroy-Light",
  },
  secondTitle: {
    color: "white",
    justifyContent: "center",
    fontSize: 40,
    fontFamily: "Gilroy-Light",
  },
  title: {
    color: "#c6bdb7",
    fontSize: 14,
    fontFamily: "Gilroy-Light",
  },
  getstarted: {
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 60,
    borderRadius: 16,
    marginVertical: 30,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
