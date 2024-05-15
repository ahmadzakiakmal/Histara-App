import { Image, View } from "react-native";
import CustomText from "./CustomText";
import { Link, usePathname, useRouter } from "expo-router";
import { gs } from "@/constants/Styles";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={[
        gs.flexRow,
        gs.ic,
        { borderColor: "#E6E6E6", borderTopWidth: 1, justifyContent: "space-evenly", paddingVertical: 7 },
      ]}
    >
      <NavbarItem
        text="Home"
        image={
          pathname.includes("home")
            ? require("@/assets/images/NavHomeActive.png")
            : require("@/assets/images/NavHomeInactive.png")
        }
        route="home"
        active={pathname.includes("home")}
        imageStyle={[{ width: 24, height: 24 }]}
      />
      <NavbarItem
        text="Explore"
        image={
          pathname.includes("explore")
            ? require("@/assets/images/NavExploreActive.png")
            : require("@/assets/images/NavExploreInactive.png")
        }
        route="explore"
        active={pathname.includes("explore")}
        imageStyle={[{ width: 24, height: 24 }]}
      />
      <NavbarItem
        text="Points"
        image={
          pathname.includes("points")
            ? require("@/assets/images/NavPointsActive.png")
            : require("@/assets/images/NavPointsInactive.png")
        }
        route="points"
        active={pathname.includes("points")}
        imageStyle={[{ width: 23, height: 23 }]}
      />
      <NavbarItem
        text="Profile"
        image={
          pathname.includes("profile")
            ? require("@/assets/images/NavProfileActive.png")
            : require("@/assets/images/NavProfileInactive.png")
        }
        route="profile"
        active={pathname.includes("profile")}
        imageStyle={[{ width: 30, height: 25 }]}
      />
    </View>
  );
}

interface NavbarItemProp {
  text: string;
  image: any;
  route: string;
  active: boolean;
  imageStyle: object[];
}
function NavbarItem({ text, image, route, active, imageStyle }: NavbarItemProp) {
  if (!image) return;
  return (
    <Link href={route}>
      <View style={[gs.ic]}>
        <Image
          source={image}
          style={imageStyle}
        />
        <CustomText
          weight={400}
          style={[{ fontSize: 10, color: active ? "#000" : "#918F8F" }]}
        >
          {text}
        </CustomText>
      </View>
    </Link>
  );
}
