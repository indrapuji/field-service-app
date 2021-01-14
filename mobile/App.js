import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '@module/auth/screen/Auth.Screen';
import HomeScreen from '@module/home/screen/Home.Screen';
import ProgressScreen from '@module/progress/screen/Progress.Screen';
import DoneScreen from '@module/done/screen/Done.Screen';
import ProfileScreen from '@module/profile/screen/Profile.Screen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" headerMode="screen">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: null, headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: null, headerShown: false }}
        />
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ title: null, headerShown: false }}
        />
        <Stack.Screen
          name="Done"
          component={DoneScreen}
          options={{ title: null, headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: null, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
