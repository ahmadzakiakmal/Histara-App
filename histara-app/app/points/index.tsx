import CircularProgress from "@/components/CircularProgress";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Image, Pressable, ScrollView, View } from "react-native";
import CustomText from "@/components/CustomText";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { getPoint } from "@/redux/slice/userSlice";
import SlidingUpPanel from "rn-sliding-up-panel";
import { useState } from "react";

export default function Points() {
  const point = useSelector(getPoint);

  // Slide up display
  const [umkmName, setUmkmName] = useState<string>("");
  const [umkmCost, setUmkmCost] = useState<number>(0);
  const [umkmDesc, setUmkmDesc] = useState<string>("");

  const slideUpPanel = (): void => {
    // @ts-ignore
    this._panel.show(360);
  };

  return (
    <>
      <Header />
      <ScrollView>
        <View
          style={[
            gs.jc,
            gs.ic,
            { backgroundColor: "#4A5379", position: "relative", paddingVertical: 20, overflow: "hidden" },
          ]}
        >
          <Image
            source={require("@/assets/images/DiamondBlur.png")}
            style={{ position: "absolute" }}
          />
          <CircularProgress
            color={Colors.orange.main}
            size={200}
            strokeWidth={15}
            percentage={point / 1000}
            value={point}
            duration={800}
          />
        </View>

        <View style={{ paddingHorizontal: 18, marginTop: 15 }}>
          <CustomText weight={700}>Redeem your points</CustomText>
          <CustomText weight={400}>Your reward after joining the historical tour</CustomText>
        </View>

        <View style={{ paddingHorizontal: 0, paddingBottom: 80 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 14,
              paddingBottom: 8,
              marginBottom: 5,
              paddingTop: 8,
              paddingHorizontal: 18,
              overflow: "visible",
            }}
          >
            <UmkmItem
              title="Rumah Makan 1"
              city="Yogyakarta"
              cost={15}
              point={point}
              onPress={() => {
                setUmkmName("Rumah Makan 1");
                setUmkmCost(15);
                slideUpPanel();
              }}
            />
            <UmkmItem
              title="Toko Merch 1"
              city="Yogyakarta"
              cost={45}
              point={point}
              onPress={() => {
                setUmkmName("Toko Merch 1");
                setUmkmCost(45);
                slideUpPanel();
              }}
            />
            <UmkmItem
              title="Rumah Makan 2"
              city="Yogyakarta"
              cost={20}
              point={point}
              onPress={() => {
                setUmkmName("Rumah Makan 2");
                setUmkmCost(20);
                slideUpPanel();
              }}
            />
            <UmkmItem
              title="Toko Merch 2"
              city="Yogyakarta"
              cost={10}
              point={point}
              onPress={() => {
                setUmkmName("Toko Merch 2");
                setUmkmCost(10);
                slideUpPanel();
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
      <SlidingUpPanel
        // @ts-ignore
        ref={(c) => (this._panel = c)}
      >
        <View
          style={{
            backgroundColor: "#FFF",
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ paddingHorizontal: 100, paddingVertical: 12 }}>
            <View style={{ backgroundColor: Colors.blue.dark, height: 5, borderRadius: 999 }} />
          </View>
          <View style={{ paddingTop: 10 }}>
            <CustomText weight={700} style={[{fontSize: 21}]}>{umkmName}</CustomText>
            <CustomText weight={400} style={[{fontSize: 16, textAlign: "justify"}]}>{umkmName + " adalah " + " lorem ipsum dolor sit amet"}</CustomText>

            <CustomText weight={700} style={[{fontSize: 21, marginTop: 20}]}>Tukar</CustomText>
            {/* TODO: add slide to confirm button */}
          </View>
        </View>
      </SlidingUpPanel>
    </>
  );
}

interface UmkmItemProps {
  title: string;
  city: string;
  cost: number;
  point: number;
  onPress: () => void;
}

function UmkmItem({ title = "Nama UMKM", city = "Nama Kota", cost = 150, point = 0, onPress }: UmkmItemProps) {
  const cutTitle = (title: string): string => {
    return title?.length < 35 ? title : title.slice(0, 30) + "...";
  };
  const cutDesc = (desc: string): string => {
    return desc?.length < 80 ? desc : desc.slice(0, 76) + "...";
  };
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 14,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        elevation: 5,
        shadowOffset: { width: 0, height: 10 },
        width: 225,
        borderRadius: 10,
      }}
    >
      <View style={{ width: "100%", height: 150, backgroundColor: "#D9D9D9" }} />
      <CustomText
        weight={700}
        style={[{ marginTop: 18 }]}
      >
        {cutTitle(title)}
      </CustomText>
      <CustomText
        weight={400}
        style={[{ fontSize: 15, textAlign: "justify", marginTop: -5 }]}
      >
        {cutDesc(city)}
      </CustomText>
      <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
        <Button
          disabled={point < cost}
          text={cost.toString()}
          style={[{ paddingVertical: 4.5, backgroundColor: point > cost ? Colors.orange.main : "#DEDEDE" }]}
          onPress={onPress}
        />
      </View>
    </View>
  );
}
