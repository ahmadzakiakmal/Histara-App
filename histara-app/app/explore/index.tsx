import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Utilities } from "@/utilities/Utilities";
import { useRouter } from "expo-router";
import { gs } from "@/constants/Styles";
import { Article } from "../types";

export default function Explore() {
  const localCafes = require("@/data/localCafe.json") as Article[]
  const accomodation = require("@/data/accomodation.json") as Article[]

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{ backgroundColor: "#FFF", paddingTop: 20, minHeight: "90%" }}>
        <View style={{ gap: 18, paddingBottom: 30 }}>
          <ArticleTray
            trayTitle="Tips Travel"
            trayDesc="Beberapa tips dalam travelling"
            articles={accomodation}
          />
          <ArticleTray
            trayTitle="Kafe Lokal"
            trayDesc="Beberapa rekomendasi kafe lokal"
            articles={localCafes}
          />
          <ArticleTray
            trayTitle="Makanan Lokal & Akomodasi"
            trayDesc="Rekomendasi makanan lokal dan akomodasi "
            articles={[]}
          />
        </View>
      </ScrollView>
    </>
  );
}

function ArticleItem({
  title = "Lorem, ipsum dolor sit amet consectetur",
  image,
}: Article) {
  const router = useRouter();
  return (
    <Pressable
      style={{
        paddingHorizontal: 8,
        paddingVertical: 14,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        elevation: 5,
        shadowOffset: { width: 0, height: 10 },
        width: 225,
        borderRadius: 10,
      }}
      onPress={() => router.navigate("/explore/article/" + title)}
    >
      <View style={{ width: "100%", height: 150, backgroundColor: "#D9D9D9", position: "relative" }}>
        <Image
          source={{ uri: image }}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </View>
      <CustomText
        weight={700}
        style={[{ marginTop: 18, textAlign: "center" }]}
      >
        {title}
      </CustomText>
    </Pressable>
  );
}

interface ArticleTrayProps {
  trayTitle: string;
  trayDesc: string;
  articles: Article[];
}
function ArticleTray({ trayTitle, trayDesc, articles = [] }: ArticleTrayProps) {
  return (
    <View>
      <View style={[gs.flexRow, gs.ic, { flexShrink: 0}]}>
        <View style={{maxWidth: Utilities.getScreenWidth() - 50}}>
          <CustomText
            weight={700}
            style={[{ fontSize: 16, paddingHorizontal: 18 }]}
          >
            {trayTitle}
          </CustomText>
          <CustomText
            weight={400}
            style={[{ paddingHorizontal: 18 }]}
          >
            {trayDesc}
          </CustomText>
        </View>
        {/* <Pressable
          style={[
            gs.ic,
            gs.jc,
            {
              width: 34,
              height: 34,
              backgroundColor: "#FFF",
              borderRadius: 999,
              position: "relative",
              shadowColor: "#000",
              elevation: 5,
            },
          ]}
          onPress={() => {
            router.navigate("/explore/articleHeader")
          }}
        >
          <Image
            source={require("@/assets/images/CeretDown.png")}
            style={{ transform: [{ rotate: "-90deg" }, { translateY: 1 }], position: "absolute" }}
          />
        </Pressable> */}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 14,
          paddingBottom: 5,
          marginBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 18,
        }}
      >
        {articles?.map((article, index) => {
          return (
            <ArticleItem
              key={index}
              title={article?.title}
              content={article.content}
              image={article.image}
              subarticles={article.subarticles}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
