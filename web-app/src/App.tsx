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
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    // Асинхронная функция загрузки новостей
    const fetchNews = async () => {
      setIsLoading(true); // 🔄 Показываем спиннер
      const data = await getTopHeadlines();
      setArticles(data); // Сохраняем в состояние
      setIsLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1>Новости</h1>
      {isLoading ? (
        <p>Загрузка...</p> // ⏳ пока данные не пришли
      ) : (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank">{article.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
