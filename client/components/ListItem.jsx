import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function ListItem({ items, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={
            items.gender == 'MALE'
              ? require('../assets/img/person1.png')
              : require('../assets/img/person2.jpg')
          }
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{items.names}</Text>
          <Text style={styles.gender}>{items.gender}</Text>
          <Text style={styles.description}>{items.mission}</Text>
          <Text style={styles.gender}>Number of Votes: {items.votes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  content: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 14,
    color: '#827F7F',
    paddingHorizontal: 16,
  },
  status: {
    fontSize: 14,
    paddingTop: 8,
    textAlign: 'right',
    color: '#0B4890',
  },
});
