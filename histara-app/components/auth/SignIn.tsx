import { Image, Platform, Pressable, View } from "react-native";
import FormTextInput from "../FormTextInput";
import { Dispatch, useState } from "react";
import CustomText from "../CustomText";
import Button from "../Button";
import FormDropdown from "../FormDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function SignInTab() {
  const [email, setEmail]: [string, Dispatch<string>] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  return (
    <View style={{ paddingHorizontal: 24, width: "100%", gap: 10, paddingBottom: 40 }}>
      <FormTextInput
        placeholder="Email"
        state={email}
        setState={(text) => {
          setEmail(text);
        }}
      />
      <FormTextInput
        placeholder="Password"
        state={password}
        setState={(text) => {
          setPassword(text);
        }}
        type="password"
      />
      <Button text="SIGN IN" onPress={() => router.navigate("profile")} />

      <View
        style={{
          marginTop: 20,
          borderColor: "#DADADA",
          borderWidth: 2,
          width: "100%",
          borderRadius: 6,
          paddingVertical: 37,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          paddingHorizontal: 9,
        }}
      >
        <Image
          source={require("@/assets/images/Handshake.png")}
          style={{ position: "absolute", top: 0, transform: [{ translateY: -37 }] }}
          width={74}
          height={74}
        />
        <CustomText
          weight={700}
          style={[{ color: "#DADADA", fontSize: 18 }]}
        >
          We Promise
        </CustomText>
        <CustomText
          weight={400}
          style={[{ color: "#828282", textAlign: "center", fontSize: 12 }]}
        >
          We respect your privacy and will never share your email with 3rd parties
        </CustomText>
      </View>
    </View>
  );
}
