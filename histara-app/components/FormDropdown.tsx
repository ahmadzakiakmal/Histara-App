import { Image, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CustomText from "./CustomText";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Dispatch } from "react";
import { Utilities } from "@/utilities/Utilities";

interface Props {
  state: any;
  setState: (newValue: any) => void;
  placeholder: string;
  options: OptionItem[];
}

interface OptionItem {
  title: string;
  value: any;
}

export default function FormDropdown({
  state,
  setState,
  placeholder = "Select...",
  options = [
    {
      title: "Test 1",
      value: 1,
    },
    {
      title: "Test 2",
      value: 2,
    },
  ],
}: Props) {
  const initialSelectedItem = options.find(option => option.value === state);
  return (
    <SelectDropdown
      data={options}
      defaultValue={initialSelectedItem}
      dropdownStyle={{marginTop: -200}}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
        setState(selectedItem);
      }}
      renderButton={(selectedItem, isOpen) => {
        return (
          <View
            style={[
              gs.flexRow,
              {
                borderColor: Colors.orange.main,
                borderWidth: 2,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingTop: 10,
                paddingBottom: 8,
              },
            ]}
          >
            <CustomText
              weight={700}
              style={[{ color: selectedItem ? "#000" : "#DADADA", flex: 1 }]}
            >
              {selectedItem?.title ?? placeholder}
            </CustomText>
            <Image source={require("@/assets/images/CeretDown.png")} style={{width: 30 }} />
          </View>
        );
      }}
      renderItem={(item) => {
        return (
          <View style={{ paddingVertical: 2, paddingHorizontal: 5 }}>
            <CustomText weight={500}>{item?.title}</CustomText>
          </View>
        );
      }}
    />
  );
}
