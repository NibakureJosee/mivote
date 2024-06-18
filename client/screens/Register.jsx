import { useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Input from '../components/Input';
import { Feather } from '@expo/vector-icons';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { signup } from '../services/auth';

export default function Register() {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const { navigate } = useNavigation();

  const submitForm = () => {
    if (
      names == '' ||
      email == '' ||
      nationalId == '' ||
      phone == '' ||
      password == ''
    ) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    } else if (phone.length != 10) {
      ToastAndroid.show('Phone number must be 10 digits', ToastAndroid.SHORT);
    } else if (nationalId.length != 16) {
      ToastAndroid.show('Please enter a valid national id', ToastAndroid.SHORT);
    } else {
      signup({
        names,
        email,
        nationalId,
        address,
        phone,
        password,
      })
        .then(async (res) => {
          try {
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            setNames('');
            setEmail('');
            setNationalId('');
            setPhone('');
            setPassword('');
            navigate('Login');
          } catch (error) {}
        })
        .catch((error) => {
          ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/img/logo.png')}
              style={styles.image}
            />
            <Text style={styles.logoText}>MiVote</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Create an account</Text>
            <Text style={styles.innerTitle}>Make your vote matter today.</Text>
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
              value={address}
              onChangeText={(address) => setAddress(address)}
              Icon={<Feather name="home" size={24} color="silver" />}
              placeholder={'Address'}
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
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
              Icon={<Feather name="user" size={24} color="silver" />}
              placeholder={'Phone number'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              value={password}
              onChangeText={(password) => setPassword(password)}
              Icon={<Feather name="lock" size={24} color="silver" />}
              placeholder={'Password'}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title={'Sign up'} onPress={submitForm} />
          </View>
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={styles.loginLink}>
              Already have an account?{' '}
              <Text onPress={() => navigate('Login')} style={styles.text}>
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 50,
  },
  header: {
    marginLeft: 8,
    paddingTop: 20,
    padding: 16,
  },
  title: {
    fontSize: 18,
    paddingVertical: 8,
  },
  innerTitle: {
    fontSize: 14,
    color: '#BCBCBC',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
  },
  logoText: {
    fontSize: 32,
    paddingLeft: 12,
    color: '#0B4890',
  },
  inputContainer: {
    display: 'flex',
    paddingHorizontal: 24,
    paddingTop: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
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
