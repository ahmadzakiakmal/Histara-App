import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import MiniButton from "@/components/MiniButton";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Pressable, ScrollView, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ backgroundColor: "#FFF" }}>
      <Header />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 35, height: "100%" }}>
        <View style={[gs.flexRow, gs.ic, { justifyContent: "space-between" }]}>
          <View>
            <CustomText
              weight={700}
              style={[{ lineHeight: 1 * 20, fontSize: 20 }]}
            >
              Nama Lengkap
            </CustomText>
            <CustomText
              weight={500}
              italic={true}
              style={[{ fontSize: 15, lineHeigth: 1 * 15, marginTop: -5 }]}
            >
              xy points
            </CustomText>
          </View>
          <View style={{ backgroundColor: "#DADADA", width: 83, height: 83, borderRadius: 9999 }} />
        </View>

        <View style={[gs.flexRow, { marginTop: 22.5, gap: 15 }]}>
          <MiniButton text="Edit Profile" onPress={() => {}} style={[{flex: 1}]} />
          <MiniButton text="Riwayat Tur" onPress={() => {}} style={[{flex: 1}]} />
        </View>

        <View style={{ marginTop: 23, gap: 15 }}>
          <FormDisplay
            label="Email"
            value="poc@histara.com"
          />
          <FormDisplay
            label="Phone Number"
            value="0812345678910"
          />
          <FormDisplay
            label="Birthday"
            value="29 Nov 2002"
          />
          <FormDisplay
            label="Gender"
            value="Laki-laki"
          />
          <FormDisplay
            label="Work"
            value="Mahasiswa"
          />
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
