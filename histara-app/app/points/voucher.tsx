import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Utilities } from "@/utilities/Utilities";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, Image, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { withDecay } from "react-native-reanimated";

export default function VoucherScreen() {
  const [timer, setTimer] = useState(300);
  const formattedMinutes = `0${Math.floor(timer / 60)}`.slice(-2);
  const formattedSeconds = `0${timer % 60}`.slice(-2);
  const router = useRouter();

  const [showModal, setShowModal]  = useState<boolean>(false)

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
    if (timer === 0) {
      router.navigate("/points");
    }
  }, [timer]);

  const handleBackButtonPress = () => {
    // Your function logic here
    setShowModal(true);
    return true; // Returning true prevents the default back button behavior
  };

  useEffect(() => {
    // Add the event listener
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);

    // Remove the event listener on cleanup
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonPress);
    };
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {showModal && <View
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
          Anda akan dianggap telah menukarkan kode voucher dan tidak bisa melihat kodenya lagi.
        </CustomText>
        <View style={[gs.flexRow, { justifyContent: "space-between" }]}>
          <Button
            text="Selesai"
            textStyle={[{ fontSize: 14 }]}
            style={[{ width: "49%" }]}
            onPress={() => {
              router.navigate("/home");
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
    </View>}
      <Header title="Kode Voucher" />
      <GestureHandlerRootView>
        <ScrollView>
          <View style={{ backgroundColor: Colors.orange.main, paddingHorizontal: 25, paddingVertical: 18 }}>
            <View
              style={{
                backgroundColor: "#FFF",
                borderRadius: 16,
                alignItems: "center",
                paddingVertical: 18,
              }}
            >
              <CustomText weight={700}>Nama Voucher</CustomText>
              <View style={{ paddingHorizontal: 16, width: "100%" }}>
                <View
                  style={{ width: "100%", height: 165, backgroundColor: "#DEDEDE", marginTop: 5, marginBottom: 30 }}
                ></View>
              </View>
              <CustomText
                weight={400}
                style={[{ width: 200, textAlign: "center" }]}
              >
                Waktu yang tersisa untuk menukar
              </CustomText>
              <CustomText
                weight={700}
                style={[{ fontSize: 28 }]}
              >
                {formattedMinutes}:{formattedSeconds}
              </CustomText>
              <View style={{ paddingVertical: 0.5, backgroundColor: "#828282", width: "100%" }} />
              <CustomText
                weight={700}
                style={[{ paddingTop: 18, fontSize: 18 }]}
              >
                asdfg-fcdx-apcb
              </CustomText>
            </View>
          </View>

          <View style={{ paddingHorizontal: 18, marginTop: 18, paddingBottom: 100 }}>
            <CustomText
              weight={400}
              style={[{ fontSize: 14, textAlign: "justify" }]}
            >
              Tukarkan kode voucher di UMKM secara langsung dan dapatkan promo vouchernya. Jangan sampai kelewatan waktu
              penukaran.
            </CustomText>

            <View
              style={{
                borderColor: "#828282",
                borderWidth: 1,
                borderRadius: 6,
                paddingTop: 20,
                paddingBottom: 10,
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Image
                source={require("@/assets/images/logo.png")}
                style={{ width: 86, height: 50, position: "absolute", top: "-70%", backgroundColor: "#FFF" }}
              />
              <CustomText
                weight={400}
                style={[{ fontSize: 12, textAlign: "center" }]}
              >
                Anda akan secara otomatis mendapatkan poin setiap melakukan pembelian paket tur.
              </CustomText>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
}
