import CustomText from "@/components/CustomText";
import FormDropdown from "@/components/FormDropdown";
import FormTextInput from "@/components/FormTextInput";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Dispatch, useEffect, useState } from "react";
import { Image, Platform, Pressable, ScrollView, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MiniButton from "@/components/MiniButton";
import Button from "@/components/Button";

export default function EditProfileScreen() {
  const profilePictures = [
    require("@/assets/images/profile/1.png"),
    require("@/assets/images/profile/2.png"),
    require("@/assets/images/profile/3.png"),
    require("@/assets/images/profile/4.png"),
  ];
  const [random, setRandom] = useState(0);
  useEffect(() => {
    setRandom(Math.floor(Math.random() * 3) + 1);
  }, []);
  const [name, setName]: [string, Dispatch<string>] = useState("");
  const [email, setEmail]: [string, Dispatch<string>] = useState("");
  const [phoneNumber, setPhoneNumber]: [string, Dispatch<string>] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState("");
  const [work, setWork] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <View style={{ flex: 1 }}>
      <Header title="Edit Profile" />
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#FFF", paddingTop: 15, paddingHorizontal: 22 }}>
        <View style={[gs.ic]}>
          <View style={{ backgroundColor: "#DADADA", width: 83, height: 83, borderRadius: 9999, overflow: "hidden" }}>
            <Image
              source={profilePictures[random]}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <CustomText
            weight={500}
            italic={true}
            style={[{ color: "#0060FF" }]}
          >
            Edit Profile
          </CustomText>
        </View>
        <View style={{ gap: 10, marginTop: 21 }}>
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
          <View style={[gs.flexRow, gs.ic, { width: "auto", alignSelf: "stretch" }]}>
            <CustomText
              weight={700}
              style={[{ width: "10%", textAlign: "center" }]}
            >
              62
            </CustomText>
            <View style={{ width: "90%" }}>
              <FormTextInput
                placeholder="Phone Number"
                state={phoneNumber}
                setState={(text) => {
                  setPhoneNumber(text);
                }}
              />
            </View>
          </View>
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
                {
                  color:
                    new Date(birthday).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) ? "#DADADA" : "#000",
                  flex: 1,
                },
              ]}
            >
              {new Date(birthday).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
                ? "Birthday"
                : birthday.toDateString()}
            </CustomText>
            <Image
              source={require("@/assets/images/CeretDown.png")}
              style={{ width: 30 }}
            />
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
          <Button onPress={() => {console.log("Save")}} text="Save" />
        </View>
      </ScrollView>
    </View>
  );
}
