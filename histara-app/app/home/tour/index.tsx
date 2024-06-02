import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import SlidingUpPanel from "rn-sliding-up-panel";

export default function Tour() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          gs.flexRow,
          gs.ic,
          { backgroundColor: Colors.blue.dark, paddingTop: 50, paddingBottom: 12, paddingHorizontal: 18, gap: 18 },
        ]}
      >
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
      <View style={{ backgroundColor: Colors.blue.dark, paddingBottom: 10 }}>
        <Pressable
          /* @ts-ignore */
          onPress={() => this._panel.show(360)}
          style={{ paddingVertical: 5, backgroundColor: Colors.blue.dark, paddingHorizontal: 100 }}
        >
          <View style={{ backgroundColor: "#FFF", height: 5, borderRadius: 999 }} />
        </Pressable>
        <View style={[gs.flexRow, gs.jc, {paddingHorizontal: 12, gap: 50}]}>
          <TouchableOpacity>
            <Image source={require("@/assets/images/Rewind.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("@/assets/images/Pause.png")} />
          </TouchableOpacity> 
          <TouchableOpacity>
            <Image source={require("@/assets/images/AntiRewind.png")} />
          </TouchableOpacity>
        </View>
      </View>
      {/* @ts-ignore */}
      <SlidingUpPanel ref={(c) => (this._panel = c)}>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingVertical: 50,
            paddingHorizontal: 18,
            flex: 1,
          }}
        >
          <Text>Here is the content inside panel</Text>
          <Button
            text="Hide"
            onPress={() =>
              /* @ts-ignore */
              this._panel.hide()
            }
          />
        </View>
      </SlidingUpPanel>
      {/* <View style={{ backgroundColor: Colors.blue.dark, paddingTop: 50 }}>
        
      </View> */}
    </View>
  );
}
