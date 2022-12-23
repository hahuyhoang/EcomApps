import { StyleSheet,Dimensions } from 'react-native'
import { colors } from '../../theme/colors';
const { width } = Dimensions.get("window");
const cardWidth = width / 2.3;
const styles = StyleSheet.create({
    Input: {
        width: "92%",
        borderWidth: 0.5,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 35,
        borderColor: colors.global,
        backgroundColor: colors.global,
        marginTop: 20,
        marginBottom: 10,
        position: "relative",
      },
      warp: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
        marginTop: 10,
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
      checkbox: {
        borderColor: "#000",
        borderWidth: 1,
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        margin: 4,
        borderRadius: 8,
        borderColor: colors.green
      },
      textBox: {
        margin: 7,
        fontWeight:'500',
        color:colors.whites,
        fontSize:15
      },
})
export default styles;