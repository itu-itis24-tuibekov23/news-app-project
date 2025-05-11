import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


export default function StatsScreen() {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('uploadedFiles');
        if (stored) {
            setUploadedFiles(JSON.parse(stored));
        }
    }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Статистика загрузок</Text>
      <Text style={styles.counter}>Всего загружено: {uploadedFiles.length}</Text>

      <FlatList
        data={uploadedFiles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.fileItem}>• {item}</Text>
        )}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  counter: {
    fontSize: 16,
    color: '#444',
  },
  fileItem: {
    fontSize: 14,
    marginBottom: 6,
  },
});
