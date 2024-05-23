export type Article = {
  title: string;
  content: string[];
  image: string;
  subarticles: SubArticle[]
}

export type SubArticle = {
  title: string;
  content: string[];
  links: {
    instagram: string;
    gmaps: string;
  };
  image: string;
}