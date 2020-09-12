/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Alert, Button, SafeAreaView, Text, View, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from './styles';
import {SignupForm} from './Screens/SignUpFormScreen';
import {LoginForm} from './Screens/LoginFormScreen';
import {
  checkIfFirstLaunch,
  setInitialLocalData,
} from './utils/init_config';
import AsyncStorage from '@react-native-community/async-storage';
import {ConfigureStackNavigator} from './Navigators/ConfigureStackNavigator';
import {Separator} from './Components/Separator';

const Stack = createStackNavigator();

let userData = {};

const StartScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.footer}>MeetLang</Text>
      </View>
      <Separator />
      <View>
        <Text style={styles.main_description}>
          Welcome to language learning meeting app !
        </Text>
      </View>
      <Separator />
      <View style={styles.fixToText}>
        <Button title="Log in" onPress={() => navigation.navigate('Log In')} />
        <Button
          title="Sign up"
          onPress={() => navigation.navigate('Sign Up')}
        />
        <Button
          title="Configure"
          onPress={() =>
            navigation.navigate('Configure', {
              screen: 'Name',
              params: {user: userData},
            })
          }
        />
        <Button title="test data flow" onPress={() => console.log(userData)} />
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  //nie działa if statement, zawsze prawdziwy przy uruchomieniu
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(true);
  React.useEffect(() => {
    checkIfFirstLaunch().then(() => {
      setIsFirstLaunch(false);
    });
  }, []);
  if (isFirstLaunch) {
    setInitialLocalData().then(async (r) => {
      let state = await AsyncStorage.getItem('state');
      let client_id = await AsyncStorage.getItem('client_id');
      console.log('set : ' + state + '   ' + client_id);
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StartScreen} />
        <Stack.Screen name="Sign Up" component={SignupForm} />
        <Stack.Screen name="Log In" component={LoginForm} />
        <Stack.Screen name="Configure" component={ConfigureStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
