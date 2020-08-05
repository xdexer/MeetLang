import 'react-native-gesture-handler';
import React from 'react';
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
import {styles} from './styles';

const Separator = () => {
  return <View style={styles.separator} />;
};

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
      </View>
    </SafeAreaView>
  );
};

export {StartScreen};
