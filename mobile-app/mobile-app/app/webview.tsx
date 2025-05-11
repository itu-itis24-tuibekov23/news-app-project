import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      {loading && !error && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}>Загрузка...</Text>
        </View>
      )}

      {error ? (
        <View style={styles.overlay}>
          <Text style={styles.errorText}>Не удалось загрузить страницу</Text>
        </View>
      ) : (
        <WebView
          source={{ uri: 'http://localhost:5173' }} // или замените на свой внешний адрес
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          javaScriptEnabled
          domStorageEnabled
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
