import type { Route } from "./+types/popular";
import { Article, type ArticleJson } from "~/domain/Article";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(
    `https://qiita.com/api/v2/items?page=1&per_page=20&query=user%3ASicut_study`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_QIITA_API_KEY}`,
      },
    }
  );
  const articlesJson: ArticleJson[] = await res.json();
  const articles = articlesJson.map(
    (articleJson) =>
      new Article(
        articleJson.title,
        articleJson.url,
        articleJson.likes_count,
        articleJson.stocks_count,
        articleJson.created_at
      )
  );

  return { articles };
}

export default function Popular({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;
  return (
    <div className="flex-1 sm:ml-64">
      <h1>人気記事一覧</h1>
      <div className="container mx-auto px-4 py-8">
        {articles.map((article) => (
          <p key={article.url}>{article.title}</p>
        ))}
      </div>
    </div>
  );
}
