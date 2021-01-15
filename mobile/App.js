import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '@module/auth/screen/Auth.Screen';
import MainScreen from './src/navigations/BottomTab';

import { AuthContext } from './src/components/utilities/Context';

const Stack = createStackNavigator();
const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: (userName, password) => {
        let userToken;
        userToken = null;
        if (userName === 'indra' && password === 'indra') {
          userToken = 'token';
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: () => {
        dispatch({ type: 'LOGOUT' });
      },
    }),
    []
  );

  useState(() => {
    setTimeout(() => {
      dispatch({ type: 'RETRIVE_TOKEN', token: 'token' });
    }, 1000);
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth" headerMode="screen">
          {loginState.userToken !== null ? (
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ title: null, headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ title: null, headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
