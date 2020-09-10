import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin/index';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {testt} from './utils/init_config';

const googleWebClientID =
  '189056742803-rd8fvdfo2h4t543erqctafpbv4emeta6.apps.googleusercontent.com';

const GoogleComponent = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState([]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);

      setUserInfo(userInfo);
      setLoggedIn(true);

      await AsyncStorage.setItem('google_token', userInfo.idToken);
      testt().then((r) => console.log(r));
      console.log('Logged in');
    } catch (e) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (e.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        alert('other error' + e);
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false);
      setUserInfo([]);
      console.log('Logged out');
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: googleWebClientID,
      offlineAccess: true,
    });
  }, []);
  return (
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={() => signIn()}
    />
  );
};

export {GoogleComponent};
