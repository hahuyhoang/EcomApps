import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign, Entypo } from "react-native-vector-icons";

export default function Rating() {
  const [defaultRating, setdefaultRating] = useState(1);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const startImgFilled =
  "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const startImgCorner = 
  "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setdefaultRating(item)}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? { uri: startImgFilled }
                    : { uri: startImgCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View>
      <CustomRatingBar />
    </View>
  );
}

const styles = StyleSheet.create({
  customRatingBarStyle: {
    flexDirection: "row",
  },
  starImgStyle: {
    width: 18,
    height: 18,
    resizeMode: "cover",
    margin: 2,
  },
});
