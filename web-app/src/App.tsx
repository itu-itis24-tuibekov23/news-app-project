import { useEffect, useState } from 'react';
import { getTopHeadlines } from './api/newsApi';

// Тип статьи — чтобы удобно работать с объектами новостей
type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

function App() {
  // Состояние для списка новостей
  const [articles, setArticles] = useState<Article[]>([]);
  // Состояние для отображения "Загрузка..."
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [country, setCountry] = useState('us');

  useEffect(() => {
    // Функция для получения новостей
    const fetchNews = async () => {
      setIsLoading(true); // спиннер
      const data = await getTopHeadlines(country); // новости через API
      setArticles(data); // сохранить в состояние
      setIsLoading(false); // снимать "загрузка"
    };

    fetchNews(); 
  }, [country]); // при изменении страны
  // useEffect с пустым массивом зависимостей [] — вызовется только один раз при загрузке страницы
  // useEffect с массивом зависимостей [country] — вызовется при загрузке страницы и при изменении country

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
      <option value="us">🇺🇸 США</option>
      <option value="ru">🇷🇺 Россия</option>
      <option value="de">🇩🇪 Германия</option>
      <option value="fr">🇫🇷 Франция</option>
    </select>

      <h1>Новости</h1>

      {/* Если идёт загрузка — показать текст */}
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        // Если загрузка закончилась — показать список карточек
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {articles.map((article, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '1rem',
                backgroundColor: '#1e1e1e',
                color: '#fff',
              }}
            >
              <h2>{article.title}</h2>

              {/* Если есть картинка — показать ее */}
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="image"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              )}

              <p>{article.description}</p>

              {/* Кнопка "Читать" со ссылкой */}
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue' }}>
                Читать
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
