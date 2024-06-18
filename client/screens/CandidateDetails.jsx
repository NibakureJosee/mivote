import { View, Text, StyleSheet, Image, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';

const candidate = {
  names: 'John Doe',
  gender: 'MALE',
  profilePicture: require('../assets/img/person1.png'),
  mission: 'Marketing director at MiVote',
  votes: 5,
  nationalId: '234235235345',
};

export default function CandidateDetails({ route, navigation }) {
  const [candidateId, setCandidateId] = useState('');

  const { candidate_id } = route.params;

  useEffect(() => {
    setCandidateId(candidate_id);
  }, [candidate_id]);

  console.log(candidate_id);

  // useEffect(() => {
  //   if (candidateId) {
  //     navigation.navigate('Candidates');
  //   }
  // }, [candidateId]);

  const voteCandidate = () => {
    // if (candidateId) {
    //   ToastAndroid.show('Candidate not found', ToastAndroid.SHORT);
    //   // navigation.navigate('Candidates');
    // } else {
    //   ToastAndroid.show('Voted', ToastAndroid.SHORT);
    //   navigation.navigate({
    //     name: 'Candidates',
    //     params: { poll_id: item._id },
    //   });
    // }
  };

  return (
    <View style={styles.container}>
      <Image source={candidate.profilePicture} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{candidate.names}</Text>
        <Text style={styles.gender}>{candidate.gender}</Text>
        <Text style={styles.description}>{candidate.mission}</Text>
        <Text style={styles.gender}>Number of Votes: {candidate.votes}</Text>
      </View>
      <View>
        <Button title={'Vote Candidate'} onPress={voteCandidate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    paddingVertical: 20,
    fontSize: 20,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 18,
    paddingVertical: 20,
    color: '#827F7F',
    paddingHorizontal: 16,
  },
  gender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B4890',
    paddingHorizontal: 16,
  },
});
