import 'react-native-gesture-handler';
import React from 'react';
import {Alert, Button, SafeAreaView, Text, View, TextInput} from 'react-native';
import {styles} from './styles';

const Separator = () => {
  return <View style={styles.separator} />;
};

const EmailInput = () => {
  const [value, setText] = React.useState('');
  return (
    <TextInput
      label="Email"
      placeholder="Please Select Your E-mail Address"
      value={value}
      onChangeText={(text) => setText(text)}
      defaultValue={value}
    />
  );
};

const PasswordInput = () => {
  const [value, setText] = React.useState('');
  return (
    <TextInput
      label="Password"
      placeholder="Please Enter Your Password"
      value={value}
      onChangeText={(text) => setText(text)}
      defaultValue={value}
    />
  );
};

const SignupForm = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.footer}>Sign Up !</Text>
      </View>
      <Separator />
      <View>
        <Text>E-mail : </Text>
        <EmailInput />
        <Text>Password : </Text>
        <PasswordInput />
        <Text>Age : </Text>
      </View>
      <Separator />
      <View>
        <Button
          title="Register"
          onPress={() => Alert.alert('Register pressed')}
        />
      </View>
    </SafeAreaView>
  );
};

export {SignupForm};
