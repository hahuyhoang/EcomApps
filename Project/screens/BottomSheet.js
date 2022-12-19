import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// const { height } = Dimensions.get('window')
export default function BottomSheet({ navigation }) {
  return (
    <SafeAreaView style={{ height: 500, backgroundColor: "#ccc" }}>
      <View className="justify-center items-center">
        <Text style={styles.textHeader}>Upload Photo</Text>
        <Text>choose Your profile picture</Text>
      </View>

      <View style={{ flex: 2 }}>
        <TouchableOpacity
          style={styles.placeOder}
          onPress={() => {
            navigation.navigate("Accepted");
          }}
        >
          <Text style={styles.textOder}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
