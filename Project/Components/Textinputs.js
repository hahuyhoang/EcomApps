import React, { useState } from "react";
import { TextInput, Text, View, Icon } from "react-native";
import { colors } from "../theme/colors";
import { StyleSheet } from "react-native";
import { Entypo, FontAwesome5 } from "react-native-vector-icons";

export default function Inputs({
  label,
  error,
  password,
  iconName,
  onForcus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidepassword, setHidePassword] = React.useState(password);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? colors.red
              : isFocused
              ? colors.darkBlue
              : colors.light,
          },
        ]}
      >
        <TextInput
          secureTextEntry={hidepassword}
          style={styles.input}
          autoCorrect={false}
          onFocus={() => {
            onForcus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
        <FontAwesome5
          style={styles.icon}
          size={20}
          color={"green"}
          name={iconName}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    marginVertical: 7,
    fontSize: 15,
    color: colors.whites,
    marginHorizontal: 20,
  },
  inputContainer: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: "#ccc",
    paddingLeft: "9%",
  },
  icon: {
    fontSize: 20,
    position: "absolute",
    right: 5,
    bottom: 10,
  },
  icon: {
    position: "absolute",
    left: "7%",
  },
});
