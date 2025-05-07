import { useEffect, useState } from "react";
import { getTopHeadlines } from "./api/newsApi";
import { useDebounce } from './hooks/useDebounce';


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
  const [country, setCountry] = useState("us");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

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

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );  

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="us">🇺🇸 США</option>
        <option value="ru">🇷🇺 Россия</option>
        <option value="de">🇩🇪 Германия</option>
        <option value="fr">🇫🇷 Франция</option>
      </select>
  
      <input
        type="text"
        placeholder="Поиск новостей..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "400px",
        }}
      />
  
      <h1>Новости</h1>
  
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {filteredArticles.length === 0 ? (
            <p style={{ color: "gray" }}>Ничего не найдено по запросу.</p>
          ) : (
            filteredArticles.map((article, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "1rem",
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                }}
              >
                <h2>{article.title}</h2>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt="image"
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  />
                )}
                <p>{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "lightblue" }}
                >
                  Читать
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
