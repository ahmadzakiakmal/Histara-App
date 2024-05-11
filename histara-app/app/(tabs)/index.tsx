import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60,
      }}
    >
      <View style={{ position: "relative", alignItems: "center" }}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{
            width: 194,
            height: 115,
          }}
        />
        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            position: "absolute",
            bottom: -10,
            fontSize: 16,
            color: Colors.orange.main,
          }}
        >
          Let's Explore the History of Nusantara
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

