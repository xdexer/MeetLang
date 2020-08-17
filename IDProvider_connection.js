import CryptoJS from 'react-native-crypto-js';
import sha256 from 'crypto-js/sha256';

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
  return sha256(code_verifier).toString();
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
