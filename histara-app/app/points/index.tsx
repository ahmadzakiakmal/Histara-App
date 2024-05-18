import CircularProgress from "@/components/CircularProgress";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Image, ScrollView, View } from "react-native";
import CustomText from "@/components/CustomText";

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
      </ScrollView>
    </>
  );
}
