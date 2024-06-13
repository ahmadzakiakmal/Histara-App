import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Linking, Pressable, View } from "react-native";

export default function Pembayaran() {
  const { id } = useLocalSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "waiting" | "expired">("waiting");
  const router = useRouter();
  return (
    <>
      <Header />
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <View style={{ paddingHorizontal: 18 }}>
          <CustomText
            weight={700}
            style={[{ fontSize: 20, textAlign: "center", paddingTop: 16 }]}
          >
            id: {id}
          </CustomText>
          <Image
            style={{ width: 200, height: 200 / 6.25, alignSelf: "center", paddingTop: 12 }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/1024px-QRIS_logo.svg.png",
            }}
          />
          <View
            style={{ borderColor: "#000", borderWidth: 2, borderStyle: "dashed", marginVertical: 25, borderRadius: 8 }}
          >
            <Image
              style={{ width: 350, height: 350, alignSelf: "center" }}
              source={{ uri: "https://api.sandbox.midtrans.com/v2/qris/d8adbc3e-4457-424e-8aa8-2480397528d0/qr-code" }}
            />
          </View>
          <Pressable
            onPress={() =>
              Linking.openURL("https://api.sandbox.midtrans.com/v2/qris/d8adbc3e-4457-424e-8aa8-2480397528d0/qr-code")
            }
          >
            <CustomText
              weight={500}
              underline={true}
              style={[{ marginBottom: 5 }]}
            >
              Download Kode QR
            </CustomText>
          </Pressable>
          <Button text="Cek Status Pembayaran" onPress={() => {
            router.navigate("/home/pembayaran/success/" + id)
          }} />
        </View>
      </View>
    </>
  );
}
