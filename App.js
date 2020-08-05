import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StartScreen} from './start';
import {SignupForm} from './signup_form';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StartScreen} />
        <Stack.Screen name="Sign Up" component={SignupForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
