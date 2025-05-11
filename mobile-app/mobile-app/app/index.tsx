import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import Input from '@/components/Input';
import Card from '@/components/Card';

interface Article {
    id: string;
    title: string;
    body?: string;
  }

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true); // состояние загрузки

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Input value={searchText} onChangeText={setSearchText} />

      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
          {filteredArticles.map(article => (
            <Card
              key={article.id}
              title={article.title}
              body={article.body}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});
