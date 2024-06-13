import { gs } from "@/constants/Styles";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";

export default function AudioPlayer()  {
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlayPause() {
    setIsPlaying(!isPlaying)
  }

  return (
    <View style={[gs.flexRow, gs.jc, { paddingHorizontal: 12, gap: 50, paddingBottom: 12 }]}>
      <TouchableOpacity
      // onPress={
      //   handleRewind
      // }
      >
        <Image source={require("@/assets/images/Rewind.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePlayPause()}
      >
        <Image  source={isPlaying ? require("@/assets/images/Pause.png") : require("@/assets/images/Play.png")} />
      </TouchableOpacity>
      <TouchableOpacity
      // onPress={handleForward}
      >
        <Image source={require("@/assets/images/AntiRewind.png")} />
      </TouchableOpacity>
    </View>
  );
};

