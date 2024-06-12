import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { gs } from "@/constants/Styles";
import { Dispatch, useEffect, useState } from "react";
import { ScrollView, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { getToken } from "@/redux/slice/authSlice";
import axios from "axios";

export default function TourHistoryScreen() {
  const token = useSelector(getToken);
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
    axios.get(process.env.EXPO_PUBLIC_BACKEND_URL + "/v1/transaction/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const formattedData = res.data.transactions.map((item: any) => ({
        ...item,
        transactionTime: new Date(item.transactionTime),
      }));
      setHistoryData(formattedData);
    })
    .catch((err) => {
      console.error(err);
    });
  }, [token]);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Riwayat Tur" />
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#FFF", paddingTop: 15, paddingHorizontal: 22 }}>
        <View style={[gs.ic, { gap: 10 }]}>
          {historyData.map((item) => (
            <HistoryItem
              key={item._id}
              id={item._id}
              name={item.tourName}
              city={item.tourAddress}
              date={item.transactionTime}
              status={item.transactionStatus}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function HistoryItem({ name, city, date, id, status }: { name: string; city: string; date: Date; id: string; status: string }) {
  const router = useRouter();
  const [touched, setTouched] = useState<boolean>(false);

  return (
    <Pressable
      onPress={() => router.navigate("/profile/history/" + id)}
      onPressIn={() => setTouched(true)}
      onPressOut={() => setTouched(false)}
      style={[
        gs.flexRow,
        {
          borderColor: Colors.orange.main,
          borderWidth: 1,
          width: "100%",
          paddingHorizontal: 23,
          paddingVertical: 18,
          borderRadius: 10,
          justifyContent: "space-between",
        },
        touched && {backgroundColor: "#DADADA"}
      ]}
    >
      <View>
        <CustomText weight={700}>{name}</CustomText>
        <CustomText weight={400}>{city}</CustomText>
        <CustomText weight={400}>{date?.toLocaleDateString()}</CustomText>
      </View>
      <View
        style={{
          backgroundColor: Colors.blue.dark,
          alignSelf: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 2,
          borderRadius: 8,
        }}
      >
        <CustomText weight={400} style={[{ color: "#FFF" }]}>
          {status}
        </CustomText>
      </View>
    </Pressable>
  );
}
