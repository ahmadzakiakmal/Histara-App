import { ReactElement, ReactNode } from "react";
import { Text } from "react-native";

interface Props {
  style?: object[];
  weight: number;
  italic?: boolean;
  underline?: boolean;
  children: ReactNode;
}

export default function CustomText({ style, weight, italic = false, children, underline = false }: Props) {
  const detFontFamily = (weight: number, italic: boolean): string => {
    switch (weight) {
      case 100:
        return italic ? "PoppinsThinItalic" : "PoppinsThin";
      case 200:
        return italic ? "PoppinsExtraLightItalic" : "PoppinsExtraLight";
      case 300:
        return italic ? "PoppinsLightItalic" : "PoppinsLight";
      case 400:
        return italic ? "PoppinsRegularItalic" : "PoppinsRegular";
      case 500:
        return italic ? "PoppinsMediumItalic" : "PoppinsMedium";
      case 600:
        return italic ? "PoppinsSemiBoldItalic" : "PoppinsSemiBold";
      case 700:
        return italic ? "PoppinsBoldItalic" : "PoppinsBold";
      case 800:
        return italic ? "PoppinsExtraBoldItalic" : "PoppinsExtraBold";
      case 900:
        return italic ? "PoppinsBlackItalic" : "PoppinsBlack";
      default:
        return italic ? "PoppinsRegularItalic" : "PoppinsRegular"; // Defaulting to regular if unspecified
    }
  };

  return (
    <Text
      style={[
        {
          fontFamily: detFontFamily(weight, italic),
          fontSize: 16
        },
        underline && { textDecorationStyle: "solid", textDecorationLine: "underline" },
        style
      ]}
    >
      {children}
    </Text>
  );
}
