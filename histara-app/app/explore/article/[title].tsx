import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { gs } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Article, SubArticle } from "@/app/types";
const localCafes = require("@/data/localCafe.json") as Article[];

const articles = [...localCafes];

export default function ArticleScreen() {
  const { title } = useLocalSearchParams();

  const [article, setArticle] = useState<Article>({
    title: "",
    image: "",
    content: [""],
    subarticles: [],
  });

  useEffect(() => {
    const articleToBeDisplayed = articles.filter((article) => {
      return article.title === title;
    })[0];
    // console.log(articleToBeDisplayed);
    setArticle(articleToBeDisplayed);
  }, []);

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{ paddingTop: 18, backgroundColor: "#FFF", minHeight: "90%" }}>
        <CustomText
          weight={700}
          style={[{ fontSize: 20, textAlign: "center", marginBottom: 12, paddingHorizontal: 50 }]}
        >
          {title}
        </CustomText>
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ width: "100%", height: 215, position: "relative" }}>
            {article?.image && article?.image !== "" && (
              <Image
                source={{ uri: article.image }}
                style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 13 }}
              />
            )}
          </View>
        </View>

        <View style={{ marginBottom: 10, paddingHorizontal: 13, paddingBottom: 25 }}>
          {article?.content?.map((paragraph, index) => {
            return (
              <CustomText
                weight={400}
                style={[{ textAlign: "justify", marginTop: 10 }]}
                key={index}
              >
                {paragraph}
              </CustomText>
            );
          })}
        </View>

        <View style={{ paddingHorizontal: 13, gap: 10, paddingBottom: 40 }}>
          {article.subarticles.map((subarticle, index) => {
            return (
              <SubArticleItem
                title={subarticle.title}
                image={subarticle.image}
                key={index}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

function SubArticleItem({ title, image }: { title: string; image: string }) {
  const router = useRouter();
  const [touched, setTouched] = useState(false);
  return (
    <Pressable
      onPress={() => router.navigate("/explore/subarticle/" + title)}
      onPressIn={() => setTouched(true)}
      onPressOut={() => setTouched(false)}
      style={[
        gs.ic,
        gs.flexRow,
        {
          flex: 1,
          backgroundColor: touched ? "#DEDEDE" : "#FFF",
          borderColor: Colors.orange.dark,
          borderWidth: 2,
          borderRadius: 8,
          paddingHorizontal: 11,
          paddingVertical: 7,
          gap: 12,
        },
      ]}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 70, height: 40 }}
      />
      <CustomText
        weight={700}
        style={[{ lineHeight: 1.5 * 16 }]}
      >
        {title}
      </CustomText>
    </Pressable>
  );
}
