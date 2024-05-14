import React, { useState } from "react";
import { View, ScrollView, Image, Pressable, Animated } from "react-native";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";
import { gs } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Utilities } from "@/utilities/Utilities";
import SignUpTab from "@/components/auth/SignUp";
import SignInTab from "@/components/auth/SignIn";

export default function AuthScreen() {
  const router = useRouter();
  const [onTab1, setOnTab1] = useState(true);
  const [translateX] = useState(new Animated.Value(0));

  return (
    <>
      <View style={{ backgroundColor: Colors.blue.dark, paddingTop: 50, paddingBottom: 3 }}>
        <View style={[gs.flexRow, gs.ic, { paddingHorizontal: 10, gap: 10 }]}>
          <Pressable onPress={() => router.navigate("/")}>
            <Image
              source={require("@/assets/images/LeftArrow.png")}
              style={{ width: 24, height: 24 }}
            />
          </Pressable>
          <CustomText
            weight={700}
            style={[{ color: "#FFF", fontSize: 20 }]}
          >
            Account
          </CustomText>
        </View>
        <View style={[gs.flexRow, { marginTop: 25, paddingBottom: 11 }]}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              setOnTab1(true);
              Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }}
          >
            <CustomText
              weight={500}
              style={[{ color: "#FFF", fontSize: 20, textAlign: "center" }]}
            >
              SIGN UP
            </CustomText>
          </Pressable>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              setOnTab1(false);
              Animated.timing(translateX, {
                toValue: Utilities.getScreenWidth() / 2,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }}
          >
            <CustomText
              weight={500}
              style={[{ color: "#FFF", fontSize: 20, textAlign: "center" }]}
            >
              SIGN IN
            </CustomText>
          </Pressable>
        </View>
        <Animated.View
          style={[{ width: "50%", backgroundColor: "#FFF", height: 4 }, { transform: [{ translateX }] }]}
        />
      </View>
      <ScrollView contentContainerStyle={{ width: "100%", paddingTop: 40 }}>
        {onTab1 ? <SignUpTab /> : <SignInTab />}
      </ScrollView>
    </>
  );
}
