import { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Alert,
  ScrollView,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import Input from '../components/Input';
import { Feather } from '@expo/vector-icons';
import Button from '../components/Button';
import { RadioButton } from 'react-native-paper';
import { uploadToCloundinary } from '../services/fileHandling';
import UploadImage from '../components/UploadImage';
import { addCandidate } from '../services/poll';

export default function NewCandidate({ route, navigation }) {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [profilePicture, setProfilePicture] = useState(
    '../assets/img/person1.png'
  );
  const [photo, setPhoto] = useState(null);
  const [gender, setGender] = useState('MALE');
  const [mission, setMission] = useState('');
  const [user, setUser] = useState(null);

  const { poll_id } = route.params;

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((user) => setUser(JSON.parse(user)))
      .catch((err) => console.log(err));
  }, []);

  const submitForm = () => {
    if (
      names == '' ||
      email == '' ||
      nationalId == '' ||
      // profilePicture == '' ||
      gender == '' ||
      mission == ''
    ) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
    } else if (nationalId.length != 16) {
      ToastAndroid.show('Please enter a valid national id', ToastAndroid.SHORT);
    } else {
      addCandidate(user.token, {
        names,
        email,
        nationalId,
        profilePicture,
        photo,
        gender,
        mission,
        poll: poll_id,
      })
        .then((candidate) =>
          navigation.navigate({
            name: 'Candidates',
            params: { poll_id: poll_id },
          })
        )
        .catch((error) => console.log(error.response.data));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.title}>New Candidate</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={names}
            onChangeText={(names) => setNames(names)}
            Icon={<Feather name="user" size={24} color="silver" />}
            placeholder={'Names'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={nationalId}
            onChangeText={(nationalId) => setNationalId(nationalId)}
            Icon={<Feather name="flag" size={24} color="silver" />}
            placeholder={'National Id'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={email}
            onChangeText={(email) => setEmail(email)}
            Icon={<Feather name="mail" size={24} color="silver" />}
            placeholder={'Email'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={mission}
            onChangeText={(mission) => setMission(mission)}
            Icon={<Feather name="box" size={24} color="silver" />}
            placeholder={'Mission Statement'}
          />
        </View>
        <View>
          <Text
            style={{
              color: 'silver',
              paddingHorizontal: 24,
              paddingTop: 8,
            }}
          >
            Gender
          </Text>
          <View style={styles.radioContainer}>
            <View style={styles.radio}>
              <RadioButton
                value="MALE"
                status={gender === 'MALE' ? 'checked' : 'unchecked'}
                onPress={() => setGender('MALE')}
              />
              <Text>Male</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton
                value="FEMALE"
                status={gender === 'FEMALE' ? 'checked' : 'unchecked'}
                onPress={() => setGender('FEMALE')}
              />
              <Text>Female</Text>
            </View>
          </View>
        </View>

        <UploadImage />

        <View style={styles.buttonContainer}>
          <Button title={'Add Candidate'} onPress={submitForm} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginLeft: 8,
    paddingTop: 20,
    padding: 16,
  },
  title: {
    fontSize: 20,
    paddingVertical: 8,
  },
  innerTitle: {
    fontSize: 14,
    color: '#BCBCBC',
  },
  inputContainer: {
    display: 'flex',
    paddingHorizontal: 24,
    paddingTop: 8,
    borderRadius: 8,
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  text: {
    fontSize: 14,
    paddingTop: 8,
    textAlign: 'right',
    color: '#0B4890',
  },
  loginLink: {
    textAlign: 'center',
    color: '#A1A1A1',
    paddingTop: 36,
  },
});
