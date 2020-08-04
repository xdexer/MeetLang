/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from './styles';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

const Stack = createStackNavigator();

const Separator = () => {
  return <View style={styles.separator} />;
};

const StartScreen = () => {
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
        <Button title="Log in" onPress={() => Alert.alert('Log in pressed')} />
        <Button
          title="Sign up"
          onPress={() => Alert.alert('Sign up pressed')}
        />
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
