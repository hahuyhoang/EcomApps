import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window").width;
const { height } = Dimensions.get("window").height;

export default function ErrorScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
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
            <View style={styles.btnClose}>
              <Pressable
                style={styles.close}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image source={require("../../assets/images/image_13.png")} />
            </View>
            <View style={{ alignItems: "center", marginTop: 20, flex: 1 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.TextError}>Oops! Order Failed</Text>
                <Text style={styles.miniText}>Something went tembly wrong</Text>
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.ClickOrder}>
                  <View>
                    <Text style={styles.doneOrder}>Please Try Again</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("HomeScreen");
                    }}
                  >
                    <Text style={styles.doneOrder1}>Back to home</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    shadowOpacity: 2,
  },
  modalView: {
    // flex: 1,
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "70%",
    height: "65%",
    // alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2
    // },
    // shadowOpacity: 1,
    // shadowRadius: 4,
    // elevation: 5,
    justifyContent: "center",
    // position: 'relative',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  close: {
    // flex: 1,
    top: 0,
    // marginTop: "-15%",
    marginLeft: "5%",
  },
  btnClose: {
    flex: 1,
    top: "2%",
    // position: 'absolute'
  },

  TextError: {
    fontFamily: "Gilroy-Light",
    fontSize: 25,
    marginBottom: 5,
  },
  miniText: {
    fontFamily: "Gilroy-Medium",
  },
  doneOrder: {
    fontFamily: "Gilroy-Light",
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
    fontFamily: "Gilroy-Light",
  },
});
