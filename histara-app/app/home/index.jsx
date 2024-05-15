import { Dimensions, ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Header from "@/components/Header";
import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const colors = ["tomato", "thistle", "skyblue", "teal"];
  const { width } = Dimensions.get("window");
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    child: { width, height: 200, justifyContent: "center" },
    text: { fontSize: 20, textAlign: "center" },
  });
  const [places, setPlaces] = useState([]);

  const placesRaw = [
    {
      id: 1,
      title: "Yogyakarta",
    },
    {
      id: 2,
      title: "Ambarawa",
    },
    {
      id: 3,
      title: "Magelang",
    },
    {
      id: 4,
      title: "Surabaya",
    },
    {
      id: 5,
      title: "Semarang",
    },
  ];

  useEffect(() => {
    const pairedPlaces = [];
    placesRaw.forEach((place, index) => {
      if (index % 2 !== 1) {
        const pairPlaces = [place, placesRaw[index + 1]];
        console.log(pairPlaces);
        pairedPlaces.push(pairPlaces);
      }
    });
    setPlaces(pairedPlaces);
    console.log(pairedPlaces);
  }, []);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#FFF" }}>
      <Header />
      <View style={{ position: "relative" }}>
        <SwiperFlatList
          autoplay
          autoplayDelay={5}
          // autoplayLoop
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
          data={colors}
          renderItem={({ item }) => (
            <View style={[styles.child, { backgroundColor: item }]}>
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
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

function PlacesPairItem({ pairPlace }) {
  return (
    <View style={{ flexDirection: "row", gap: 23, marginBottom: 13 }}>
      <View style={{ flex: 1, gap: 8 }}>
        <View
          style={{
            height: 163,
            backgroundColor: "#D9D9D9",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 10, height: 5 },
            elevation: 6,
          }}
        ></View>
        <CustomText
          style={{ textAlign: "center" }}
          weight={700}
        >
          {pairPlace[0]?.title}
        </CustomText>
      </View>
      {pairPlace[1] !== undefined && (
        <View style={{ flex: 1, gap: 8 }}>
          <View
            style={{
              height: 163,
              backgroundColor: "#D9D9D9",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 10, height: 5 },
              elevation: 6,
            }}
          ></View>
          <CustomText
            style={{ textAlign: "center" }}
            weight={700}
          >
            {pairPlace[1]?.title}
          </CustomText>
        </View>
      )}
      {/* <CustomText>{pairPlace[1]?.title}</CustomText> */}
    </View>
  );
}
