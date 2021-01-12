import React from 'react';
import { View, Text, StatusBar, ImageBackground } from 'react-native';
import styles from '@module/splash/assets/styles';

const SplashScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" hidden={false} />
      <ImageBackground style={styles.background} source={require('@assets/images/background.jpg')}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Make mobile app more easier</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default SplashScreen;
