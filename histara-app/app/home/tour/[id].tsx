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
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "@/redux/slice/authSlice";
import { getTransactionId, setTransactionId } from "@/redux/slice/transactionSlice";
import axios from "axios";
import Toast from "react-native-toast-message";
import { getUser } from "@/redux/slice/userSlice";
import * as Location from "expo-location";
import SoundPlayer from "react-native-sound-player";

interface TourStop {
  name: string;
  image?: string; // Optional property
  coordinates: [number, number];
}

interface Tour {
  id: string;
  name: string;
  desc: string;
  duration: string;
  points: number;
  stop: number;
  stops: TourStop[];
  cover: string;
}

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
  const user = useSelector(getUser);
  const allTours = require("@/data/tours.json") as Tour[];
  const [tour, setTour] = useState<Tour>({
    id: "",
    desc: "",
    duration: "",
    name: "",
    points: 0,
    stop: 0,
    stops: [],
    cover: "https://google.com",
  });
  const [location, setLocation] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [allowAudio, setAllowAudio] = useState<boolean>(true);

  useEffect(() => {
    const tourToBeDisplayed = allTours.filter((tour) => {
      return tour.id === id;
    })[0];
    setTour(tourToBeDisplayed);
  }, [id]);

  const requestLocationPermission = async () => {
    try {
      let granted;

      granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Location Permission",
        message: "This app needs access to your location.",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        return location;
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
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Toast.show({
          type: "error",
          text1: "Gagal mendapatkan lokasi",
          text2: "Akses lokasi tidak diizinkan",
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    };
    getLocation();
  }, []);

  const handleBackButtonPress = () => {
    // Your function logic here
    setShowModal(true);
    setAllowAudio(false);
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
      {showModal && (
        <ConfirmModal
          setShowModal={setShowModal}
          id={tour.id}
          setAllowAudio={setAllowAudio}
        />
      )}
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
              source={profilePictures[user.profilePicture - 1]}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <CustomText weight={700}>
            {
              // @ts-ignore
              location?.latitude
            }
          </CustomText>
          <CustomText
            weight={700}
            style={[{ color: "#FFF", fontSize: 20, flex: 1 }]}
          >
            {tour.name?.split(" ")[0] + " Tour "}
          </CustomText>
          <Button
            text="Selesai"
            style={[{ width: "auto", paddingHorizontal: 10 }]}
            onPress={() => {
              setShowModal(true);
              setAllowAudio(false);
            }}
          />
        </View>
        {location?.coords && (
          <WebView
            containerStyle={{ width: "auto", flex: 1 }}
            source={{
              uri:
                "https://histara-map.vercel.app/" +
                id +
                "?latitude=" +
                location?.coords?.latitude +
                "&longitude=" +
                location?.coords?.longitude +
                "&image=" +
                user.profilePicture?.toString(),
            }}
            geolocationEnabled={true}
          />
        )}
        <View style={{ backgroundColor: Colors.blue.dark, paddingBottom: 10, paddingTop: 20 }}>
          <AudioPlayer
            id={tour.id}
            allowAudio={allowAudio}
          />
        </View>
      </View>
    </>
  );
}

function ConfirmModal({ setShowModal, id, setAllowAudio }: { setShowModal: Dispatch<SetStateAction<boolean>>; id: string, setAllowAudio: Dispatch<SetStateAction<boolean>> }) {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const transactionId = useSelector(getTransactionId);
  const router = useRouter();

  const handleSelesai = () => {
    Toast.show({ type: "loading", text1: "Loading", text2: "Memproses..." });

    axios
      .put(`${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/transaction/finish?orderId=${transactionId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        Toast.show({ type: "success", text1: "Success", text2: "Tour telah selesai!" });
        dispatch(setTransactionId(null));
        console.log("Redirecting to : /home/tour/summary/" + id);
        router.navigate("/home/tour/summary/" + id);
      })
      .catch((err) => {
        Toast.show({ type: "error", text1: "Error", text2: "Tour belum selesai!" });
      });
  };

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
              handleSelesai();
            }}
          />
          <Button
            text="Batal"
            textStyle={[{ fontSize: 14 }]}
            style={[{ backgroundColor: "#828282", width: "49%" }]}
            onPress={() => {
              setShowModal(false);
              setAllowAudio(true)
            }}
          />
        </View>
      </View>
    </View>
  );
}
