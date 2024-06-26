import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Utilities } from "@/utilities/Utilities";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "@/redux/slice/authSlice";
import { setTransactionId, getTransactionId } from "@/redux/slice/transactionSlice";
import axios from "axios";
import Toast from "react-native-toast-message";

interface TourStop {
  name: string;
  image: string; // Optional property
  coordinates: [number, number];
}

interface Tour {
  id: string;
  tourId: string;
  name: string;
  desc: string;
  duration: string;
  points: number;
  stop: number;
  stops: TourStop[];
  cover: string;
}

export default function MenuPaketScreen() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const transactionId = useSelector(getTransactionId);
  const { id } = useLocalSearchParams();
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const allTours = require("@/data/tours.json") as Tour[];

  const [tour, setTour] = useState<Tour>({
    id: "",
    tourId: "",
    desc: "",
    duration: "",
    name: "",
    points: 0,
    stop: 0,
    stops: [],
    cover: "https://google.com",
  });

  useEffect(() => {
    const tourToBeDisplayed = allTours.filter((tour) => {
      return tour.id === id;
    })[0];
    setTour(tourToBeDisplayed);
  }, [id]);

  const handleClicked = () => {
    Toast.show({type: "loading", text1: "Loading", text2: "Memproses..."})

    if(transactionId !== null) {
      Toast.show({type: "error", text1: "Error", text2: "Selesaikan transaksi aktif!"})
      return;
    }

    axios
      .post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/transaction/create`,
        { tourId: tour.tourId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Toast.show({ type: "success", text1: "Success", text2: "Transaksi berhasil dibuat!" });
        dispatch(setTransactionId(res.data.orderId));
        router.replace("/home/ringkasan-pembayaran/" + id);
      })
      .catch((err) => {
        Toast.show({type: "error", text1: "Error", text2: "Transaksi gagal dibuat!"})
      });
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <Header />
      <ScrollView>
        <View style={{ height: 200, backgroundColor: Colors.orange.main }}>
          <Image
            source={{ uri: tour.cover }}
            style={{ width: "100%", height: 200 }}
          />
        </View>
        <CustomText
          weight={700}
          style={[{ fontSize: 20, textAlign: "center", paddingVertical: 12, paddingHorizontal: 18 }]}
        >
          {tour.name}
        </CustomText>

        <View style={[gs.flexRow, gs.ic, gs.jc, { gap: 50, marginTop: 12 }]}>
          <View style={[gs.ic, { minWidth: 80 }]}>
            <Image source={require("@/assets/images/Duration.png")} />
            <CustomText weight={400}>Duration</CustomText>
            <CustomText
              weight={700}
              style={[{ color: Colors.orange.main }]}
            >
              {tour.duration} hrs
            </CustomText>
          </View>
          <View style={[gs.ic, { minWidth: 80 }]}>
            <Image source={require("@/assets/images/Points.png")} />
            <CustomText weight={400}>Points</CustomText>
            <CustomText
              weight={700}
              style={[{ color: Colors.orange.main }]}
            >
              {tour.points}
            </CustomText>
          </View>
          <View style={[gs.ic, { minWidth: 80 }]}>
            <Image source={require("@/assets/images/Steps.png")} />
            <CustomText weight={400}>Stops</CustomText>
            <CustomText
              weight={700}
              style={[{ color: Colors.orange.main }]}
            >
              {tour.stops.length}
            </CustomText>
          </View>
        </View>

        <View style={{ paddingHorizontal: 18, marginTop: 20 }}>
          <CustomText
            weight={700}
            style={[{ fontSize: 20, lineHeight: 1.1 * 20 }]}
          >
            Description
          </CustomText>
          <CustomText
            weight={400}
            style={[{ fontSize: 14 }]}
          >
            {tour.desc}
          </CustomText>
        </View>

        <View style={{ height: 1, backgroundColor: "#000", marginTop: 12, marginBottom: 25 }} />

        <View style={{ paddingHorizontal: 18 }}>
          <CustomText
            weight={700}
            style={[{ fontSize: 20 }]}
          >
            Tour Stops
          </CustomText>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 44, gap: 10, paddingHorizontal: 18 }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {tour.stops.map((stop, index) => {
            return (
              <Stop
                name={stop.name}
                image={stop.image}
                key={index}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
      <View style={{ backgroundColor: Colors.blue.dark, paddingVertical: 11 }}>
        <Pressable
          onPress={() => {
            handleClicked();
          }}
          onPressIn={() => setTouched(true)}
          onPressOut={() => setTouched(false)}
          style={[
            gs.flexRow,
            gs.ic,
            gs.jc,
            {
              backgroundColor: touched ? Colors.orange.dark : Colors.orange.main,
              marginVertical: 2.5,
              alignSelf: "center",
              paddingHorizontal: 18,
              borderRadius: 5,
              gap: 8,
            },
          ]}
        >
          <CustomText
            weight={400}
            style={[{ color: Colors.blue.dark, fontSize: 18, alignSelf: "center", paddingTop: 3 }]}
          >
            Start
          </CustomText>
          <Image source={require("@/assets/images/Start.png")} />
        </Pressable>
      </View>
    </View>
  );
}

function Stop({ name, image }: { name: string; image: string }) {
  return (
    <View>
      <View style={{ width: 200, height: 145, backgroundColor: Colors.orange.main, borderRadius: 20, overflow: "hidden" }}>
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 145 }}
        />
      </View>
      <CustomText
        weight={700}
        style={[{ textAlign: "center", fontSize: 18, maxWidth: 200 }]}
      >
        {name}
      </CustomText>
    </View>
  );
}

