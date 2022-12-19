import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    // marginTop:'140%',
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  horizon: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  btnCamera: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 12,
    backgroundColor: "#53b175",
    marginBottom: 10,
  },
  btn: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 12,
    backgroundColor: "#53b175",
    marginBottom: 10,
  },

  text: {
    fontFamily: "Gilroy-Semi",
    color: "#fff",
    fontSize: 18,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 15,
    color: colors.whites,
    paddingVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    resizeMode: "cover",
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  modalView: {
    marginTop: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: 500,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  camera: {
    flex: 5,
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
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  date: {
    width: "90%",
  },
  label: {
    marginVertical: 10,
    fontSize: 15,
    color: colors.whites,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  checkbox: {
    margin: 4,
  },
  TextCb: {
    margin: 4,
    fontSize: 14,
    color: colors.whites,
  },
  date: {
    width: "90%",
    borderWidth: 1,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "#ccc",
  },
  dateTimePicker: {
    height: "100%",
  },
});
export default styles;
