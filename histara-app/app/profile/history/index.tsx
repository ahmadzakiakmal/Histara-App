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

export default function TourHistoryScreen() {
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
      <Header title="Riwayat Tur" />
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#FFF", paddingTop: 15, paddingHorizontal: 22 }}>
        <View style={[gs.ic, { gap: 10 }]}>
          <HistoryItem name="Adhyaksa" city="Yogyakarta" date={new Date} />
          <HistoryItem name="Adara" city="Yogyakarta" date={new Date} />
          <HistoryItem name="Gamadhira" city="Yogyakarta" date={new Date} />
        </View>
      </ScrollView>
    </View>
  );
}

function HistoryItem({ name, city, date }: { name: string; city: string; date: Date }) {
  return (
    <View
      style={[
        gs.flexRow,
        {
          borderColor: Colors.orange.main,
          borderWidth: 1,
          width: "100%",
          paddingHorizontal: 23,
          paddingVertical: 18,
          borderRadius: 10,
          justifyContent: "space-between",
        },
      ]}
    >
      <View>
        <CustomText weight={700}>{name}</CustomText>
        <CustomText weight={400}>{city}</CustomText>
        <CustomText weight={400}>{date?.toLocaleDateString()}</CustomText>
      </View>
      <View
        style={{
          backgroundColor: Colors.blue.dark,
          alignSelf: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 2,
          borderRadius: 8,
        }}
      >
        <CustomText
          weight={400}
          style={[{ color: "#FFF" }]}
        >
          Status
        </CustomText>
      </View>
    </View>
  );
}
