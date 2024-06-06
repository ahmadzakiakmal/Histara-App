import { Colors } from "@/constants/Colors";
import { TextInput, View } from "react-native";

interface Props {
  state: string;
  setState: (newText: string) => any;
  placeholder?: string;
  type?: "text" | "password" | "email";
  style?: object;
}

export default function FormTextInput({
  state,
  setState = (newText) => {
    console.log(newText);
  },
  placeholder = "Placeholder",
  type = "text",
  style,
}: Props) {
  let keyboardType = "default";
  let autoComplete = "off";
  let autoCapitalize = "none";

  if (type === "email") {
    keyboardType = "email-address";
    autoComplete = "email";
  } else if (type === "password") {
    autoCapitalize = "none"; // passwords should not auto capitalize
    autoComplete = "password";
  } else if (type === "text") {
    autoCapitalize = "sentences"; // capitalize the first letter of each sentence
  }

  return (
    <View>
      <TextInput
        value={state}
        onChangeText={(newText) => setState(newText)}
        placeholder={placeholder}
        // keyboardType={keyboardType}
        // autoCapitalize={autoCapitalize}
        // autoComplete={autoCapitalize}
        style={[
          {
            borderColor: Colors.orange.main,
            borderWidth: 2,
            borderRadius: 8,
            fontFamily: "PoppinsBold",
            paddingHorizontal: 8,
            paddingTop: 10,
            paddingBottom: 8,
            fontSize: 16,
            color: "#000",
          },
          style,
        ]}
        placeholderTextColor="#DADADA"
        secureTextEntry={type === "password"}
      />
    </View>
  );
}
