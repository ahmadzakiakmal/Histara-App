import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionId, setQrLink } from "@/redux/slice/transactionSlice";
import { getToken } from "@/redux/slice/authSlice";
import axios from "axios";

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
}

export default function RingkasanPembayaran() {
  const dispatch = useDispatch();
  const transactionId = useSelector(getTransactionId);
  const token = useSelector(getToken);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [touched, setTouched] = useState(false);
  const allTours = require("@/data/tours.json") as Tour[];
  const [tour, setTour] = useState<Tour>({
    id: "",
    desc: "",
    duration: "",
    name: "",
    points: 0,
    stop: 0,
    stops: [],
  });

  useEffect(() => {
    const tourToBeDisplayed = allTours.filter((tour) => {
      return tour.id === id;
    })[0];
    setTour(tourToBeDisplayed);
  }, [id]);

  const handlePembayaran = () => {
    axios.post(process.env.EXPO_PUBLIC_BACKEND_URL + "/v1/transaction/create-payment", {
      "orderId": transactionId,
    }, 
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch(setQrLink(res.data.qrLink));
      router.navigate("/home/pembayaran/" + id);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <Header title="Ringkasan Pembayaran" />
      <ScrollView>
        <CustomText
          weight={700}
          style={[{ fontSize: 20, textAlign: "center", paddingTop: 16, paddingHorizontal: 18 }]}
        >
          {tour.name}
        </CustomText>
        <CustomText
          weight={400}
          style={[{ fontSize: 16, textAlign: "center", paddingBottom: 12 }]}
        >
          {
            id?.includes("YG") && "Yogyakarta"
          }
          {
            id?.includes("MG") && "Magelang"
          }
          {
            id?.includes("AM") && "Ambarawa"
          }
          {
            id?.includes("SM") && "Semarang"
          }
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
            <CustomText weight={400}>{transactionId}</CustomText>
          </View>
          <View style={[gs.flexRow, { gap: 50 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Harga Paket Tur
            </CustomText>
            <CustomText weight={400}>Rp 30.000,-</CustomText>
          </View>
          <View style={{ marginTop: 12 }}>
            <CustomText weight={700}>Metode Pembayaran</CustomText>
            <Pressable
              onPress={() => {
                handlePembayaran()
              }}
              onPressIn={() => setTouched(true)}
              onPressOut={() => setTouched(false)}
              style={{
                borderColor: "#000",
                marginTop: 5,
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
