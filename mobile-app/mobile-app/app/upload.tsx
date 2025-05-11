import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadScreen() {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('uploadedFiles');
        if (stored) {
          setUploadedFiles(JSON.parse(stored));
        }
      }, []);
      

    

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
        setFile(result.assets[0]); // save whole file, not just name
      // Здесь можно реализовать отправку файла на сервер
      console.log('Файл выбран:', result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Сначала выберите файл");
      return;
    }
  
    const formData = new FormData();
    const fileBlob = await (await fetch(file.uri)).blob();
    formData.append('file', fileBlob, file.name);
  
    try {
      setLoading(true);
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (response.ok) {
        setUploadedFiles(prev => {
            const updated = [...prev, file.name];
            localStorage.setItem('uploadedFiles', JSON.stringify(updated));
            return updated;
          });
          
      } else {
        alert('Ошибка при загрузке файла');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('Произошла ошибка: ' + error.message);
      } else {
        alert('Произошла ошибка');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Button title="Выбрать файл" onPress={pickDocument} />
  
      {file && (
        <Text style={styles.fileText}>Выбран файл: {file.name}</Text>
      )}
  
      {file && (
        <Button title="Загрузить файл" onPress={handleUpload} />
      )}
  
      {loading && (
        <Text style={styles.fileText}>Загрузка...</Text>
      )}
  
      {uploadedFiles.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Загруженные файлы:</Text>
          {uploadedFiles.map((file, index) => (
            <Text key={index} style={styles.fileItem}>• {file}</Text>
          ))}
        </View>
      )}
    </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileText: {
    marginTop: 20,
    fontSize: 16,
  },
  listContainer: {
    marginTop: 30,
    alignItems: 'flex-start',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fileItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  
});


