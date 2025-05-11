import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Input from '@/components/Input'; // компонент Input из папки components
import Card from '@/components/Card';   // компонент Card из папки components

// Локальные данные — список новостей
const articles = [
  {
    id: '1',
    title: 'Новость 1',
    description: 'Описание новости 1',
  },
  {
    id: '2',
    title: 'Новость 2',
    description: 'Описание новости 2',
  },
  {
    id: '3',
    title: 'Новость 3',
    description: 'Описание новости 3',
  },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState(''); // состояние для поиска

  // фильтруем статьи по введённому тексту
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Поле ввода текста для фильтрации */}
      <Input value={searchText} onChangeText={setSearchText} />

      {/* Вывод отфильтрованных карточек */}
      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        {filteredArticles.map(article => (
          <Card
            key={article.id}
            title={article.title}
            description={article.description}
          />
        ))}
      </ScrollView>
    </View>
  );
}

// Стили для контейнера
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});
