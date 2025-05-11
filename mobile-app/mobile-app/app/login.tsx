import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';

export default function LoginScreen() {
  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Ошибка', 'Биометрия не поддерживается на этом устройстве');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Вход с помощью Face ID / Touch ID',
    });

    if (result.success) {
      router.replace('/webview'); // перенаправляем после успешного входа
    } else {
      Alert.alert('Ошибка', 'Аутентификация не пройдена');
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Аутентификация...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
