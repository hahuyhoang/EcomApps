import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import { colors } from "../../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
const width = Dimensions.get("window").width;
const cardWidth = width / 2 - 30;
import actions from "../../redux/actions";
import { useSelector } from "react-redux";

const Explore = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
    setIsLoading(true)
      try {
        let res = await actions.Categories();
        const items = res.list_category;
        items.forEach((element) => {
          // console.log("search", element);
        });
        setData(items);
        setIsLoading(false)
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);
  return (
    <SafeAreaView className="flex-1 mb-16 bg-white">
      <View className="flex-1 pl-5 pr-5 ">
        <View className=" pt-4 pb-4 ml-1 mr-1">
          <TouchableOpacity className="absolute left-0 top-4">
            <Ionicons name="share-outline" size={24} />
          </TouchableOpacity>
          <View className="justify-center items-center ">
            <Text style={{ fontSize: 16, fontFamily: "Gilroy-Semi" }}>
              Find Products
            </Text>
          </View>
        </View>
        <View className="flex-row ml-1 mr-1">
          <TouchableOpacity
            className="w-full"
          >
            <TextInput
              onPressIn={() => {
                navigation.navigate("Search");
              }}
              style={styles.Input}
              placeholder="Search Store"
            ></TextInput>
          </TouchableOpacity>
          <TouchableOpacity className="absolute left-3 top-9  w-6  ">
            <AntDesign size={20} name="search1" />
          </TouchableOpacity>
        </View>
        {isLoading ? <ActivityIndicator color="green"/> : null}
        <ScrollView className="-mt-4 " showsVerticalScrollIndicator={false}>
          <View style={styles.warp}>
            {data.map((item) => {
              return (
                <View className="justify-between" key={item.id}>
                  <View
                    style={styles.container}
                    backgroundColor={item.background}
                    borderColor={item.border_color}
                  >
                    <TouchableOpacity
                       onPress={() => {
                        navigation.navigate("Beverages",{
                          paramKey : item,
                        });
                      }}
                    >
                      <View className="justify-center items-center">
                        <Image
                          style={{
                            resizeMode: "contain",
                            width: "100%",
                            height: "70%",
                          }}
                          source={{ uri: `${userData.url}/${item.media.url}` }}
                        />
                      </View>
                      <View className=" pl-4 pr-4 items-center justify-center">
                        <Text
                          style={{ fontFamily: "Gilroy-Semi" }}
                          className="font-semibold "
                        >
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  Input: {
    width: "100%",
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 40,
    borderColor: colors.global,
    backgroundColor: colors.global,
    marginVertical: 20,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  warp: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    width: cardWidth,
    height: cardWidth + 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: colors.global,
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: "#EEF7F1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
