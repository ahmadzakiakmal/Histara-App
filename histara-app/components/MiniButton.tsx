import { Pressable } from "react-native";
import CustomText from "./CustomText";
import { useState } from "react";

interface Props {
  text: string;
  style?: object[];
  onPress: () => void;
}

export default function MiniButton({ text, style, onPress = () => {} }: Props) {
  const [touched, setTouched] = useState(false);

  return (
    <Pressable
      style={[{ backgroundColor: touched ? "#BABABA" : "#DADADA", borderRadius: 8, paddingVertical: 2.5 }, style]}
      onPress={onPress}
      onPressIn={() => setTouched(true)}
      onPressOut={() => setTouched(false)}
    >
      <CustomText
        weight={400}
        style={[{ textAlign: "center" }]}
      >
        {text}
      </CustomText>
    </Pressable>
  );
}
