import { Image, Platform, Pressable, View } from "react-native";
import FormTextInput from "../FormTextInput";
import { Dispatch, useState } from "react";
import CustomText from "../CustomText";
import Button from "../Button";
import FormDropdown from "../FormDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import axios from "axios";

export default function SignUpTab() {
  const [name, setName]: [string, Dispatch<string>] = useState("");
  const [email, setEmail]: [string, Dispatch<string>] = useState("");
  const [phoneNumber, setPhoneNumber]: [string, Dispatch<string>] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState("");
  const [work, setWork] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [open, setOpen] = useState(false);

  const router = useRouter()

  const handleClick = () => {
    // SAMPLE HANDLER FOR PASSWORD MISSMATCH
    if(password !== confirmPassword) {
      console.log("Password not match!")
      return
    }

    axios.post(process.env.EXPO_PUBLIC_BACKEND_URL + "/v1/user/register", {
      name,
      email,
      phoneNumber,
      birthday,
      gender,
      work,
      password,
    })
    .then((res) => {
      console.log(res);
      console.log("Register success!")
      router.navigate("home")
    })
    .catch((err) => {
      console.log(err);
    })
  }

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
      {/* TODO: ADDING CONSTRAINT TO FORCE ONLY NUMBER AND NOT STARTING WITH 0 */}
      <FormTextInput
        placeholder="Phone Number"
        state={phoneNumber}
        setState={(text) => {
          setPhoneNumber(text);
        }}
      />
      <Pressable
        style={{
          borderColor: Colors.orange.main,
          borderWidth: 2,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingTop: 10,
          paddingBottom: 8,
          flexDirection: "row",
        }}
        onPress={() => setOpen(true)}
      >
        <CustomText
          weight={700}
          style={[
            { color: new Date(birthday).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) ? "#DADADA" : "#000", flex: 1 },
          ]}
        >
          {new Date(birthday).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
            ? "Birthday"
            : birthday.toDateString()}
        </CustomText>
        <Image source={require("@/assets/images/CeretDown.png")} style={{width: 30 }} />
      </Pressable>
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthday}
          // mode={mode}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || birthday;
            setOpen(Platform.OS === "ios");
            setBirthday(currentDate);
          }}
        />
      )}

      <FormDropdown
        state={gender}
        setState={(newValue: any) => setGender(newValue.value)}
        options={[
          { title: "Laki-Laki", value: "LAKI-LAKI" },
          { title: "Perempuan", value: "PEREMPUAN" },
        ]}
        placeholder="Gender"
      />
      <FormDropdown
        placeholder="Work"
        state={work}
        setState={(newValue: any) => {
          setWork(newValue.value);
        }}
        options={[
          { title: "Mahasiswa", value: "MAHASISWA" },
          { title: "SMA", value: "SMA" },
          { title: "SMP", value: "SMP" },
          { title: "SD", value: "SD" },
          { title: "Pengajar", value: "PENGAJAR" },
          { title: "Wiraswasta", value: "WIRASWASTA" },
          { title: "Karyawan", value: "KARYAWAN" },
          { title: "Lainnya", value: "LAINNYA" },
        ]}
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
      <Button text="SIGN UP" style={[{flex: 1}]} onPress={() => {handleClick()}} />

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
