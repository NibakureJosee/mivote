import React, { useEffect, useState } from 'react';
import {
  AsyncStorage,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getPolls } from '../services/poll';

export default function Polls({ navigation }) {
  const [polls, setPolls] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((user) => setUser(JSON.parse(user)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) {
      getPolls(user.token)
        .then((res) => {
          setPolls(res.data.data);
        })
        .catch((err) => console.log(err.response));
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate({
          name: 'Candidates',
          params: { poll_id: item._id },
        })
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList data={polls} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    shadowColor: '#000',

    backgroundColor: '#8497ad',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 14,
    paddingVertical: 20,
    color: '#FFFFFF',
    paddingHorizontal: 16,
  },
  status: {
    fontSize: 14,
    padding: 8,
    borderRadius: 10,
    textAlign: 'right',
    backgroundColor: '#0B4890',
    color: '#FFFFFF',
  },
});
