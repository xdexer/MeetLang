import React from 'react';
import {generateCodeChallenge, generateRandomString} from './init_config';
import AsyncStorage from '@react-native-community/async-storage';

const authorize = async (data) => {
  let url =
    'https://meet-lang.herokuapp.com/Authorize?client_id=' +
    data.client_id +
    '&state=' +
    data.state +
    '&code_challenge=' +
    data.code_challenge +
    '&scope=' +
    data.scope;

  try {
    let response = await fetch(url, {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const login = async (email, password) => {
  let userCode = generateRandomString();
  console.log(userCode);

  let userChallenge = generateCodeChallenge(userCode);
  console.log(userChallenge);

  let client_id = await AsyncStorage.getItem('client_id');
  let state = await AsyncStorage.getItem('state');
  await AsyncStorage.setItem('code_verifier', userCode);
  await AsyncStorage.setItem('scope', email);
  let userData = {
    client_id: client_id,
    state: state,
    code_challenge: userChallenge,
    scope: email,
  };
  authorize(userData).then((r) => {
    console.log(r);
    AsyncStorage.setItem('code', r.code);
    let token_body = {
      header: {
        client_id: client_id,
        state: state,
        scope: email,
        code_verifier: userCode,
        code: r.code,
      },
      request: {
        type: 'login',
        password: password,
      },
    };
    console.log(token_body);
    token(token_body).then((res) => {
      console.log(res)
    });
  });
};

const token = async (data) => {
  try {
    let response = await fetch('https://meet-lang.herokuapp.com/Token', {
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

export {authorize, token, login};
