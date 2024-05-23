import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Dimensions, Image, Pressable, ScrollView, View } from "react-native";
import { Utilities } from "@/utilities/Utilities";
import articles from "@/data/articles.json"
import { useRouter } from "expo-router";

export default function Explore() {
  const cafeArticles = articles.cafe;

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{ backgroundColor: "#FFF", paddingTop: 20 }}>
        <View style={{ gap: 18, paddingBottom: 30 }}>
          <ArticleTray
            trayTitle="Tips Travel"
            trayDesc="Beberapa tips dalam travelling"
            articles={cafeArticles}
          />
          <ArticleTray
            trayTitle="Kafe Lokal"
            trayDesc="Beberapa rekomendasi kafe lokal"
            articles={cafeArticles}
          />
          <ArticleTray
            trayTitle="Makanan Lokal & Akomodasi"
            trayDesc="Rekomendasi makanan lokal dan akomodasi perjalanan"
            articles={cafeArticles}
          />
        </View>
      </ScrollView>
    </>
  );
}

export interface ArticleItemProps {
  title: string;
  content: string[];
  links: {};
  image: string;
}

function ArticleItem({
  title = "Lorem, ipsum dolor sit amet consectetur",
  content = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, exercitationem."],
  image
}: ArticleItemProps) {
  const cutTitle = (title: string): string => {
    return title?.length < 35 ? title : title.slice(0, 30) + "...";
  };
  const cutDesc = (desc: string): string => {
    return desc?.length < 80 ? desc : desc.slice(0, 76) + "...";
  };
  const router = useRouter()
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
      onPress={() => router.navigate("/explore/" + title)}
    >
      <View style={{ width: "100%", height: 150, backgroundColor: "#D9D9D9", position:"relative" }}>
        <Image source={{uri: image}} style={{position: "absolute", width: "100%", height: "100%"}} />
      </View>
      <CustomText
        weight={700}
        style={[{ marginTop: 18 }]}
      >
        {cutTitle(title)}
      </CustomText>
      <CustomText
        weight={400}
        style={[{ fontSize: 15, textAlign: "justify" }]}
      >
        {cutDesc(content[0])}
      </CustomText>
    </Pressable>
  );
}

interface ArticleTrayProps {
  trayTitle: string;
  trayDesc: string;
  articles: ArticleItemProps[];
}
function ArticleTray({ trayTitle, trayDesc, articles = [] }: ArticleTrayProps) {
  return (
    <View>
      <CustomText
        weight={700}
        style={[{ fontSize: 16, paddingHorizontal: 18 }]}
      >
        {trayTitle}
      </CustomText>
      <CustomText weight={400} style={[{paddingHorizontal: 18}]}>{trayDesc}</CustomText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 14,
          paddingBottom: 5,
          marginBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 18
        }}
      >
        {articles?.map((article, index) => {
          return (
            <ArticleItem
              key={index}
              title={article?.title}
              content={article.content}
              links={article.links}
              image={article.image}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
