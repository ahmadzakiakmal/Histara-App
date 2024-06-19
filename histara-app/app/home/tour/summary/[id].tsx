import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Image, Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import { getTransactionId } from "@/redux/slice/transactionSlice";
import Button from "@/components/Button";

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
  cover: string;
}

export default function SuccessPayment() {
  const transactionId = useSelector(getTransactionId);
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const allTours = require("@/data/tours.json") as Tour[];

  const [tour, setTour] = useState<Tour>({
    id: "",
    tourId: "",
    desc: "",
    location: "",
    duration: "",
    name: "",
    points: 0,
    stop: 0,
    price: 0,
    cover: "https://google.com",
  });

  useEffect(() => {
    const tourToBeDisplayed = allTours.filter((tour) => {
      return tour.id === id;
    })[0];
    setTour(tourToBeDisplayed);
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <Image
          style={{ width: "100%", height: 250, alignSelf: "center" }}
          source={{ uri: tour.cover }}
        />
        <View style={{ alignItems: "center", marginTop: 28 }}>
          <CustomText
            weight={700}
            style={[{ paddingHorizontal: 24, fontSize: 20, textAlign: "center" }]}
          >
            {tour.name}
          </CustomText>
          <Image
            style={{ width: 280, alignSelf: "center", marginTop: 15, marginBottom: 35 }}
            source={require("@/assets/images/SucessOrange.png")}
          />
          <CustomText
            weight={700}
            style={[{ paddingHorizontal: 24, fontSize: 20, textAlign: "center" }]}
          >
            Kamu mendapatkan
          </CustomText>
          <CustomText
            weight={700}
            style={[{ paddingHorizontal: 24, fontSize: 20, textAlign: "center", width: 240 }]}
          >
            {tour.points} poin
          </CustomText>
        </View>
      </View>
      <View style={{ backgroundColor: Colors.blue.dark, paddingVertical: 9, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
        <Button
          text="Beranda"
          style={[{ paddingVertical: 9, paddingHorizontal: 15, width: 130 }]}
          textStyle={[{ fontFamily: "PoppinsSemiBold", color: Colors.blue.dark }]}
          onPress={() => {router.replace("/home")}}
          />
        <Button
          text="Lihat Points"
          style={[{ paddingVertical: 9, paddingHorizontal: 15, width: 130 }]}
          textStyle={[{ fontFamily: "PoppinsSemiBold", color: Colors.blue.dark }]}
          onPress={() => {router.replace("/points")}}
        />
      </View>
    </View>
  );
}
