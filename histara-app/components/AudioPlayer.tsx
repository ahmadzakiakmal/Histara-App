import { gs } from "@/constants/Styles";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import CustomText from "./CustomText";
import { Colors } from "@/constants/Colors";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [index, setIndex] = useState(0);

  function handlePlayPause() {
    setIsPlaying(!isPlaying);
  }

  return (
    <View>
      <View style={[gs.flexRow, gs.jc, { paddingBottom: 10, gap: 20 }]}>
        <TouchableOpacity
        onPress={() => setIndex(index - 1)}
        >
          <Image
            source={require("@/assets/images/Next.png")}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </TouchableOpacity>
        <CustomText
          weight={700}
          style={[{ color: "#FFF", alignSelf: "center" }]}
        >
          Nama Stop {index}
        </CustomText>
        <TouchableOpacity onPress={() => setIndex(index + 1)}>
          <Image source={require("@/assets/images/Next.png")} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingBottom: 12 }}>
        <View style={{ height: 8, backgroundColor: Colors.orange.main }}></View>
      </View>
      <View style={[gs.flexRow, gs.jc, { paddingHorizontal: 12, gap: 50, paddingBottom: 12 }]}>
        <TouchableOpacity
        // onPress={
        //   handleRewind
        // }
        >
          <Image source={require("@/assets/images/Rewind.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePlayPause()}>
          <Image source={isPlaying ? require("@/assets/images/Pause.png") : require("@/assets/images/Play.png")} />
        </TouchableOpacity>
        <TouchableOpacity
        // onPress={handleForward}
        >
          <Image source={require("@/assets/images/AntiRewind.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
