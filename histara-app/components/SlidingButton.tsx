import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Image, View } from "react-native";
// @ts-ignore
import SlideToConfirm from "rn-slide-to-confirm";
import CustomText from "./CustomText";
import { PrivateValueStore } from "@react-navigation/native";
import { useRouter } from "expo-router";

const SlidingButton = ({ point, setShowModal }: { point: number, setShowModal: any }) => {
  const [sliderState, setSliderState] = useState(false);
  const router = useRouter();

  return (
    <View>
      <SlideToConfirm
        unconfimredTipText={point.toString() + " Point"}
        unconfirmedTipTextStyle={{
          color: "white",
          fontSize: 16,
          paddingTop: 4,
          fontFamily: "PoppinsBold",
        }}
        confirmedTipText={"Terkonfirmasi"}
        confirmedTipTextStyle={{
          color: "white",
          fontSize: 16,
          paddingTop: 4,
          fontFamily: "PoppinsBold",
        }}
        state={sliderState}
        onSlideConfirmed={() => {
          setSliderState(true);
          setShowModal(true)
          setSliderState(false);
        }}
        sliderStyle={{
          justifyContent: "center",
          width: 350,
          paddingVertical: 0,
          borderRadius: 0,
          overflow: "hidden",
          backgroundColor: "#6E7694",
        }}
        sliderButtonComponent={
          <View style={{ backgroundColor: Colors.blue.dark, width: 65 }}>
            <Image source={require("@/assets/images/SliderArrow.png")} />
          </View>
        }
      />
    </View>
  );
};

export default SlidingButton;
