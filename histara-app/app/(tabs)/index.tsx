import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";

export default function HomeScreen() {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 24,
        backgroundColor: "#FFF", 
        minHeight: "100%"
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

      <View style={{ width: "100%", marginTop: 42 }}>
        <Button text="Create Account" />
      </View>
    </View>
  );
}