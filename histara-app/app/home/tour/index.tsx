import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { View } from "react-native";
import WebView from "react-native-webview";

export default function Tour() {
  return (
    <View style={{ flex: 1 }}>
      <View style={[gs.flexRow, gs.ic, { backgroundColor: Colors.blue.dark, paddingTop: 50, paddingBottom: 12, paddingHorizontal: 18, gap: 18 }]}>
        <View style={{ backgroundColor: "#DEDEDE", width: 57, height: 57, borderRadius: 999 }} />
        <CustomText
          weight={700}
          style={[{ color: "#FFF", fontSize: 20 }]}
        >
          Nama Paket Tur
        </CustomText>
      </View>
      <WebView
        containerStyle={{ width: "auto" }}
        source={{
          uri: "https://histara-map-git-main-ahmadzaki2975s-projects.vercel.app",
        }}
      />
      <View style={{ backgroundColor: Colors.blue.dark, paddingTop: 50 }}>
        {/* <CustomText
          weight={700}
          style={[{ color: "#FFF" }]}
        >
          
        </CustomText> */}
      </View>
    </View>
  );
}
