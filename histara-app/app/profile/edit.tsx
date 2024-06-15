import CustomText from "@/components/CustomText";
import FormDropdown from "@/components/FormDropdown";
import FormTextInput from "@/components/FormTextInput";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Dispatch, useEffect, useState } from "react";
import { Image, Platform, Pressable, ScrollView, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MiniButton from "@/components/MiniButton";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/slice/userSlice";
import { getToken } from "@/redux/slice/authSlice";
import axios from "axios";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
  work: string;
  profilePicture: number;
}

/*
  TODO: MAP BIRTHDAY AND PHONE NUMBER TO INPUT FORM, ADD HANDLER CHANGE PROFILE PIC (lIMITED 1 TO 4)
*/
export default function EditProfileScreen() {
  const user = useSelector(getUser);
  const token = useSelector(getToken);
  const profilePictures = [
    require("@/assets/images/profile/1.png"),
    require("@/assets/images/profile/2.png"),
    require("@/assets/images/profile/3.png"),
    require("@/assets/images/profile/4.png")
  ];

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [birthday, setBirthday] = useState(user.birthday ? new Date(user.birthday) : new Date());
  const [gender, setGender] = useState(user.gender || "");
  const [work, setWork] = useState(user.work || "");
  const [open, setOpen] = useState<boolean>(false);
  const [profilePictureNumber, setProfilePictureNumber] = useState(user.profilePicture || 0);

  const handleSave = async () => {
    const updatedData: Partial<User> = {};

    if (name !== user.name) updatedData.name = name;
    if (email !== user.email) updatedData.email = email;
    if (phoneNumber !== user.phoneNumber) updatedData.phoneNumber = phoneNumber;
    if (birthday.toISOString().split('T')[0] !== user.birthday) updatedData.birthday = birthday.toISOString().split('T')[0];
    if (gender !== user.gender) updatedData.gender = gender;
    if (work !== user.work) updatedData.work = work;

    console.log(updatedData);
    
    if (Object.keys(updatedData).length > 0) {
      try {
        const response = await axios.put(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/user/edit`,
          updatedData,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Edit Profile" />
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#FFF", paddingTop: 15, paddingHorizontal: 22 }}>
        <View style={[gs.ic]}>
          <View style={{ backgroundColor: "#DADADA", width: 83, height: 83, borderRadius: 9999, overflow: "hidden" }}>
            <Image
              source={profilePictures[profilePictureNumber]}
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
          <Button onPress={handleSave} text="Save" />
        </View>
      </ScrollView>
    </View>
  );
}
