import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
// @ts-ignore
import SlideToConfirm from "rn-slide-to-confirm";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "@/redux/slice/authSlice";
import { setPoint } from "@/redux/slice/userSlice";

const SlidingButton = ({
  point,
  setShowModal,
  umkmId
}: {
  point: number;
  setShowModal: any;
  umkmId: string;
}) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const [sliderState, setSliderState] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (confirmed) {
      handleRedeem();
    }
  }, [confirmed]);

  const handleRedeem = () => {
    console.log("Attempting to redeem points...");
    axios
      .post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/point/spend`,
        {
          rewardId: umkmId
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then((res) => {
        console.log("Redemption successful:", res.data);
        dispatch(setPoint(res.data.points));
        setShowModal(true);
        setSliderState(false);
      })
      .catch((err) => {
        console.error("Redemption failed:", err);
        setSliderState(false);
      })
      .finally(() => {
        setConfirmed(false);
      });
  };

  return (
    <View>
      <SlideToConfirm
        unconfimredTipText={point.toString() + " Point"}
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
        onSlideConfirmed={() => {
          setSliderState(true);
          setConfirmed(true);
        }}
        sliderStyle={{
          justifyContent: "center",
          width: 350,
          paddingVertical: 0,
          borderRadius: 0,
          overflow: "hidden",
          backgroundColor: "#6E7694"
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
