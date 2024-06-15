import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Linking, Pressable, View } from "react-native";
const { useSelector } = require("react-redux");
const { getToken } = require("@/redux/slice/authSlice");
const { getTransactionId, getQrLink } = require("@/redux/slice/transactionSlice");
import axios from "axios";

interface CheckPaymentResponse {
  success: boolean;
  message: string;
}

export default function Pembayaran() {
  const token = useSelector(getToken);
  const transactionId = useSelector(getTransactionId);
  const qrLink = useSelector(getQrLink);
  const { id } = useLocalSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "waiting" | "expired">("waiting");
  const router = useRouter();
  
  // TODO: ADD HANDLER WHEN PAYMENT IS EXPIRED
  const checkPaymentStatus = () => {
    console.log(transactionId);
    axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/transaction/check-payment?orderId=${transactionId}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    })
    .then((res) => {
      console.log(res.data);
      setPaymentStatus(res.data.paymentStatus);
      if (res.data.paymentStatus === "paid") {
        router.navigate("/home/pembayaran/success/" + id)
      } else {
        console.log("Payment is not paid yet or expired!");
      }
    })
    .catch((err) => {
      console.error(err);
    });
  };

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
              source={{ uri: qrLink }}
            />
          </View>
          <Pressable
            onPress={() =>
              Linking.openURL(qrLink)
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
            checkPaymentStatus()
          }} />
        </View>
      </View>
    </>
  );
}
