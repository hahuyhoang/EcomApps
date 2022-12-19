import React, { useState } from "react";
import { TextInput, Text, View, Icon } from "react-native";
import { colors } from "../theme/colors";
import { StyleSheet } from "react-native";
import { Entypo } from "react-native-vector-icons";

export default function Input({
  label,
  error,
  password,
  styleIcon,
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
        {password && (
          <Entypo
            onPress={() => setHidePassword(!hidepassword)}
            name={hidepassword ? "eye-with-line" : "eye"}
            style={styles.icon}
          />
        )}
      </View>
      {error && (
        <Text style={{ color: colors.red, fontSize: 12 }}>{error}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    marginVertical: 7,
    fontSize: 14,
    color: colors.whites,
  },
  inputContainer: {
    borderRadius: 8,
    flexDirection: "row",
  },
  input: {
    width: "100%",
    height: "100%",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  icon: {
    fontSize: 20,
    position: "absolute",
    right: 5,
    bottom: 10,
  },
});
