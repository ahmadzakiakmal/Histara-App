import CircularProgress from "@/components/CircularProgress";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Image, Pressable, ScrollView, View } from "react-native";
import CustomText from "@/components/CustomText";
import Button from "@/components/Button";

export default function Points() {
  return (
    <>
      <Header />
      <ScrollView>
        <View
          style={[
            gs.jc,
            gs.ic,
            { backgroundColor: "#4A5379", position: "relative", paddingVertical: 14, overflow: "hidden" },
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
            percentage={60}
            duration={200}
          />
        </View>

        <View style={{ paddingHorizontal: 18, marginTop: 15 }}>
          <CustomText weight={700}>Redeem your points</CustomText>
          <CustomText weight={400}>Your reward after joining the historical tour</CustomText>
        </View>

        <View style={{ paddingHorizontal: 18, paddingBottom: 80 }}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              gap: 14,
              paddingBottom: 5,
              marginBottom: 5,
              paddingTop: 8,
              paddingHorizontal: 4,
            }}
          >
            <UmkmItem
              title="Nama UMKM"
              city="Yogyakarta"
              cost={200}
            />
            <UmkmItem
              title="Nama UMKM"
              city="Yogyakarta"
              cost={200}
            />
            <UmkmItem
              title="Nama UMKM"
              city="Yogyakarta"
              cost={200}
            />
            <UmkmItem
              title="Nama UMKM"
              city="Yogyakarta"
              cost={200}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}

interface UmkmItemProps {
  title: string;
  city: string;
  cost: number;
}

function UmkmItem({ title = "Nama UMKM", city = "Nama Kota", cost = 150 }: UmkmItemProps) {
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
        style={[{ fontSize: 15, textAlign: "justify" }]}
      >
        {cutDesc(city)}
      </CustomText>
      <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
        <Button
          text={cost.toString()}
          style={[{ paddingVertical: 4.5 }]}
        />
      </View>
    </View>
  );
}
