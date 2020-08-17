import RNSimpleCrypto from 'react-native-simple-crypto';
import CryptoJS from 'react-native-crypto-js';

const generateCodeVerifier = () => {
  let code_verifier = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  for (let i = 0; i < 128; i++) {
    code_verifier += possible.charAt(
      Math.floor(Math.random() * possible.length),
    );
  }
  return code_verifier;
};

const generateCodeChallenge = (code_verifier) => {
  return base64url(RNSimpleCrypto.SHA.sha256(code_verifier));
};

const base64url = (string) => {
  return string
    .toString(CryptoJS.enc.Base64)
    .replace(/[=]/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

/*const logger = async () => {
  const config = {
    issuer: 'https://accounts.google.com',
    clientId: '',
    redirectUrl: '',
    scopes: [''],
  };

  try {
    let result = await authorize(config);
  } catch (error) {
    console.log(error);
  }
};
*/
const logger = async (userData) => {
  //console.log(JSON.stringify(data));
  try {
    let response = await fetch('http://f723723e7d9b.ngrok.io/AddNewUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export {generateCodeChallenge, generateCodeVerifier};
