import CustomText from "@/components/CustomText";
import Header from "@/components/Header";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import { Utilities } from "@/utilities/Utilities";

export default function Explore() {
  const articles1 = [
    {
      title: "Destinasi Wisata Terbaik di 2024",
      desc: "Temukan tempat-tempat wisata terbaik yang harus Anda kunjungi di tahun 2024",
    },
    {
      title: "Panduan Packing untuk Traveller",
      desc: "Tips dan trik packing untuk perjalanan yang lebih mudah dan terorganisir",
    },
    {
      title: "Cara Menghemat Uang Saat Travelling",
      desc: "Tips praktis untuk menghemat uang tanpa mengurangi keseruan perjalanan Anda",
    },
    {
      title: "Kiat Aman Saat Bepergian",
      desc: "Pelajari cara tetap aman dan nyaman saat melakukan perjalanan",
    },
  ];

  const articles2 = [
    {
      title: "Kafe Kopi Terbaik di Jakarta",
      desc: "Nikmati secangkir kopi di kafe-kafe terbaik di Jakarta yang wajib Anda kunjungi."
    },
    {
      title: "Kafe dengan Pemandangan Indah di Bali",
      desc: "Temukan kafe-kafe dengan pemandangan indah yang bisa Anda nikmati di Bali."
    },
    {
      title: "Kafe Instagrammable di Bandung",
      desc: "Rekomendasi kafe-kafe di Bandung yang sangat cocok untuk berfoto dan bersantai."
    },
    {
      title: "Kafe Unik di Surabaya",
      desc: "Kunjungi kafe-kafe unik di Surabaya yang menawarkan pengalaman berbeda."
    },
    {
      title: "Kafe Rooftop di Yogyakarta",
      desc: "Nikmati suasana malam di kafe rooftop terbaik yang ada di Yogyakarta."
    }
  ];
  
  const articles3 = [
    {
      title: "Kuliner Lokal di Medan",
      desc: "Cicipi kuliner khas Medan yang lezat dan menggugah selera."
    },
    {
      title: "Penginapan Murah di Bali",
      desc: "Temukan penginapan murah namun nyaman untuk liburan Anda di Bali."
    },
    {
      title: "Makanan Khas Makassar",
      desc: "Jangan lewatkan untuk mencoba makanan khas Makassar yang kaya rasa."
    },
    {
      title: "Hotel Terbaik di Bandung",
      desc: "Inilah daftar hotel terbaik di Bandung untuk akomodasi Anda."
    },
    {
      title: "Tempat Makan Enak di Jogja",
      desc: "Rekomendasi tempat makan enak yang wajib Anda coba saat berkunjung ke Jogja."
    }
  ];

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{ backgroundColor: "#FFF", paddingTop: 20 }}>
        <View style={{ gap: 18, paddingBottom: 30 }}>
          <ArticleTray
            trayTitle="Tips Travel"
            trayDesc="Beberapa tips dalam travelling"
            articles={articles1}
          />
          <ArticleTray
            trayTitle="Kafe Lokal"
            trayDesc="Beberapa rekomendasi kafe lokal"
            articles={articles2}
          />
          <ArticleTray
            trayTitle="Makanan Lokal & Akomodasi"
            trayDesc="Rekomendasi makanan lokal dan akomodasi perjalanan"
            articles={articles3}
          />
        </View>
      </ScrollView>
    </>
  );
}

interface ArticleItemProps {
  title: string;
  desc: string;
}

function ArticleItem({
  title = "Lorem, ipsum dolor sit amet consectetur",
  desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, exercitationem.",
}: ArticleItemProps) {
  const cutTitle = (title: string): string => {
    return title?.length < 35 ? title : title.slice(0, 30) + "...";
  };
  const cutDesc = (desc: string): string => {
    return desc?.length < 80 ? desc : desc.slice(0, 76) + "...";
  };
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
      onPress={() => console.log(title)}
    >
      <View style={{ width: "100%", height: 150, backgroundColor: "#D9D9D9" }} />
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
        {cutDesc(desc)}
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
        contentContainerStyle={{
          gap: 14,
          paddingBottom: 5,
          marginBottom: 5,
          paddingTop: 8,
          paddingHorizontal: 18
        }}
      >
        {articles?.map((article, index) => {
          return (
            <ArticleItem
              key={index}
              title={article?.title}
              desc={article?.desc}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
