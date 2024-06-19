import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Image, Pressable, View } from "react-native";
import { useSelector } from "react-redux"; 
import { getTransactionId } from "@/redux/slice/transactionSlice";

interface Tour {
  id: string;
  tourId: string;
  name: string;
  desc: string;
  location: string;
  duration: string;
  points: number;
  stop: number;
  price: number;
}

export default function SuccessPayment() {
  const transactionId = useSelector(getTransactionId);
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const allTours = require("@/data/tours.json") as Tour[]

  const [tour, setTour] = useState<Tour>({
    id: "",
    tourId: "",
    desc: "",
    location: "",
    duration: "",
    name: "",
    points: 0,
    stop: 0,
    price: 0
  })

  useEffect(() => {
    const tourToBeDisplayed = allTours.filter((tour) => {
      return tour.id === id
    })[0];
    setTour(tourToBeDisplayed);
  }, [id])

  return (
    <View style={{ flex: 1 }}>
      <Header />
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
            {new Date().toLocaleDateString()}
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
                <CustomText weight={400}>{transactionId?.slice(0,10) + "..."}</CustomText>
            </View>
            <View style={[gs.flexRow, { gap: 80 }]}>
              <CustomText
                weight={400}
                style={[{ width: 150 }]}
              >
                Harga Paket Tur
              </CustomText>
              <CustomText weight={400}>Rp 30000</CustomText>
            </View>
            <View style={[gs.flexRow, { gap: 80 }]}>
              <CustomText
                weight={400}
                style={[{ width: 150 }]}
              >
                Jumlah Point
              </CustomText>
              <CustomText weight={400}>{tour.points}</CustomText>
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
            <CustomText weight={400}>{tour.name.split(" ")[0]}</CustomText>
          </View>
          <View style={[gs.flexRow, { gap: 80 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Lokasi Paket
            </CustomText>
            <CustomText weight={400}>{tour.location}</CustomText>
          </View>
          <View style={[gs.flexRow, { gap: 80 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Durasi Tur
            </CustomText>
            <CustomText weight={400}>{tour.duration}</CustomText>
          </View>
          <View style={[gs.flexRow, { gap: 80 }]}>
            <CustomText
              weight={400}
              style={[{ width: 150 }]}
            >
              Jumlah Stop
            </CustomText>
            <CustomText weight={400}>{tour.stop}</CustomText>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: Colors.blue.dark, paddingVertical: 11 }}>
        <Pressable
          onPress={() => {
            router.navigate("/home/tour/" + id);
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
            Start The Tour
          </CustomText>
          <Image source={require("@/assets/images/Start.png")} />
        </Pressable>
      </View>
    </View>
  );
}
