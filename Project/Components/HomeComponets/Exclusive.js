import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import Product from "../Products";
import { useNavigation } from "@react-navigation/native";
import ExclusiveProDucts from "../exClusive";

const Exclusive = ({}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-row pt-5 pb-5 justify-between">
        <TouchableOpacity className="font-semibold">
          <Text style={styles.Text}>Exclusive Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AllExclusive");
          }}
        >
          <Text style={{ color: colors.green }}> See all </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <ExclusiveProDucts />
      </ScrollView>
    </View>
  );
};

export default Exclusive;

const styles = StyleSheet.create({
  Text: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Gilroy-Semi",
  },
});
