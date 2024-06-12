import { Image, Platform, Pressable, View } from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slice/authSlice";
import { setUser, setPoint } from "@/redux/slice/userSlice";
import FormTextInput from "../FormTextInput";
import { Dispatch, useState } from "react";
import CustomText from "../CustomText";
import Button from "../Button";
import FormDropdown from "../FormDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function SignInTab() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail]: [string, Dispatch<string>] = useState("poc@histara.id");
  const [password, setPassword] = useState("esempe");

  const handleSignIn = () => {
    axios
      .post(process.env.EXPO_PUBLIC_BACKEND_URL + "/v1/user/login", {
        email,
        password
      })
      .then((res) => {
        const cookies = res.headers["set-cookie"];

        if (cookies) {
          const authTokenCookie = cookies.find((cookie) =>
            cookie.startsWith("AuthToken=")
          );

          if (authTokenCookie) {
            const authToken = authTokenCookie.split("=")[1].split(";")[0];
            dispatch(setToken(authToken));
            dispatch(setUser(res.data.user));
            dispatch(setPoint(res.data.points));
            router.navigate("home");
            console.log("Login success!");
          } else {
            console.log("AuthToken not found");
          }
        } else {
          console.log("Cookies not found in the response");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <Button text="SIGN IN" onPress={() => handleSignIn()} />

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
