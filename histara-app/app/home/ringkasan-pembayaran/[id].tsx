import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Linking, Pressable, ScrollView, View } from "react-native";

export default function RingkasanPembayaran() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [touched, setTouched] = useState(false);
  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <Header title="Ringkasan Pembayaran" />
      <ScrollView>
        <CustomText
          weight={700}
          style={[{ fontSize: 20, textAlign: "center", paddingTop: 16 }]}
        >
          {id}
        </CustomText>
        <CustomText
          weight={400}
          style={[{ fontSize: 16, textAlign: "center", paddingBottom: 12 }]}
        >
          Nama Kota
        </CustomText>
        <View style={{ height: 200, backgroundColor: Colors.orange.main }}></View>

        <View style={[gs.flexRow, gs.ic, gs.jc, { gap: 50, marginTop: 40 }]}>
          <View style={[gs.ic, { minWidth: 80 }]}>
            <Image source={require("@/assets/images/Duration.png")} />
            <CustomText weight={400}>Duration</CustomText>
            <CustomText
              weight={700}
              style={[{ color: Colors.orange.main }]}
            >
              5-7 hrs
            </CustomText>
          </View>
          <View style={[gs.ic, { minWidth: 80 }]}>
            <Image source={require("@/assets/images/Points.png")} />
            <CustomText weight={400}>Points</CustomText>
            <CustomText
              weight={700}
              style={[{ color: Colors.orange.main }]}
            >
              50
            </CustomText>
          </View>
          <View style={[gs.ic, { minWidth: 80 }]}>
            <Image source={require("@/assets/images/Steps.png")} />
            <CustomText weight={400}>Stops</CustomText>
            <CustomText
              weight={700}
              style={[{ color: Colors.orange.main }]}
            >
              8
            </CustomText>
          </View>
        </View>

        <View style={{ height: 1, backgroundColor: "#000", marginVertical: 25 }} />

        <View style={{ paddingHorizontal: 18 }}>
          <CustomText weight={700}>Detail Transaksi</CustomText>
          <View style={[gs.flexRow, { gap: 50 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Nomor Transaksi
            </CustomText>
            <CustomText weight={400}>Nomor</CustomText>
          </View>
          <View style={[gs.flexRow, { gap: 50 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Harga Paket Tur
            </CustomText>
            <CustomText weight={400}>Rp 300.000,-</CustomText>
          </View>
          <View style={{ marginTop: 12 }}>
            <CustomText weight={700}>Metode Pembayaran</CustomText>
            <Pressable
              onPress={() => {
                router.navigate("/home/pembayaran/623123")
              }}
              onPressIn={() => setTouched(true)}
              onPressOut={() => setTouched(false)}
              style={{
                borderColor: "#000",
                marginTop:5,
                borderWidth: 1,
                alignSelf: "flex-start",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: touched ? "#DEDEDE" : "#FFF",
              }}
            >
              <Image
                style={{ width: 250, height: 250 / 6.25 }}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/1024px-QRIS_logo.svg.png",
                }}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
