import { Image, Linking, Pressable } from "react-native";

export default function ChatButton() {
  return (
    <Pressable
      style={{ position: "absolute", right: 18, bottom: 68 }}
      onPress={() => {
        Linking.openURL("https://s.id/WAHISTARA");
      }}
    > 
      <Image source={require("@/assets/images/Chat.png")} />
    </Pressable>
  );
}
