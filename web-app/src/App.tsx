// Импорт хуков React и функции API
import { useEffect, useState } from 'react';
import { getTopHeadlines } from './api/newsApi';

// Тип для одной новости
type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

function App() {
  // Состояние для списка новостей
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Асинхронная функция загрузки новостей
    const fetchNews = async () => {
      const news = await getTopHeadlines();
      setArticles(news); // Сохраняем в состояние
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1>Новости</h1>
      {articles.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <img src={article.urlToImage} width="300" />
          <p>{article.description}</p>
          <a href={article.url} target="_blank">Читать</a>
        </div>
      ))}
    </div>
  );
}

export default App;
