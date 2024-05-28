import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Utilities } from "@/utilities/Utilities";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { panHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";

export default function MenuPaketScreen() {
  const { city } = useLocalSearchParams();
  return (
    <View style={{ backgroundColor: "#FFF" }}>
      <Header />
      <ScrollView>
        <View style={{ height: 200, backgroundColor: Colors.orange.main }}></View>
        <CustomText
          italic={true}
          weight={700}
          style={[{ fontSize: 20, textAlign: "center", paddingVertical: 12 }]}
        >
          Let&apos;s Explore: {city}
        </CustomText>
        <View style={{ paddingBottom: 120 }}>
          <Paket
            title="Paket Keraton Apa Gitu Ngabs"
            desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga quibusdam cum assumenda esse vel delectus quos aut odit cupiditate? Sapiente!"
            id="1"
          />
          <Paket
            title="Paket Keraton"
            desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga quibusdam cum assumenda esse vel delectus quos aut odit cupiditate? Sapiente!"
            id="2"
          />
          <Paket
            title="Paket Keraton"
            desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga quibusdam cum assumenda esse vel delectus quos aut odit cupiditate? Sapiente!"
            id="3"
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Paket({ title, desc, id }: { title: string; desc: string, id:string }) {
  const router = useRouter()
  return (
    <View style={{ padding: 18 }}>
      <View style={{ backgroundColor: Colors.orange.main, height: 143, borderRadius: 20 }} />
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
          onPress={() => router.navigate("/home/detail-paket/" + title)} 
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
