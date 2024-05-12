import { Image, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import CustomText from "@/components/CustomText";

export default function HomeScreen() {
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

      <View style={{ width: "100%", marginTop: 42 }}>
        <Button text="Create Account" />
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
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
        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 16 }}>
          <View style={{ flex: 1, width: 20, height: 1, backgroundColor: "#828282 " }} />
          <View style={{marginHorizontal: 5}}>
          <CustomText weight={700} style={[{color: "#828282"}]}>OR</CustomText>
          </View>
          <View style={{ flex: 1, width: 20, height: 1, backgroundColor: "#828282 " }} />
        </View> 
        <Button text="Continue with Google" />
      </View>
    </View>
  );
}

