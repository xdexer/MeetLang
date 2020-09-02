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
import {ConfigureStackNavigator} from "./Navigators/ConfigureStackNavigator";
import {Separator} from "./Components/Separator";

const Stack = createStackNavigator();

let userData = {
}

const StartScreen = ({ navigation }) => {
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
        <Button title="Sign up" onPress={() => Alert.alert('Sign up pressed')} />
        <Button title='Configure' onPress={() => navigation.navigate("Configure", {screen: "Name", params: {user: userData}})} />
        <Button title='test data flow' onPress={() => console.log(userData)} />
      </View>
    </SafeAreaView>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StartScreen} />
        <Stack.Screen name="Configure" component={ConfigureStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
