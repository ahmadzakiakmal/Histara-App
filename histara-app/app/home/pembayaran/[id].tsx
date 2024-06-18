import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Linking, Pressable, View } from "react-native";
const { useSelector, useDispatch } = require("react-redux");
const { setTransactionId } = require("@/redux/slice/transactionSlice");
const { getToken } = require("@/redux/slice/authSlice");
const { getTransactionId, getQrLink, setToursId } = require("@/redux/slice/transactionSlice");
import axios from "axios";
import Toast from "react-native-toast-message";

export default function Pembayaran() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const transactionId = useSelector(getTransactionId);
  const qrLink = useSelector(getQrLink);
  const { id } = useLocalSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "waiting" | "expired">("waiting");
  const router = useRouter();
  
  // TODO: ADD HANDLER WHEN PAYMENT IS EXPIRED
  const checkPaymentStatus = () => {
    console.log(qrLink)
    Toast.show({type: "loading", text1: "Loading", text2: "Memproses..."})

    axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/transaction/check-payment?orderId=${transactionId}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    })
    .then((res) => {
      console.log(res.data);
      setPaymentStatus(res.data.paymentStatus);
      if (res.data.paymentStatus === "paid") {
        Toast.show({ type: "success", text1: "Success", text2: "Pembayaran berhasil!" });
        router.navigate("/home/pembayaran/success/" + id)
      } else if (res.data.paymentStatus === "expired") {
        dispatch(setTransactionId(null));
        dispatch(setToursId(null));
        router.navigate("/home" + id)
        Toast.show({ type: "error", text1: "Pembayaran Expired!", text2: "Buat transaksi baru!" });
      } else {
        Toast.show({ type: "error", text1: "Info", text2: "Pembayaran belum berhasil" });
      }
    })
    .catch((err) => {
      Toast.show({type: "error", text1: "Error", text2: "Pembayaran belum berhasil"})
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
