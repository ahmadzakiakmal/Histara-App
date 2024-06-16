import AudioPlayer from "@/components/AudioPlayer";
import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Image, PermissionsAndroid, Pressable, Text, View } from "react-native";
import WebView from "react-native-webview";
import SlidingUpPanel from "rn-sliding-up-panel";
import { BackHandler } from "react-native";
import { Utilities } from "@/utilities/Utilities";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { getToken } from "@/redux/slice/authSlice";
import { getTransactionId } from "@/redux/slice/transactionSlice";
import axios from "axios";

export default function Tour() {
  const profilePictures = [
    require("@/assets/images/profile/1.png"),
    require("@/assets/images/profile/2.png"),
    require("@/assets/images/profile/3.png"),
    require("@/assets/images/profile/4.png"),
  ];
  const [random, setRandom] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { id } = useLocalSearchParams();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Location Permission",
        message: "This app needs access to your location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 3) + 1);
  }, []);

  useEffect(() => {
    // requestLocationPermission();
  }, []);

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
    <>
      {showModal && <ConfirmModal setShowModal={setShowModal} />}
      <View style={{ flex: 1 }}>
        <View
          style={[
            gs.flexRow,
            gs.ic,
            {
              backgroundColor: Colors.blue.dark,
              paddingTop: 50,
              paddingBottom: 12,
              paddingHorizontal: 18,
              gap: 18,
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ backgroundColor: "#DEDEDE", width: 57, height: 57, borderRadius: 999, overflow: "hidden" }}>
            <Image
              source={profilePictures[random]}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <CustomText
            weight={700}
            style={[{ color: "#FFF", fontSize: 20, flex: 1 }]}
          >
            {id}
          </CustomText>
          <Button
            text="Selesai"
            style={[{ width: "auto", paddingHorizontal: 10 }]}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>
        <WebView
          containerStyle={{ width: "auto" }}
          source={{
            uri: "https://histara-map.vercel.app/" + id,
          }}
          geolocationEnabled={true}
        />
        <View style={{ backgroundColor: Colors.blue.dark, paddingBottom: 10, paddingTop: 20 }}>
          <AudioPlayer id={id as string} />
        </View>
      </View>
    </>
  );
}

function ConfirmModal({ setShowModal }: { setShowModal: Dispatch<SetStateAction<boolean>> }) {
  const token = useSelector(getToken);
  const transactionId = useSelector(getTransactionId);
  const router = useRouter();

  const handleSelesai = () => {
    axios.put(`${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/transaction/finish?orderId=${transactionId}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    })
    .then((res) => {
      console.log(res.data);
      router.navigate("/home")
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return (
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
          Apakah yakin ingin menyelesaikan tur?
        </CustomText>
        <CustomText
          weight={400}
          style={[{ fontSize: 12, textAlign: "center", marginBottom: 10 }]}
        >
          Anda akan dianggap telah menyelesaikan paket tur dan tidak bisa kembali membuka tur, kecuali anda membeli
          paket turnya lagi
        </CustomText>
        <View style={[gs.flexRow, { justifyContent: "space-between" }]}>
          <Button
            text="Selesai"
            textStyle={[{ fontSize: 14 }]}
            style={[{ width: "49%" }]}
            onPress={() => {
              handleSelesai()
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
  );
}
