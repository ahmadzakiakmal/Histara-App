import { gs } from "@/constants/Styles";
import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import CustomText from "./CustomText";
import { Colors } from "@/constants/Colors";
import { Audio } from "expo-av";
import stopsJson from "@/data/stops.json";
import { useFocusEffect } from "expo-router";

interface Stop {
  tourId: string;
  stopName: string;
  index: number;
}

export default function AudioPlayer({ id, allowAudio }: { id: string; allowAudio: boolean }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const stopsRaw: Stop[] = stopsJson;
  const [stops, setStops] = useState<Stop[]>([]);

  const audios = {
    YG01: [
      require("@/audio/YG01/Opening.mp3"),
      require("@/audio/YG01/01.mp3"),
      require("@/audio/YG01/02.mp3"),
      require("@/audio/YG01/03.mp3"),
      require("@/audio/YG01/04.mp3"),
      require("@/audio/YG01/05.mp3"),
      require("@/audio/YG01/06.mp3"),
      require("@/audio/YG01/07.mp3"),
      require("@/audio/YG01/08.mp3"),
      require("@/audio/YG01/09.mp3"),
      require("@/audio/YG01/Closing.mp3"),
    ],
    MG01: [
      require("@/audio/MG01/Opening.mp3"),
      require("@/audio/MG01/01.mp3"),
      require("@/audio/MG01/02.mp3"),
      require("@/audio/MG01/03.mp3"),
      require("@/audio/MG01/04.mp3"),
      require("@/audio/MG01/05.mp3"),
      require("@/audio/MG01/Closing.mp3"),
    ],
    YG02: [
      require("@/audio/YG02/Opening.mp3"),
      require("@/audio/YG02/01.mp3"),
      require("@/audio/YG02/02.mp3"),
      require("@/audio/YG02/03.mp3"),
      require("@/audio/YG02/04.mp3"),
      require("@/audio/YG02/05.mp3"),
      require("@/audio/YG02/06.mp3"),
      require("@/audio/YG02/07.mp3"),
      require("@/audio/YG02/08.mp3"),
      require("@/audio/YG02/09.mp3"),
      require("@/audio/YG02/10.mp3"),
      require("@/audio/YG02/Closing.mp3"),
    ],
    YG03: [
      require("@/audio/YG03/Opening.mp3"),
      require("@/audio/YG03/01.mp3"),
      require("@/audio/YG03/02.mp3"),
      require("@/audio/YG03/03.mp3"),
      require("@/audio/YG03/04.mp3"),
      require("@/audio/YG03/05.mp3"),
      require("@/audio/YG03/06.mp3"),
      require("@/audio/YG03/Closing.mp3"),
    ],
    YG04: [
      require("@/audio/YG04/Opening.mp3"),
      require("@/audio/YG04/01.mp3"),
      require("@/audio/YG04/02.mp3"),
      require("@/audio/YG04/03.mp3"),
      require("@/audio/YG04/04.mp3"),
      require("@/audio/YG04/05.mp3"),
      require("@/audio/YG04/Closing.mp3"),
    ],
    MG02: [
      require("@/audio/MG02/Opening.mp3"),
      require("@/audio/MG02/01.mp3"),
      require("@/audio/MG02/02.mp3"),
      require("@/audio/MG02/03.mp3"),
      require("@/audio/MG02/04.mp3"),
      require("@/audio/MG02/05.mp3"),
      require("@/audio/MG02/06.mp3"),
      require("@/audio/MG02/07.mp3"),
      require("@/audio/MG02/08.mp3"),
      require("@/audio/MG02/09.mp3"),
      require("@/audio/MG02/Closing.mp3"),
    ],
    AM01: [
      require("@/audio/AM01/Opening.mp3"),
      require("@/audio/AM01/01.mp3"),
      require("@/audio/AM01/02.mp3"),
      require("@/audio/AM01/03.mp3"),
      require("@/audio/AM01/04.mp3"),
      require("@/audio/AM01/05.mp3"),
      require("@/audio/AM01/06.mp3"),
      require("@/audio/AM01/07.mp3"),
      require("@/audio/AM01/Closing.mp3"),
    ],
    SM01: [
      require("@/audio/SM01/Opening.mp3"),
      require("@/audio/SM01/01.mp3"),
      require("@/audio/SM01/02.mp3"),
      require("@/audio/SM01/03.mp3"),
      require("@/audio/SM01/04.mp3"),
      require("@/audio/SM01/05.mp3"),
      require("@/audio/SM01/06.mp3"),
      require("@/audio/SM01/07.mp3"),
      require("@/audio/SM01/08.mp3"),
      require("@/audio/SM01/Closing.mp3"),
    ],
    SM02: [
      require("@/audio/SM02/Opening.mp3"),
      require("@/audio/SM02/01.mp3"),
      require("@/audio/SM02/02.mp3"),
      require("@/audio/SM02/03.mp3"),
      require("@/audio/SM02/04.mp3"),
      require("@/audio/SM02/05.mp3"),
      require("@/audio/SM02/06.mp3"),
      require("@/audio/SM02/07.mp3"),
      require("@/audio/SM02/08.mp3"),
      require("@/audio/SM02/Closing.mp3"),
    ],
  };

  useEffect(() => {
    const filteredStops = stopsRaw.filter((stop) => stop.tourId === id);

    const sortedStops = filteredStops.sort((a, b) => a.index - b.index);
    sortedStops.forEach((stop) => {
      stop.index += 1;
    });

    setStops([
      { stopName: "Opening", tourId: id, index: 0 },
      ...sortedStops,
      { stopName: "Closing", tourId: id, index: sortedStops.length + 1 },
    ]);
  }, [id, stopsRaw]);

  async function playSound(index: number) {
    if (sound) {
      await sound.unloadAsync();
    }

    console.log("Loading Sound");
    // @ts-ignore
    const { sound: newSound } = await Audio.Sound.createAsync(audios[id][index]);
    setSound(newSound);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.isPlaying && status.durationMillis) {
        setProgress(status.positionMillis / status.durationMillis);
      }
    });

    console.log("Playing Sound");
    await newSound.playAsync();
    setIsPlaying(true);
  }

  async function pauseSound() {
    if (sound) {
      console.log("Pausing Sound");
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return () => {
      if (sound) {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (isPlaying) {
      playSound(index);
    }
  }, [index]);

  useEffect(() => {
    console.log(allowAudio);
    if (isPlaying && sound) {
      pauseSound()
    }
  }, [allowAudio]);

  function handlePlayPause() {
    if (isPlaying) {
      pauseSound();
    } else {
      playSound(index);
    }
  }

  function handleNext() {
    setIndex((prevIndex) => (prevIndex + 1) % stops.length);
  }

  function handlePrevious() {
    setIndex((prevIndex) => (prevIndex - 1 + stops.length) % stops.length);
  }

  async function handleSeekForward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.positionMillis != null && status.durationMillis != null) {
        const newPosition = Math.min(status.positionMillis + 15000, status.durationMillis);
        await sound.setPositionAsync(newPosition);
      }
    }
  }

  async function handleSeekBackward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.positionMillis != null) {
        const newPosition = Math.max(status.positionMillis - 15000, 0);
        await sound.setPositionAsync(newPosition);
      }
    }
  }

  return (
    <View>
      <View
        style={[gs.flexRow, { paddingBottom: 10, gap: 20, justifyContent: "space-between", paddingHorizontal: 20 }]}
      >
        <TouchableOpacity onPress={handlePrevious}>
          <Image
            source={require("@/assets/images/Next.png")}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </TouchableOpacity>
        <CustomText
          weight={700}
          style={[{ color: "#FFF", flex: 1, textAlign: "center" }]}
        >
          {stops[index]?.stopName}
        </CustomText>
        <TouchableOpacity onPress={handleNext}>
          <Image source={require("@/assets/images/Next.png")} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 12, backgroundColor: "#A16C57" }}>
        <View
          style={{
            height: 8,
            backgroundColor: Colors.orange.main,
            width: `${progress * 100}%`,
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              position: "absolute",
              backgroundColor: "#FFF",
              left: "100%",
            }}
          ></View>
        </View>
      </View>

      <View style={[gs.flexRow, gs.jc, { paddingHorizontal: 12, gap: 50, paddingBottom: 12 }]}>
        <TouchableOpacity onPress={handleSeekBackward}>
          <Image source={require("@/assets/images/Rewind.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Image source={isPlaying ? require("@/assets/images/Pause.png") : require("@/assets/images/Play.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSeekForward}>
          <Image source={require("@/assets/images/AntiRewind.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
