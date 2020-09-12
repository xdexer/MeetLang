import CryptoJS from 'react-native-crypto-js';
import sha256 from 'crypto-js/sha256';
import AsyncStorage from '@react-native-community/async-storage';

const HAS_LAUNCHED = 'hasLaunched';
const STATE = 'state';
const CLIENT_ID = 'client_id';

function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

const checkAsyncStorage = async () => {
  let state = await AsyncStorage.getItem(STATE);
  let client_id = await AsyncStorage.getItem(CLIENT_ID);
  return 'check : ' + state + '   ' + client_id;
};

const generateRandomString = () => {
  let rands = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  for (let i = 0; i < 128; i++) {
    rands += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return rands;
};

const setInitialLocalData = async () => {
  let state = generateRandomString();
  //let client_id = '';
  try {
    await AsyncStorage.setItem(STATE, state);
    //await AsyncStorage.setItem(CLIENT_ID, client_id);

    let data = {state: state};
    register(data).then((r) => {
      console.log(r);
      AsyncStorage.setItem(CLIENT_ID, r.client_id);
    });
  } catch (e) {
    console.log(e);
  }
  return 'Data added ';
};

const generateCodeChallenge = (code_verifier) => {
  return sha256(code_verifier).toString();
};

const register = async (data) => {
  try {
    let response = await fetch('https://meet-lang.herokuapp.com/Register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const testt = async () => {
  let data = {
    token: await AsyncStorage.getItem('google_token'),
  };
  try {
    let response = await fetch('http://9d19c70af9c5.ngrok.io/test', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export {
  generateCodeChallenge,
  generateRandomString,
  checkIfFirstLaunch,
  setInitialLocalData,
  checkAsyncStorage,
  testt,
};
