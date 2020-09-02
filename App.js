import 'react-native-gesture-handler';
import React from 'react';
import {Alert, Button, SafeAreaView, Text, View, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StartScreen} from './start';
import {SignupForm} from './signup_form';
import {LoginForm} from './login_form';
import {
  checkIfFirstLaunch,
  setInitialLocalData,
  checkAsyncStorage,
} from './init_config';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  React.useEffect(() => {
    checkIfFirstLaunch().then((isFirstLaunch) => {
      setIsFirstLaunch(isFirstLaunch);
    });
  }, []);
  if (isFirstLaunch) {
    setInitialLocalData().then(async (r) => {
      let state = await AsyncStorage.getItem('state');
      console.log('set : ' + state);
    });
  }
  if (!isFirstLaunch) {
    checkAsyncStorage().then((r) => console.log(r));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StartScreen} />
        <Stack.Screen name="Sign Up" component={SignupForm} />
        <Stack.Screen name="Log In" component={LoginForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
