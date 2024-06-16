import { gs } from "@/constants/Styles";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import CustomText from "./CustomText";
import { Colors } from "@/constants/Colors";
import { Audio } from "expo-av";
import stopsJson from "@/data/stops.json";

interface Stop {
  tourId: string;
  stopName: string;
  index: number;
}

export default function AudioPlayer({ id }: { id: string }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const stopsRaw: Stop[] = stopsJson;
  const [stops, setStops] = useState<Stop[]>([]);

  const audios = {
    YG01: [
      require("@/audio/YG01/AUDIO/Opening.mp3"),
      require("@/audio/YG01/AUDIO/01.mp3"),
      require("@/audio/YG01/AUDIO/02.mp3"),
      require("@/audio/YG01/AUDIO/03.mp3"),
      require("@/audio/YG01/AUDIO/04.mp3"),
      require("@/audio/YG01/AUDIO/05.mp3"),
      require("@/audio/YG01/AUDIO/06.mp3"),
      require("@/audio/YG01/AUDIO/07.mp3"),
      require("@/audio/YG01/AUDIO/08.mp3"),
      require("@/audio/YG01/AUDIO/09.mp3"),
      require("@/audio/YG01/AUDIO/Closing.mp3"),
    ],
    MG01: [
      require("@/audio/MG01/AUDIO/Opening.mp3"),
      require("@/audio/MG01/AUDIO/01.mp3"),
      require("@/audio/MG01/AUDIO/02.mp3"),
      require("@/audio/MG01/AUDIO/03.mp3"),
      require("@/audio/MG01/AUDIO/04.mp3"),
      require("@/audio/MG01/AUDIO/05.mp3"),
      require("@/audio/MG01/AUDIO/Closing.mp3"),
    ],
    YG02: [
      require("@/audio/YG02/AUDIO/Opening.mp3"),
      require("@/audio/YG02/AUDIO/01.mp3"),
      require("@/audio/YG02/AUDIO/02.mp3"),
      require("@/audio/YG02/AUDIO/03.mp3"),
      require("@/audio/YG02/AUDIO/04.mp3"),
      require("@/audio/YG02/AUDIO/05.mp3"),
      require("@/audio/YG02/AUDIO/06.mp3"),
      require("@/audio/YG02/AUDIO/07.mp3"),
      require("@/audio/YG02/AUDIO/08.mp3"),
      require("@/audio/YG02/AUDIO/09.mp3"),
      require("@/audio/YG02/AUDIO/10.mp3"),
      require("@/audio/YG02/AUDIO/Closing.mp3"),
    ],
    YG03: [
      require("@/audio/YG03/AUDIO/Opening.mp3"),
      require("@/audio/YG03/AUDIO/01.mp3"),
      require("@/audio/YG03/AUDIO/02.mp3"),
      require("@/audio/YG03/AUDIO/03.mp3"),
      require("@/audio/YG03/AUDIO/04.mp3"),
      require("@/audio/YG03/AUDIO/05.mp3"),
      require("@/audio/YG03/AUDIO/06.mp3"),
      require("@/audio/YG03/AUDIO/Closing.mp3"),
    ],
    YG04: [
      require("@/audio/YG04/AUDIO/Opening.mp3"),
      require("@/audio/YG04/AUDIO/01.mp3"),
      require("@/audio/YG04/AUDIO/02.mp3"),
      require("@/audio/YG04/AUDIO/03.mp3"),
      require("@/audio/YG04/AUDIO/04.mp3"),
      require("@/audio/YG04/AUDIO/05.mp3"),
      require("@/audio/YG04/AUDIO/Closing.mp3"),
    ],
    MG02: [
      require("@/audio/MG02/AUDIO/Opening.mp3"),
      require("@/audio/MG02/AUDIO/01.mp3"),
      require("@/audio/MG02/AUDIO/02.mp3"),
      require("@/audio/MG02/AUDIO/03.mp3"),
      require("@/audio/MG02/AUDIO/04.mp3"),
      require("@/audio/MG02/AUDIO/05.mp3"),
      require("@/audio/MG02/AUDIO/06.mp3"),
      require("@/audio/MG02/AUDIO/07.mp3"),
      require("@/audio/MG02/AUDIO/08.mp3"),
      require("@/audio/MG02/AUDIO/09.mp3"),
      require("@/audio/MG02/AUDIO/Closing.mp3"),
    ],
    AM01: [
      require("@/audio/AM01/AUDIO/Opening.mp3"),
      require("@/audio/AM01/AUDIO/01.mp3"),
      require("@/audio/AM01/AUDIO/02.mp3"),
      require("@/audio/AM01/AUDIO/03.mp3"),
      require("@/audio/AM01/AUDIO/04.mp3"),
      require("@/audio/AM01/AUDIO/05.mp3"),
      require("@/audio/AM01/AUDIO/06.mp3"),
      require("@/audio/AM01/AUDIO/07.mp3"),
      require("@/audio/AM01/AUDIO/Closing.mp3"),
    ],
    SM01: [
      require("@/audio/SM01/AUDIO/Opening.mp3"),
      require("@/audio/SM01/AUDIO/01.mp3"),
      require("@/audio/SM01/AUDIO/02.mp3"),
      require("@/audio/SM01/AUDIO/03.mp3"),
      require("@/audio/SM01/AUDIO/04.mp3"),
      require("@/audio/SM01/AUDIO/05.mp3"),
      require("@/audio/SM01/AUDIO/06.mp3"),
      require("@/audio/SM01/AUDIO/07.mp3"),
      require("@/audio/SM01/AUDIO/08.mp3"),
      require("@/audio/SM01/AUDIO/Closing.mp3"),
    ],
    SM02: [
      require("@/audio/SM02/AUDIO/Opening.mp3"),
      require("@/audio/SM02/AUDIO/01.mp3"),
      require("@/audio/SM02/AUDIO/02.mp3"),
      require("@/audio/SM02/AUDIO/03.mp3"),
      require("@/audio/SM02/AUDIO/04.mp3"),
      require("@/audio/SM02/AUDIO/05.mp3"),
      require("@/audio/SM02/AUDIO/06.mp3"),
      require("@/audio/SM02/AUDIO/07.mp3"),
      require("@/audio/SM02/AUDIO/08.mp3"),
      require("@/audio/SM02/AUDIO/Closing.mp3"),
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
      <View style={[gs.flexRow, { paddingBottom: 10, gap: 20, justifyContent: "space-between", paddingHorizontal: 20 }]}>
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
        <View style={{ height: 8, backgroundColor: Colors.orange.main, width: `${progress * 100}%`, position: "relative", alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 20, height: 20, borderRadius: 20, position: "absolute", backgroundColor: "#FFF", left: "100%"}}></View>
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
