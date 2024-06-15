import CircularProgress from "@/components/CircularProgress";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Image, Pressable, ScrollView, View } from "react-native";
import CustomText from "@/components/CustomText";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { getPoint } from "@/redux/slice/userSlice";
import { useState } from "react";
import SlidingButton from "@/components/SlidingButton";
import SlideUp from "@/components/SlideUp";
import { useRouter } from "expo-router";

export default function Points() {
  const point = useSelector(getPoint);
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);

  // Slide up display
  const [show, setShow] = useState<boolean>(false);
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
                setShow(true);
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
                setShow(true);
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
                setShow(true);
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
                setShow(true);
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
      <SlideUp show={show}>
        <Pressable
          style={{
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 100,
          }}
          onPressIn={() => {
            setShow(false);
          }}
        >
          <View
            style={{ paddingVertical: 2.5, backgroundColor: Colors.blue.dark, paddingHorizontal: 50, borderRadius: 10 }}
          />
        </Pressable>
        <CustomText
          weight={700}
          style={[{ width: "100%", fontSize: 21 }]}
        >
          {umkmName}
        </CustomText>
        <ScrollView style={{ flex: 1 }}>
          <CustomText
            weight={400}
            style={[{ width: "100%", fontSize: 16, textAlign: "justify" }]}
          >
            {umkmName} adalah Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia at repudiandae excepturi
            nisi cupiditate id corporis explicabo nobis facilis neque.
          </CustomText>
        </ScrollView>
        <CustomText
          weight={700}
          style={[{ width: "100%", fontSize: 21 }]}
        >
          Tukar
        </CustomText>
        <SlidingButton
          point={umkmCost}
          setShowModal={setShowModal}
        />
      </SlideUp>
      {showModal && (
        <View
          style={{
            backgroundColor: "rgba(14,26,76, .6)",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ backgroundColor: "#FFF", padding: 20, borderRadius: 16 }}>
            <Image
              source={require("@/assets/images/Success.png")}
              style={{ alignSelf: "center" }}
            />
            <CustomText
              weight={700}
              style={[{ textAlign: "center" }]}
            >
              Point berhasil ditukar
            </CustomText>
            <Button
              text="Tutup"
              onPress={() => {
                setShowModal(false)
                router.navigate("/points/voucher")                
              }}
              style={[{ paddingVertical: 8, paddingHorizontal: 20, alignSelf: "center" }]}
              textStyle={[{fontSize: 14}]}
            />
          </View>
        </View>
      )}
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
