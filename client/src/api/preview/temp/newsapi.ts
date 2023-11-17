import axios, { AxiosResponse } from "axios";

const apiKey = "639a88faf8db4392b87acf5658cc02d9";
const baseUrl = "https://newsapi.org/v2/top-headlines";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

export const getNews = async (): Promise<
  AxiosResponse<{ articles: NewsArticle[] }>
> => {
  const response = await axios.get(`${baseUrl}?country=ua&apiKey=${apiKey}`);
  return response.data;
};

export const getNewsByCategory = async (
  category: string,
): Promise<AxiosResponse<{ articles: NewsArticle[] }>> => {
  const response = await axios.get(
    `${baseUrl}?country=ua&category=${category}&apiKey=${apiKey}`,
  );
  return response.data;
};

export const getNewsByKeywords = async (
  keywords: string,
): Promise<AxiosResponse<{ articles: NewsArticle[] }>> => {
  const response = await axios.get(
    `${baseUrl}?country=ua&q=${keywords}&apiKey=${apiKey}`,
  );
  return response.data;
};
