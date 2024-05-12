import { View } from "react-native";
import FormTextInput from "../FormTextInput";
import { Dispatch, useState } from "react";
import CustomText from "../CustomText";
import Button from "../Button";

export default function SignUpTab() {
  const [name, setName]: [string, Dispatch<string>] = useState("");
  const [email, setEmail]: [string, Dispatch<string>] = useState("");
  const [phoneNumber, setPhoneNumber]: [string, Dispatch<string>] = useState("");
  const [biurthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [work, setWork] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={{ paddingHorizontal: 24, width: "100%", gap: 10 }}>
      <FormTextInput
        placeholder="Name"
        state={name}
        setState={(text) => {
          setName(text)
        }}
      />
      <FormTextInput
        placeholder="Email"
        state={email}
        setState={(text) => {
          setEmail(text)
        }}
      />
      <FormTextInput
        placeholder="Phone Number"
        state={phoneNumber}
        setState={(text) => {
          setPhoneNumber(text)
        }}
      />
      <FormTextInput
        placeholder="Work"
        state={work}
        setState={(text) => {
          setWork(text)
        }}
      />
      <FormTextInput
        placeholder="Password"
        state={password}
        setState={(text) => {
          setPassword(text)
        }}
      />
      <FormTextInput
        placeholder="Confirm Password"
        state={confirmPassword}
        setState={(text) => {
          setConfirmPassword(text)
        }}
      />
      <Button text="SIGN UP" />
    </View>
  );
}
