import 'react-native-gesture-handler';
import React from 'react';
import {Alert, Button, SafeAreaView, Text, View, TextInput} from 'react-native';
import {styles} from './styles';
import {addNewUser} from './db_connection';

const Separator = () => {
  return <View style={styles.separator} />;
};
const Login = (email, password, date) => {
  Alert.alert(
    'Email : ' + email + ' , Password : ' + password + ' , Date : ' + date,
  );
  let userData = {email: email, password: password};
  addNewUser(userData).then((r) =>
    console.log('Sign-up successful ' + r['Interaction status']),
  );
};
const RegisterForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <TextInput
        label="Email"
        placeholder="Please Select Your E-mail Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        defaultValue={email}
      />
      <Separator />
      <TextInput
        label="Password"
        placeholder="Please Enter Your Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        defaultValue={password}
      />
      <Separator />
      <Button title="Register" onPress={() => Login(email, password)} />
    </View>
  );
};

const SignupForm = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.footer}>Sign Up !</Text>
      </View>
      <Separator />
      <RegisterForm />
    </SafeAreaView>
  );
};

export {SignupForm};
