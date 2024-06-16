import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Utilities } from "@/utilities/Utilities";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";

export default function MenuPaketScreen() {
  const allTours = require("@/data/cityTours.json");
  const { city } = useLocalSearchParams();
  const [tours, setTours] = useState([]);

  const cityCovers = [
    "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihb0ej6m-bfpUnDsSpFoy-imw4Og8x2J-WbaJqLAsVy2MYCJGcNG4pslyzARjGKgrbXNwSXkFwK6A7UVopdp7x0MDjAyRIunmiw=w1879-h931-rw-v1",
    "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihaW1fsUY6dEd3SG82t9ApLbDh41haFXFmP92WXwWX5z1AtgWpzcCNS60lb2qcvgfGpsRHnAqWC7VSQSZEe0rm6Ru3rbt2zvads=w1879-h931-rw-v1",
    "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbpx39-jyuXG6XDgHiFGROX4Os0aA-6_SX_1pYS8PITqpwgx2QucAKJ6oF578jNSXSNJ3pTTbDSFybh88MllRey46gF7ynpzg=w1879-h931-rw-v1",
    "https://drive.google.com/uc?export=view&id=1eBKRRW92rakOyuSUUNJQQrYtrT6CwF3d"
  ];

  useEffect(() => {
    const filterTours = allTours[city as string];
    setTours(filterTours);
  }, [city]);
  return (
    <View style={{ backgroundColor: "#FFF" }}>
      <Header />
      <ScrollView>
        <View style={{ height: 200, backgroundColor: Colors.orange.main }}>
          <Image
            source={{
              uri:
                city === "Yogyakarta"
                  ? cityCovers[0]
                  : city === "Ambarawa"
                  ? cityCovers[1]
                  : city === "Magelang"
                  ? cityCovers[2]
                  : "https://drive.google.com/uc?export=view&id=1_d_uEm6HSLz9IyVhhf0DK0VFwAm0J_vw",
            }}
            style={{ width: Utilities.getScreenWidth(), height: 200 }}
          />
        </View>
        <CustomText
          italic={true}
          weight={700}
          style={[{ fontSize: 20, textAlign: "center", paddingVertical: 12 }]}
        >
          Let&apos;s Explore: {city}
        </CustomText>
        <View style={{ paddingBottom: 120 }}>
          {tours.map((tour: { name: string; id: string; desc: string, image: string }) => {
            return (
              <Paket
                title={tour.name}
                key={tour.id}
                desc={tour.desc}
                id={tour.id}
                image={tour?.image ?? "https://google.com"}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function Paket({ title, desc, id, image }: { title: string; desc: string; id: string; image: string }) {
  const router = useRouter();
  return (
    <View style={{ padding: 18 }}>
      <View style={{ backgroundColor: Colors.orange.main, height: 143, borderRadius: 20, overflow: "hidden" }}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 143 }}
          />
        )}
      </View>
      <View
        style={[gs.flexRow, { paddingLeft: 18, marginTop: 8, justifyContent: "space-between", alignItems: "flex-end" }]}
      >
        <CustomText
          weight={700}
          style={[{ lineHeight: 1.5 * 18, fontSize: 18, maxWidth: (Utilities.getScreenWidth() - 36) / 2 }]}
        >
          {title ?? "Nama Paket Tur"}
        </CustomText>
        <Button
          style={[{ width: "auto", paddingHorizontal: 16, flexShrink: 0 }]}
          textStyle={[{ fontFamily: "PoppinsRegular" }]}
          text="See detail"
          onPress={() => router.navigate("/home/detail-paket/" + id)}
        />
      </View>
      <CustomText
        weight={400}
        style={[{ paddingLeft: 18, marginTop: 8 }]}
      >
        {desc ?? "Desc"}
      </CustomText>
      <View style={{ height: 1, backgroundColor: "#000", marginTop: 8 }} />
    </View>
  );
}
