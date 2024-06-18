import axios from 'axios';

const url = 'http://192.168.43.113:4500/api/v1';

export async function signup(signUpInfo) {
  return await axios.post(`${url}/auth/register`, signUpInfo);
}

export async function signin(signInInfo) {
  return await axios.post(`${url}/auth/login`, signInInfo);
}
