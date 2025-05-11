// Интерфейс пропсов компонента Card
// Отображаем заголовок, тело и описание (если оно передано)



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface CardProps {
  title: string;
  body?: string;
}

const Card: React.FC<CardProps> = ({ title, body }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {body && <Text style={styles.body}>{body}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
    description: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  body: {
    fontSize: 14,
    color: '#444',
  },
});

export default Card;
