import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from "../../../Components/button";
import { colors } from "../../../theme/colors";

const Filter = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 ">
        <View className="flex-row justify-center pt-6 pb-6">
          <TouchableOpacity
            className="absolute left-4 top-5"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="close" size={28} />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Filters</Text>
          </View>
        </View>
        <View style={styles.filter}>
          <Text style={styles.text}>Categories</Text>
          <BouncyCheckbox
            size={25}
            fillColor="#53B175"
            text="Eggs"
            iconStyle={{ borderColor: "#ccc" }}
            textStyle={{
              textDecorationLine: "none",
              paddingVertical: 10,
            }}
            onPress={() => {}}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#53B175"
            text="Noodles & Pasta"
            textStyle={{
              textDecorationLine: "none",
              paddingVertical: 10,
            }}
            onPress={() => {}}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#53B175"
            text="Chips & Crisps"
            textStyle={{
              textDecorationLine: "none",
              paddingVertical: 10,
            }}
            onPress={() => {}}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#53B175"
            text="Fast Food"
            iconStyle={{ borderColor: "#ccc" }}
            textStyle={{
              textDecorationLine: "none",
              paddingVertical: 10,
            }}
            onPress={() => {}}
          />
          <View>
            <Text style={styles.text}>Brand</Text>
            <BouncyCheckbox
              size={25}
              fillColor="#53B175"
              text="Individual Callection"
              iconStyle={{ borderColor: "#ccc" }}
              textStyle={{
                textDecorationLine: "none",
                paddingVertical: 10,
              }}
              onPress={() => {}}
            />
            <BouncyCheckbox
              size={25}
              fillColor="#53B175"
              text="Cocola"
              textStyle={{
                textDecorationLine: "none",
                paddingVertical: 10,
              }}
              onPress={() => {}}
            />
            <BouncyCheckbox
              size={25}
              fillColor="#53B175"
              text="Ifad"
              textStyle={{
                textDecorationLine: "none",
                paddingVertical: 10,
              }}
              onPress={() => {}}
            />
            <BouncyCheckbox
              size={25}
              fillColor="#53B175"
              text="Kazi Farmas"
              iconStyle={{ borderColor: "#ccc" }}
              textStyle={{
                textDecorationLine: "none",
                paddingVertical: 10,
              }}
              onPress={() => {}}
            />
          </View>
        </View>
        <View style={{ backgroundColor: "#F2F3F2" }} className="items-center">
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            title={"Apply Filter"}
            buttonStyle={styles.Button}
            textStyle={styles.Textbtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filter: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F2F3F2",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 20,
  },
  Button: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 12,
    marginBottom: 20,
  },
  Textbtn: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "600",
  },
});
