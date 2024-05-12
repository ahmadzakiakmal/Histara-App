import { Image, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import { useState } from "react";

export default function HomeScreen() {
  const [touched, setTouched] = useState(false)
  return ( 
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 24,
        backgroundColor: "#FFF",
        minHeight: "100%",
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

      <View style={{ width: "100%", marginTop: 42, gap: 16 }}>
        <Button text="Create Account" />
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
          <CustomText
            weight={400}
            italic={false}
          >
            Already have an account?{" "}
          </CustomText>
          <TouchableOpacity>
            <CustomText
              weight={700}
              italic={true}
              underline={true}
              style={[{ textDecorationLine: "underline" }]}
            >
              Sign in
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <View style={{ flex: 1, width: 20, height: 1, backgroundColor: "#828282" }} />
          <View style={{ marginHorizontal: 5 }}>
            <CustomText
              weight={700}
              style={[{ color: "#828282" }]}
            >
              OR
            </CustomText>
          </View>
          <View style={{ flex: 1, width: 20, height: 1, backgroundColor: "#828282" }} />
        </View>
        <TouchableOpacity
          style={[
            {
              backgroundColor: "transparent",
              width: "100%",
              borderRadius: 8,
              borderColor: Colors.orange.main,
              borderWidth: 3,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 9,
              gap: 8
            },
            touched && {
              backgroundColor: "rgba(0,0,0,.2)",
              opacity: 1,
              borderColor: Colors.orange.dark
            }
          ]}
          onPress={() => {
            console.log("Google");
          }}
          onPressIn={() => {
            setTouched(true);
          }}
          onPressOut={() => {
            setTouched(false);
          }}
        >
          <Image
            source={require("@/assets/images/Google.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text
            style={{
              color: Colors.blue.dark,
              fontFamily: "PoppinsBold",
              fontSize: 16,
              lineHeight: 1.4 * 16
            }}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

