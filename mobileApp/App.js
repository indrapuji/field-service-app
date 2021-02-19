import React from 'react';
import { View, Text, StatusBar, Image, ActivityIndicator, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import SplashScreen from './src/screens/Splash.Screen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#84ccf7" />
      <SplashScreen />
    </>
  );
};

export default App;
