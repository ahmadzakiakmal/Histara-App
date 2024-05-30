import { gs } from "@/constants/Styles";
import { Image, Pressable, View } from "react-native";
import CustomText from "./CustomText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  const router = useRouter();

  if (!title) {
    return (
      <View
        style={[
          gs.jc,
          gs.ic,
          { paddingTop: 30, borderColor: "#DADADA", borderBottomWidth: 1, backgroundColor: "#FFF" },
        ]}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 120, height: 71 }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          paddingTop: 50,
          paddingBottom: 16,
          borderColor: "#DADADA",
          borderBottomWidth: 1,
        }}
      >
        <View style={[gs.flexRow, gs.ic, { paddingHorizontal: 10, gap: 10 }]}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("@/assets/images/LeftArrowBlue.png")}
              style={{ width: 25, height: 25 }}
            />
          </Pressable>
          <CustomText
            weight={700}
            style={[{ color: Colors.blue.dark, fontSize: 20, paddingTop: 3 }]}
          >
            {title}
          </CustomText>
        </View>
      </View>
    );
  }
}
