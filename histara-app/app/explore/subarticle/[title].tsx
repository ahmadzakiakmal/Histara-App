import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, View } from "react-native";
import { gs } from "@/constants/Styles";
import { SubArticle } from "@/app/types";
const articles = require("@/data/subarticles.json") as SubArticle[];

export default function SubArticleScreen() {
  const { title } = useLocalSearchParams();

  const [article, setArticle] = useState<SubArticle>({
    title: "",
    image: "",
    content: [""],
    links: { instagram: "", gmaps: "" },
  });

  useEffect(() => {
    const articleToBeDisplayed = articles.filter((article) => {
      return article.title === title;
    })[0];
    // console.log(articleToBeDisplayed)
    setArticle(articleToBeDisplayed);
  }, []);

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{ paddingTop: 18, backgroundColor: "#FFF", minHeight: "90%" }}>
        <CustomText
          weight={700}
          style={[{ fontSize: 20, textAlign: "center", marginBottom: 12 }]}
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
          <CustomText
            weight={300}
            italic={true}
            style={[{ color: "#918F8F", marginTop: 12, textAlign: "center", fontSize: 14 }]}
          >
            {(article?.links as any)?.instagram}
          </CustomText>

          <View style={{ marginBottom: 10 }}>
            {article?.content?.map((paragraph, index) => {
              return (
                <CustomText
                  weight={400}
                  style={[{ textAlign: "justify", marginTop: 8 }]}
                  key={index}
                >
                  {paragraph}
                </CustomText>
              );
            })}
          </View>

          <View style={[gs.flexRow, { gap: 12, paddingBottom: 30 }]}>
            <LinkItem
              text="Instagram"
              link={(article.links as any).instagram}
              image={require("@/assets/images/Instagram.png")}
            />
            <LinkItem
              text="Maps"
              link={(article.links as any).gmaps}
              image={require("@/assets/images/Gmaps.png")}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

interface SocialMediaItemProps {
  text: string;
  link: string;
  image: any;
}
function LinkItem({ text, link, image }: SocialMediaItemProps) {
  const [touched, setTouched] = useState(false);
  return (
    <Pressable
      style={[
        gs.flexRow,
        gs.ic,
        {
          backgroundColor: touched ? "#E6E6E6" : "#FFF",
          borderRadius: 6,
          paddingHorizontal: 19,
          paddingVertical: 9,
          gap: 13,
          flex: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.9,
          shadowRadius: 5,
          elevation: 5,
        },
      ]}
      onPress={() => {
        Linking.openURL(link).catch((err) => console.log(err));
      }}
      onPressIn={() => {
        setTouched(true);
      }}
      onPressOut={() => {
        setTouched(false);
      }}
    >
      {image && <Image source={image} />}
      <CustomText weight={400}>{text}</CustomText>
    </Pressable>
  );
}
