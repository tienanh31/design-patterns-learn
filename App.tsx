import React from 'react';
import { StyleSheet, Text, View, Image,ImageBackground, TouchableOpacity, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Screen/HomeScreen';
import StartScreen from './Screen/StartScreen';
import DetailPatternCategory from './Screen/DetailPatternCategory';
import QuizzScreen from './Screen/QuizzScreen';
import QuestionScreen from './Screen/QuestionScreen';
import MatchQuizzScreen from './Screen/MatchQuizzScreen';
import GeminiChat from './Screen/GeminiChat';
import TestingScreen from './Screen/TestingScreen';
const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Testing" component={TestingScreen} />
      <Tab.Screen name="Gemini AI" component={GeminiChat} />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}

    </Tab.Navigator>
  );
};
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Start" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Detail" component={DetailPatternCategory} />
      <Stack.Screen name="Quizz" component={QuizzScreen} />
      <Stack.Screen name="Testing" component={TestingScreen} />
      <Stack.Screen name="Question" component={QuestionScreen} />
      <Stack.Screen name="MatchQuestion" component={MatchQuizzScreen} />

    </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional, for a darker overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    marginLeft: 120,

  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
