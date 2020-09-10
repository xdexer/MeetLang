import 'react-native-gesture-handler';
import React from 'react';
import {Alert, Button, SafeAreaView, Text, View, TextInput} from 'react-native';
import {styles} from './styles';
import {GoogleComponent} from './google_signin';
import {login} from './utils/server_connection';

const Separator = () => {
  return <View style={styles.separator} />;
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
      <Button title="Log In" onPress={() => login(email, password)} />
      <Separator />
      <GoogleComponent />
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
