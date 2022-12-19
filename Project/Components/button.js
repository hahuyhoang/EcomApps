import React from "react";
import { Share, Text, TouchableOpacity } from "react-native";

export default function Button({
  title,
  buttonStyle,
  textStyle,
  onPress,
  labelStyle,
  label,
}) {
  return (
    <TouchableOpacity
      className="flex-row"
      style={buttonStyle}
      onPress={onPress}
    >
      <Text style={textStyle}>{title}</Text>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
