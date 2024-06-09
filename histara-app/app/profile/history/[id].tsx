import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { gs } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";

export default function HistoryDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Header title="Detail Riwayat Tur" />
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <View style={{ paddingHorizontal: 18 }}>
          <Image
            style={{ width: 147, height: 84, alignSelf: "center", marginTop: 25 }}
            source={require("@/assets/images/Success.png")}
          />
          <CustomText
            weight={700}
            style={[{ fontSize: 20, textAlign: "center" }]}
          >
            Pembayaran Sukses
          </CustomText>
          <CustomText
            weight={400}
            style={[{ marginTop: -5, textAlign: "center", fontSize: 16 }]}
          >
            Tanggal Transaksi
          </CustomText>

          <View>
            <CustomText
              weight={700}
              style={[{ marginTop: 20 }]}
            >
              Detail Transaksi
            </CustomText>
            <View style={[gs.flexRow, { gap: 80 }]}>
              <CustomText
                weight={400}
                style={[{ width: 150 }]}
              >
                Nomor Transaksi
              </CustomText>
              <CustomText weight={400}>{id}</CustomText>
            </View>
            <View style={[gs.flexRow, { gap: 80 }]}>
              <CustomText
                weight={400}
                style={[{ width: 150 }]}
              >
                Harga Paket Tur
              </CustomText>
              <CustomText weight={400}>Rp 300.000,-</CustomText>
            </View>
            <View style={[gs.flexRow, { gap: 80 }]}>
              <CustomText
                weight={400}
                style={[{ width: 150 }]}
              >
                Jumlah Point
              </CustomText>
              <CustomText weight={400}>100 Point</CustomText>
            </View>
          </View>

          <View style={[gs.flexRow, { marginTop: 25, justifyContent: "space-between", alignItems: "flex-end" }]}>
            <CustomText
              weight={700}
              style={[{ maxWidth: 150 }]}
            >
              Metode Pembayaran
            </CustomText>
            <Image
              style={{ width: 180, height: 180 / 6.25, alignSelf: "center", paddingTop: 12 }}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/1024px-QRIS_logo.svg.png",
              }}
            />
          </View>
        </View>

        <View style={{ height: 1, backgroundColor: "#000", marginVertical: 20 }} />

        <View style={{ paddingHorizontal: 18 }}>
          <CustomText
            weight={700}
            style={[{ marginTop: 20 }]}
          >
            Detail Paket Tur
          </CustomText>
          <View style={[gs.flexRow, { gap: 80 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Nama Paket Tur
            </CustomText>
            <CustomText weight={400}>Nama</CustomText>
          </View>
          <View style={[gs.flexRow, { gap: 80 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Lokasi Paket
            </CustomText>
            <CustomText weight={400}>Lokasi</CustomText>
          </View>
          <View style={[gs.flexRow, { gap: 80 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Durasi Tur
            </CustomText>
            <CustomText weight={400}>Durasi</CustomText>
          </View>
          <View style={[gs.flexRow, { gap: 80 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Jumlah Stop
            </CustomText>
            <CustomText weight={400}>8</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}
