import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, Image, Linking, Pressable, View } from "react-native";
const { useSelector, useDispatch } = require("react-redux");
const { setTransactionId } = require("@/redux/slice/transactionSlice");
const { getToken } = require("@/redux/slice/authSlice");
const { getTransactionId, getQrLink } = require("@/redux/slice/transactionSlice");
import axios from "axios";
import Toast from "react-native-toast-message";
import { Utilities } from "@/utilities/Utilities";
import { gs } from "@/constants/Styles";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Colors } from "@/constants/Colors";

export default function Pembayaran() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const transactionId = useSelector(getTransactionId);
  const qrLink = useSelector(getQrLink);
  const { id } = useLocalSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "waiting" | "expired">("waiting");
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timer, setTimer] = useState(300);
  const formattedMinutes = `0${Math.floor(timer / 60)}`.slice(-2);
  const formattedSeconds = `0${timer % 60}`.slice(-2);
  const [paidCheck, setPaidCheck] = useState<boolean>(false);

  // TODO: ADD HANDLER WHEN PAYMENT IS EXPIRED
  const checkPaymentStatus = () => {
    // console.log(qrLink);
    // Toast.show({ type: "loading", text1: "Loading", text2: "Memproses..." });
    Toast.show({ type: "success", text1: "Success", text2: "Pembayaran berhasil!" });
    router.navigate("/home/pembayaran/success/" + id);

    // axios
    //   .get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/transaction/check-payment?orderId=${transactionId}`, {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setPaymentStatus(res.data.paymentStatus);
    //     if (res.data.paymentStatus === "paid") {
    //       Toast.show({ type: "success", text1: "Success", text2: "Pembayaran berhasil!" });
    //       router.navigate("/home/pembayaran/success/" + id);
    //     } else if (res.data.paymentStatus === "expired") {
    //       dispatch(setTransactionId(null));
    //       router.navigate("home");
    //       Toast.show({ type: "error", text1: "Pembayaran Expired!", text2: "Buat transaksi baru!" });
    //     } else {
    //       Toast.show({ type: "error", text1: "Info", text2: "Pembayaran belum berhasil" });
    //     }
    //   })
    //   .catch((err) => {
    //     Toast.show({ type: "error", text1: "Error", text2: "Pembayaran belum berhasil" });
    //   });
  };

  const handleBackButtonPress = () => {
    // Your function logic here
    setShowModal(true);
    return true; // Returning true prevents the default back button behavior
  };

  const handleCancel = () => {
    console.log("cancel");
    Toast.show({ type: "loading", text1: "Loading", text2: "Memproses..." });

    if (transactionId == null) {
      Toast.show({ type: "error", text1: "Error", text2: "Tidak ada transaksi aktif!" });
      return;
    }

    axios
      .put(`${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/transaction/cancel?orderId=${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Toast.show({ type: "success", text1: "Success", text2: "Transaksi berhasil dicancel!" });
        dispatch(setTransactionId(null));
        router.navigate("/home");
      })
      .catch(() => {
        Toast.show({ type: "error", text1: "Error", text2: "Transaksi gagal dicancel!" });
      });
  };

  useEffect(() => {
    // Add the event listener
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);

    // Remove the event listener on cleanup
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonPress);
    };
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev: number) => prev - 1);
      }, 1000);

      // Cleanup interval on component unmount or when timer hits 0
      return () => {
        clearInterval(intervalId);
      };
    }
    if (timer <= 0 && timer % 5 === 0) {
      handleCancel();
    }
  }, [timer]);

  return (
    <>
      {showModal && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            flex: 1,
            height: Utilities.getScreenHeight(),
            width: Utilities.getScreenWidth(),
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
            backgroundColor: "rgba(14,26,76, .6)",
          }}
        >
          <View style={{ backgroundColor: "#FFF", padding: 20, width: "80%", borderRadius: 16 }}>
            <Image
              source={require("@/assets/images/Warning.png")}
              style={{ alignSelf: "center", marginBottom: 20 }}
            />
            <CustomText
              weight={700}
              style={[{ textAlign: "center" }]}
            >
              Apakah yakin ingin kembali?
            </CustomText>
            <CustomText
              weight={400}
              style={[{ fontSize: 12, textAlign: "center", marginBottom: 10 }]}
            >
              Jika anda kembali, transaksi akan dibatalkan dan QR akan diinvalidasi
            </CustomText>
            <View style={[gs.flexRow, { justifyContent: "space-between" }]}>
              <Button
                text="Selesai"
                textStyle={[{ fontSize: 14 }]}
                style={[{ width: "49%" }]}
                onPress={() => {
                  handleCancel();
                }}
              />
              <Button
                text="Batal"
                textStyle={[{ fontSize: 14 }]}
                style={[{ backgroundColor: "#828282", width: "49%" }]}
                onPress={() => {
                  setShowModal(false);
                }}
              />
            </View>
          </View>
        </View>
      )}
      <Header />
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <View style={{ paddingHorizontal: 18 }}>
          <CustomText
            weight={700}
            style={[{ fontSize: 20, textAlign: "center", paddingTop: 16 }]}
          >
            ID Tur: {id}
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
              source={ require("@/assets/StaticQR.jpeg") }
            />
          </View>
          <CustomText
            weight={400}
            style={[{ textAlign: "center", paddingHorizontal: 18 }]}
          >
            Selesaikan pembayaran dalam waktu:
          </CustomText>
          <CustomText
            weight={700}
            style={[{ fontSize: 28, textAlign: "center" }]}
          >
            {formattedMinutes}:{formattedSeconds}
          </CustomText>
          <Pressable onPress={() => Linking.openURL(qrLink)}>
            <CustomText
              weight={500}
              underline={true}
              style={[{ marginBottom: 5, textAlign: "center" }]}
            >
              Download Kode QR
            </CustomText>
          </Pressable>

          <Pressable
            onPress={() => {
              setPaidCheck(!paidCheck);
            }}
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          >
            {paidCheck ? (
              <Image source={require("@/assets/TickActive.png")} />
            ) : (
              <Image source={require("@/assets/TickInactive.png")} />
            )}
            <CustomText weight={400}>Saya sudah membayar QRIS</CustomText>
          </Pressable>

          <Button
            text="Cek Status Pembayaran"
            disabled={!paidCheck}
            style={[{ opacity: paidCheck ? 1 : 0.6 }]}
            onPress={() => {
              checkPaymentStatus();
            }}
          />
        </View>
      </View>
    </>
  );
}

