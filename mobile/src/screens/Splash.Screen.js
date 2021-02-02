import React from 'react';
import { View, Text, StatusBar, Image, ActivityIndicator, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#84ccf7" />
      <ImageBackground style={styles.background} source={require('@assets/images/background.jpg')}>
        <View style={styles.loginLogo}>
          <Image source={require('@assets/images/trendcom-logo.png')} style={styles.logoSize} />
          <View style={styles.textMargin}>
            <Text style={styles.textTitle}>Field Service Application</Text>
            <Text style={styles.textVersi}>Versi 1.0.0</Text>
          </View>
        </View>
        <View style={styles.contentPosition}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </ImageBackground>
    </>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  loginLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSize: {
    width: 250,
  },
  contentPosition: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  textMargin: {
    alignItems: 'center',
    marginTop: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textVersi: {
    fontSize: 13,
    color: 'red',
  },
});

export default SplashScreen;
