import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@module/splash/screen/Splash.Screen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="screen">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ title: null, headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
