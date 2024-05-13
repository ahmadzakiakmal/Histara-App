import { Image, View } from "react-native";
import FormTextInput from "../FormTextInput";
import { Dispatch, useState } from "react";
import CustomText from "../CustomText";
import Button from "../Button";
import FormDropdown from "../FormDropdown";

export default function SignUpTab() {
  const [name, setName]: [string, Dispatch<string>] = useState("");
  const [email, setEmail]: [string, Dispatch<string>] = useState("");
  const [phoneNumber, setPhoneNumber]: [string, Dispatch<string>] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [work, setWork] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={{ paddingHorizontal: 24, width: "100%", gap: 10, paddingBottom: 40 }}>
      <FormTextInput
        placeholder="Name"
        state={name}
        setState={(text) => {
          setName(text);
        }}
      />
      <FormTextInput
        placeholder="Email"
        state={email}
        setState={(text) => {
          setEmail(text);
        }}
      />
      <FormTextInput
        placeholder="Phone Number"
        state={phoneNumber}
        setState={(text) => {
          setPhoneNumber(text);
        }}
      />
      <FormDropdown
        state={gender}
        setState={(newValue: any) => setGender(newValue)}
        options={[
          { title: "Laki-Laki", value: "Laki-Laki" },
          { title: "Perempuan", value: "Perempuan" },
        ]}
        placeholder="Gender"
      />
      <FormTextInput
        placeholder="Work"
        state={work}
        setState={(text) => {
          setWork(text);
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
      <FormTextInput
        placeholder="Confirm Password"
        state={confirmPassword}
        setState={(text) => {
          setConfirmPassword(text);
        }}
        type="password"
      />
      <Button text="SIGN UP" />

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
