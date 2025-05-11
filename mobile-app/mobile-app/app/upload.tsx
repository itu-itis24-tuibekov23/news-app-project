import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadScreen() {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setFileName(result.assets[0].name);
      // Здесь можно реализовать отправку файла на сервер
      console.log('Файл выбран:', result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Выбрать файл" onPress={pickDocument} />
      {fileName && <Text style={styles.fileText}>Выбран файл: {fileName}</Text>}
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
});
