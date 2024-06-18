import axios from 'axios';

const url = 'http://192.168.43.113:4500/api/v1';

export async function getPolls(token) {
  return await axios.get(`${url}/polls`, {
    headers: { 'x-access-token': `Bearer ${token}` },
  });
}

export async function getCandidatesByPoll(poll_id, token) {
  return await axios.get(`${url}/candidates/${poll_id}`, {
    headers: { 'x-access-token': `Bearer ${token}` },
  });
}

export async function addCandidate(token, candidateInfo) {
  return await axios.post(`${url}/candidates`, candidateInfo, {
    headers: { 'x-access-token': `Bearer ${token}` },
  });
}
