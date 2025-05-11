import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { router } from "expo-router";

export default function WebScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

const handleLogout = () => {
  if (Platform.OS === "web") {
    const confirmed = window.confirm("Вы уверены, что хотите выйти?");
    if (confirmed) {
      router.replace("/login");
    }
  } else {
    Alert.alert("Подтверждение", "Вы уверены, что хотите выйти?", [
      { text: "Отмена", style: "cancel" },
      { text: "Выйти", onPress: () => router.replace("/login") },
    ]);
  }
};


  return (
    <View style={styles.container}>
      {/* Always visible logout button */}
      <Button
        title="Logout"
        color="#ff5c5c"
        onPress={handleLogout}
      />

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
          source={{ uri: "http://localhost:5173" }}
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
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
