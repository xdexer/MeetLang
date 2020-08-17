import 'react-native-gesture-handler';
import React from 'react';
import {Alert, Button, SafeAreaView, Text, View, TextInput} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin/index';
import {styles} from './styles';
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from './IDProvider_connection';
import {loginUser} from './db_connection';

const Separator = () => {
  return <View style={styles.separator} />;
};

const Login = (email, password) => {
  let userCode = generateCodeVerifier();
  console.log(userCode);
  let userChallenge = generateCodeChallenge(userCode);
  console.log(userChallenge);
  let userData = {code_verifier: userCode, code_challenge: userChallenge};
  loginUser(userData).then((r) => Alert.alert(r));
};

const RegisterForm = () => {
  const [email, checkEmail] = React.useState('');
  const [password, checkPassword] = React.useState('');

  return (
    <View>
      <TextInput
        label="Email"
        placeholder="Please Enter Your E-mail Address"
        value={email}
        onChangeText={(text) => checkEmail(text)}
        defaultValue={email}
      />
      <Separator />
      <TextInput
        label="Password"
        placeholder="Please Enter Your Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => checkPassword(text)}
        defaultValue={password}
      />
      <Separator />
      <Button title="Log In" onPress={() => Login(email, password)} />
      <Separator />
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => Login(email, password)}
      />
    </View>
  );
};

const LoginForm = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.footer}>Log In !</Text>
      </View>
      <Separator />
      <RegisterForm />
    </SafeAreaView>
  );
};

export {LoginForm};
