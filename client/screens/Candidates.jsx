import React, { useEffect, useState } from 'react';
import {
  AsyncStorage,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Button from '../components/Button';
import ListItem from '../components/ListItem';
import { getCandidatesByPoll } from '../services/poll';

export default function Candidates({ route, navigation }) {
  const [user, setUser] = useState(null);
  // const candidates = [
  //   {
  //     names: 'John Doe',
  //     gender: 'MALE',
  //     profilePicture: require('../assets/img/person1.png'),
  //     mission: 'Marketing director at MiVote',
  //   },
  //   {
  //     names: 'Jane Doe',
  //     gender: 'FEMALE',
  //     profilePicture: require('../assets/img/person2.jpg'),
  //     mission: 'Vice-Chief of Finance Department',
  //   },
  //   {
  //     names: 'John Doe',
  //     gender: 'MALE',
  //     profilePicture: require('../assets/img/person1.png'),
  //     mission: 'Marketing director at MiVote',
  //   },
  //   {
  //     names: 'Jane Doe',
  //     gender: 'MALE',
  //     profilePicture: require('../assets/img/person2.jpg'),
  //     mission: 'Vice-Chief of Finance Department',
  //   },
  //   {
  //     names: 'John Doe',
  //     gender: 'MALE',
  //     profilePicture: require('../assets/img/person1.png'),
  //     mission: 'Marketing director at MiVote',
  //   },
  //   {
  //     names: 'Jane Doe',
  //     gender: 'MALE',
  //     profilePicture: require('../assets/img/person2.jpg'),
  //     mission: 'Vice-Chief of Finance Department',
  //   },
  // ];

  const { poll_id } = route.params;
  const [candidates, setCandidates] = useState();
  const [poll, setPoll] = useState(poll_id);

  useEffect(() => {
    setPoll(poll_id);
  }, [poll_id]);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((user) => setUser(JSON.parse(user)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) {
      getCandidatesByPoll(poll_id, user.token)
        .then((res) => {
          setCandidates(res.data.data);
        })
        .catch((err) => console.log(err.response));
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <ListItem
      key={item._id}
      items={item}
      onPress={() =>
        navigation.navigate({
          name: 'CandidateDetails',
          params: { candidate_id: item._id },
        })
      }
    />
  );

  return (
    <SafeAreaView>
      {user?.isAdmin && (
        <View style={styles.buttonContainer}>
          <Button
            title={'+ Add Candidates'}
            onPress={() =>
              navigation.navigate({
                name: 'AddCandidate',
                params: { poll_id: poll },
              })
            }
          />
        </View>
      )}
      <FlatList data={candidates} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
});
