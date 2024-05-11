import { Colors } from "@/constants/Colors";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  text: string;
  style?: object[];
  onPress: () => any;
}

export default function Button({
  style,
  text,
  onPress = () => {
    console.log("Clicked");
  },
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[{ backgroundColor: Colors.orange.main, width: "100%", borderRadius: 8 }, style]}
      onPress={() => onPress()
      }
    >
      <Text style={{ color: "#FFF", paddingVertical: 9, textAlign: "center", fontFamily: "PoppinsBold", fontSize: 16 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
