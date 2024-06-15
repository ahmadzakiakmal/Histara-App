import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Image, View } from "react-native";
// @ts-ignore
import SlideToConfirm from "rn-slide-to-confirm";
import CustomText from "./CustomText";
import { PrivateValueStore } from "@react-navigation/native";

const SlidingButton = () => {
  const [sliderState, setSliderState] = useState(false);

  return (
    <View>
      <SlideToConfirm
        unconfimredTipText={"Geser untuk konfirmasi"}
        unconfirmedTipTextStyle={{
          color: "white",
          fontSize: 16,
          paddingTop: 4,
          fontFamily: "PoppinsBold"
        }}
        confirmedTipText={"Terkonfirmasi"}
        confirmedTipTextStyle={{
          color: "white",
          fontSize: 16,
          paddingTop: 4,
          fontFamily: "PoppinsBold"
        }}
        state={sliderState}
        onSlideConfirmed={() => setSliderState(true)}
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
