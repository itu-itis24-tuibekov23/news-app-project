import { WebView } from 'react-native-webview';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function WebAppScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'http://localhost:5173' }} // your local web-app dev server
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
