import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
const { width } = Dimensions.get("window");
const cardWidth = width / 2.3;
const styles = StyleSheet.create({
  Input: {
    width: "100%",
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 35,
    borderColor: colors.global,
    backgroundColor: colors.global,
    marginVertical: 20,
    fontFamily: "Gilroy-Semi",
  },
  btnItem: {
    width: 200,
    marginRight: 10,
    backgroundColor: "#ccc",
    borderRadius: 8,
    marginBottom: 30,
  },
  Text: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Gilroy-Semi",
  },
  slider: {
    // height: "100%"
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.whites,
    margin: 5,
  },
  active: {
    width: 15,
    height: 4,
    borderRadius: 6,
    backgroundColor: colors.green,
    margin: 5,
  },
  Image: {
    width: "100%",
    resizeMode: "cover",
  },
  warp: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    width: cardWidth,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: colors.global,
    marginBottom: 10,
  },
  btn: {
    width: 40,
    height: 40,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    fontFamily: "Gilroy-Bold",
  },
});
export default styles;
