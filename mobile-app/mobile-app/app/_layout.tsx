import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen 
        name="upload" 
        options={{ 
            title: 'Upload',
        }} 
       />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Statistics',
        }}
      />
      <Tabs.Screen
        name="web"
        options={{
          title: 'WebView',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
