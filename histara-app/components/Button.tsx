import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  text: string;
  style?: object[];
  textStyle?: object[];
  onPress?: () => any;
  disabled?: boolean;
}

export default function Button({
  style,
  text,
  textStyle,
  disabled = false,
  onPress = () => {
    console.log("Pressed");
  },
}: ButtonProps) {
  const [touched, setTouched] = useState(false);
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: Colors.orange.main, width: "100%", borderRadius: 8, paddingVertical: 9 },
        style,
        touched && buttonStyles.touched,
      ]}
      onPress={() => {
        if(!disabled) {
          onPress();
        }
      }}
      onPressIn={() => {
        if(!disabled) {
          setTouched(true);
        }
      }}
      onPressOut={() => {
        setTouched(false);
      }} 
    >
      <Text style={[{ color: "#FFF", textAlign: "center", fontFamily: "PoppinsBold", fontSize: 16, lineHeight: 1.4 * 16 }, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  touched: { backgroundColor: Colors.orange.dark, opacity: 1 },
});
 