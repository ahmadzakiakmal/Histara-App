import { Dimensions, ScrollView, StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Header from "@/components/Header";
import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Utilities } from "@/utilities/Utilities";
import { Colors } from "@/constants/Colors";

interface Place {
  id: number;
  title: string;
  image: string;
}

export default function HomeScreen() {
  const colors = ["tomato", "thistle", "skyblue", "teal"];
  const { width } = Dimensions.get("window");
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    child: { width, height: 200, justifyContent: "center" },
    text: { fontSize: 20, textAlign: "center" },
  });
  const [places, setPlaces] = useState<[Place, Place][]>([]);

  const placesRaw: Place[] = [
    {
      id: 1,
      title: "Yogyakarta",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihb0ej6m-bfpUnDsSpFoy-imw4Og8x2J-WbaJqLAsVy2MYCJGcNG4pslyzARjGKgrbXNwSXkFwK6A7UVopdp7x0MDjAyRIunmiw=w1879-h931-rw-v1",
    },
    {
      id: 2,
      title: "Ambarawa",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihaW1fsUY6dEd3SG82t9ApLbDh41haFXFmP92WXwWX5z1AtgWpzcCNS60lb2qcvgfGpsRHnAqWC7VSQSZEe0rm6Ru3rbt2zvads=w1879-h931-rw-v1",
    },
    {
      id: 3,
      title: "Magelang",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbpx39-jyuXG6XDgHiFGROX4Os0aA-6_SX_1pYS8PITqpwgx2QucAKJ6oF578jNSXSNJ3pTTbDSFybh88MllRey46gF7ynpzg=w1879-h931-rw-v1",
    },
    {
      id: 5,
      title: "Semarang",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbfZIY0YFudxPqTKNmtGQlkV-_bhZLgDcxUpMlM-fIgNDVoQt4ifNg0Jwc99X0-OQKzRchPcAxh78hshrExJAn9ktW-9wPv3JA=w1879-h931-rw-v1",
    },
  ];

  useEffect(() => {
    console.log(placesRaw)
    const pairedPlaces: [Place, Place][] = [];
    placesRaw.forEach((place, index) => {
      if (index % 2 !== 1) {
        const pairPlaces: [Place, Place] = [place, placesRaw[index + 1]];
        pairedPlaces.push(pairPlaces);
      }
    });
    setPlaces(pairedPlaces);
  }, []);

  const Item = ({ item }: { item: { image: string; title: string } }) => (
    <View style={{ height: 200, width: Utilities.getScreenWidth(), backgroundColor: "#727272", position: "relative" }}>
      <Image
        source={{ uri: item.image }}
        style={{ height: 200, width: "100%"}}
      />
      <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: Colors.orange.main, opacity: .2}} />
      {/* <CustomText
        weight={700}
        style={[{ position: "absolute" }]}
      >
        {item.title}
      </CustomText> */}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#FFF" }}>
      <Header />
      <View style={{ position: "relative" }}>
        <SwiperFlatList
          autoplay
          autoplayDelay={5}
          index={2}
          showPagination
          paginationStyle={{
            left: 5,
            position: "absolute",
          }}
          paginationStyleItem={{
            borderRadius: 0,
            width: 41,
            height: 2,
          }}
          paginationActiveColor="#FFF"
          paginationDefaultColor="rgba(255,255,255,0.36)"
          data={placesRaw}
          renderItem={({ item }) => (
            <Item item={item} />
          )}
          autoplayLoop
        />
      </View>
      <View style={{ paddingHorizontal: 18, paddingTop: 12 }}>
        <CustomText
          italic={true}
          weight={700}
          style={[{ fontSize: 20, marginBottom: 12 }]}
        >
          Let&apos;s Explore
        </CustomText>
        <View>
          {places.map((pairPlace, index) => {
            return (
              <PlacesPairItem
                key={index}
                pairPlace={pairPlace}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

function PlacesPairItem({ pairPlace }: { pairPlace: [Place, Place] }) {
  const router = useRouter();
  return (
    <View style={{ flexDirection: "row", gap: 23, marginBottom: 13 }}>
      <Pressable
        onPress={() => router.navigate("/home/menu-paket/" + pairPlace[0]?.title)}
        style={{ flex: 1, gap: 8 }}
      >
        <View
          style={{
            height: 163,
            backgroundColor: "#D9D9D9",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 10, height: 5 },
            elevation: 6,
            overflow: "hidden",
          }}
        >
          {pairPlace[0]?.image && (
            <Image
              source={{ uri: pairPlace[0]?.image }}
              style={{ height: 163, width: "auto" }}
            />
          )}
        </View>
        <CustomText
          style={[{ textAlign: "center" }]}
          weight={700}
        >
          {pairPlace[0]?.title}
        </CustomText>
      </Pressable>
      {pairPlace[1] !== undefined && (
        <Pressable
          onPress={() => router.navigate("/home/menu-paket/" + pairPlace[1]?.title)}
          style={{ flex: 1, gap: 8 }}
        >
          <View
            style={{
              height: 163,
              backgroundColor: "#D9D9D9",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 10, height: 5 },
              elevation: 6,
              overflow: "hidden",
            }}
          >
            {pairPlace[1]?.image && (
              <Image
                source={{ uri: pairPlace[1]?.image }}
                style={{ height: 163, width: "auto" }}
              />
            )}
          </View>
          <CustomText
            style={[{ textAlign: "center" }]}
            weight={700}
          >
            {pairPlace[1]?.title}
          </CustomText>
        </Pressable>
      )}
    </View>
  );
}
