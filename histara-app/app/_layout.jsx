import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from "@/redux/store/store";
import { loadToken } from "@/redux/slice/authSlice";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Navbar from "@/components/Navbar";
import Toast, { BaseToast } from "react-native-toast-message";
import { useFonts } from "expo-font";
import ChatButton from "@/components/ChatButton";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsBlackItalic: require("../assets/fonts/Poppins-BlackItalic.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsBoldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsExtraLightItalic: require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsLightItalic: require("../assets/fonts/Poppins-LightItalic.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsSemiBoldItalic: require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
    PoppinsThinItalic: require("../assets/fonts/Poppins-ThinItalic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const focus = useIsFocused();
  useEffect(() => {
    const navbarPages = ["home", "explore", "points", "profile"];
    if (pathname === "/") return setShowNavbar(false);
    if (pathname.includes("detail")) return setShowNavbar(false);
    if (pathname.includes("auth")) return setShowNavbar(false);
    if (pathname.includes("tour")) return setShowNavbar(false);
    if (pathname.includes("pembayaran")) return setShowNavbar(false);
    if (pathname.includes("menu-paket")) return setShowNavbar(true);
    if (navbarPages.includes(pathname.slice(1))) {
      setShowNavbar(true);
    }
  }, [pathname, focus]);

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#3BE23B" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 16,
        }}
        text2Style={{
          fontFamily: "PoppinsRegular",
          fontSize: 14,
        }}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#FF2400" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 16,
        }}
        text2Style={{
          fontFamily: "PoppinsRegular",
          fontSize: 14,
        }}
      />
    ),
    loading: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#828282" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 16,
        }}
        text2Style={{
          fontFamily: "PoppinsRegular",
          fontSize: 14,
        }}
      />
    ),
  };

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
      {showNavbar && <Navbar />}
      {showNavbar && <ChatButton />}
      <Toast config={toastConfig} />
    </>
  );
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
