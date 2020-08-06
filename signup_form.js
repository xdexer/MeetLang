import 'react-native-gesture-handler';
import React from 'react';
import {Alert, Button, SafeAreaView, Text, View, TextInput} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {styles} from './styles';
import {sendData} from './db_connection';

const Separator = () => {
  return <View style={styles.separator} />;
};
const Login = (email, password, date) => {
  Alert.alert(
    'Email : ' + email + ' , Password : ' + password + ' , Date : ' + date,
  );
};
const RegisterForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');

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
        value={password}
        onChangeText={(text) => setPassword(text)}
        defaultValue={password}
      />
      <Separator />
      <DatePicker
        date={dateOfBirth}
        mode="date"
        placeholder="select date of birth"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate="2020-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => setDateOfBirth(date)}
      />
      <Separator />
      <Button title="Register" onPress={() => sendData()} />
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
