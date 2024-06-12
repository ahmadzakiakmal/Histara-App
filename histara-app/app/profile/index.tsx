import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import MiniButton from "@/components/MiniButton";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Linking, Pressable, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { getUser, getPoint } from "@/redux/slice/userSlice";

export default function ProfileScreen() {
  const user = useSelector(getUser);
  const point = useSelector(getPoint);
  const router = useRouter();
  return (
    <View style={{ backgroundColor: "#FFF" }}>
      <Header />
      <ScrollView contentContainerStyle={{ paddingTop: 35 }}>
        <View style={{ paddingHorizontal: 24, paddingBottom: 46 }}>
          <View style={[gs.flexRow, gs.ic, { justifyContent: "space-between" }]}>
            <View>
              <CustomText
                weight={700}
                style={[{ lineHeight: 1 * 20, fontSize: 20 }]}
              >
                {user.name}
              </CustomText>
              <CustomText
                weight={500}
                italic={true}
                style={[{ fontSize: 15, lineHeigth: 1 * 15, marginTop: -5 }]}
              >
                {point} points
              </CustomText>
            </View>
            <View style={{ backgroundColor: "#DADADA", width: 83, height: 83, borderRadius: 9999 }} />
          </View>

          <View style={[gs.flexRow, { marginTop: 22.5, gap: 15 }]}>
            <MiniButton
              text="Edit Profile"
              onPress={() => {
                router.navigate("/profile/edit");
              }}
              style={[{ flex: 1 }]}
            />
            <MiniButton
              text="Riwayat Tur"
              onPress={() => {
                router.navigate("/profile/history");
              }}
              style={[{ flex: 1 }]}
            />
          </View>

          <View style={{ marginTop: 23, gap: 15 }}>
            <FormDisplay
              label="Email"
              value={user.email}
            />
            <FormDisplay
              label="Phone Number"
              value={user.phoneNumber}
            />
            <FormDisplay
              label="Birthday"
              value={user.birthday}
            />
            <FormDisplay
              label="Gender"
              value={user.gender}
            />
            <FormDisplay
              label="Work"
              value={user.work}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 14, paddingTop: 5, backgroundColor: "#F6F6F6" }}>
          <CustomText
            weight={700}
            style={[{ fontSize: 16 }]}
          >
            Follow Us
          </CustomText>
          <CustomText
            weight={400}
            style={[{ fontSize: 16 }]}
          >
            Let&apos;s be friends! We love sharing travel inspiration and tips. Follow us to see!
          </CustomText>

          <View style={{ paddingBottom: 140, gap: 12 }}>
            <View style={[gs.flexRow, { gap: 17 }]}>
              <SocialMediaItem
                text="Instagram"
                image={require("@/assets/images/Instagram.png")}
                link="https://instagram.com"
              />
              <SocialMediaItem
                text="TikTok"
                image={require("@/assets/images/Tiktok.png")}
                link="https://tiktok.com"
              />
            </View>
            <View style={[gs.flexRow, { gap: 17 }]}>
              <SocialMediaItem
                text="YouTube"
                image={require("@/assets/images/Youtube.png")}
                link="https://youtube.com"
              />
              <SocialMediaItem
                text="Facebook"
                image={require("@/assets/images/Facebook.png")}
                link="https://facebook.com"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

interface FormDisplayProps {
  label: string;
  value: string;
}
function FormDisplay({ label, value }: FormDisplayProps) {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.blue.dark }}>
      <CustomText
        weight={700}
        style={[{ fontSize: 16, lineHeight: 1.5 * 16 }]}
      >
        {label}
      </CustomText>
      <CustomText
        weight={500}
        style={[{ fontSize: 18, marginTop: -2 }]}
      >
        {value}
      </CustomText>
    </View>
  );
}

interface SocialMediaItemProps {
  text: string;
  link: string;
  image: any;
}
function SocialMediaItem({ text, link, image }: SocialMediaItemProps) {
  const [touched, setTouched] = useState(false);
  return (
    <Pressable
      style={[
        gs.flexRow,
        gs.ic,
        {
          backgroundColor: touched ? "#E6E6E6" : "#FFF",
          borderRadius: 6,
          paddingHorizontal: 19,
          paddingVertical: 9,
          gap: 13,
          flex: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.9,
          shadowRadius: 5,
          elevation: 5,
        },
      ]}
      onPress={() => {
        Linking.openURL(link).catch((err) => console.log(err));
      }}
      onPressIn={() => {
        setTouched(true);
      }}
      onPressOut={() => {
        setTouched(false);
      }}
    >
      {image && <Image source={image} />}
      <CustomText weight={400}>{text}</CustomText>
    </Pressable>
  );
}
