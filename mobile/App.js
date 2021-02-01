import React, { useEffect, useMemo, useReducer } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@components/Context';

import AuthScreen from '@screens/Auth.Screen';
import HomeScreen from '@screens/Home.Screen';
import KunjunganTab from '@navigations/KunjunganTab';
import PickupTab from '@navigations/PickupTab';
import SurveyScreen from '@screens/Survey.Screen';
import RiskTab from '@navigations/RiskTab';
import DetailScreen from '@screens/detail/Detail.Screen';
import ProfileScreen from '@screens/Profile.Screen';

import messaging from '@react-native-firebase/messaging';
import host from "./src/utilities/host";
import axios from "axios";

const Stack = createStackNavigator();
const App = () => {
  // const navigation = useNavigation();

  const onNotificationOpenedApp = () => {
    // If the push notification received when the app is minimize
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.push(
      //   remoteMessage.data.screen,
      //   JSON.parse(remoteMessage.data.payload),
      // );
    });
  };

  const getInitialNotification = () => {
    // If the push notification received when the app is close
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // navigation.push(
          //   remoteMessage.data.screen,
          //   JSON.parse(remoteMessage.data.payload),
          // );
        }
      });
  };

  const saveTokenToDatabase = async (fcmToken) => {
    try {
      let access_token = await AsyncStorage.getItem('userToken');
      const {data} = await axios({
        method: 'POST',
        url: host + '/users/add-firebase-token',
        data: {
          token: fcmToken,
        },
        headers: {
          token: access_token,
        },
      });
      await AsyncStorage.setItem('fcmToken', fcmToken);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDeviceToken = () => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
        return saveTokenToDatabase(token);
      });
    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      console.log(token);
      saveTokenToDatabase(token);
    });
  };

  useEffect(() => {
    // If the push notification received when the app is open
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);


  const checkToken = async () => {
    let getToken = await AsyncStorage.getItem('userToken');
    if (getToken) {
      onNotificationOpenedApp();
      getInitialNotification();
      getDeviceToken();
    }
  };

  const isLogin = AsyncStorage.getItem("userToken")

  useEffect(() => {
    checkToken();
  }, [isLogin]);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userName: null,
    userAvatar: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          userName: action.name,
          userToken: action.token,
          userAvatar: action.avatar,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.name,
          userToken: action.token,
          userAvatar: action.avatar,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          userAvatar: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (userToken, userName, userAvatar) => {
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('userAvatar', userAvatar);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', token: userToken, name: userName, avatar: userAvatar });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userName = await AsyncStorage.getItem('userName');
        userAvatar = await AsyncStorage.getItem('userAvatar');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIVE_TOKEN', token: userToken, name: userName, avatar: userAvatar });
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
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: null, headerShown: false }} />
              <Stack.Screen name="Kunjungan" component={KunjunganTab} options={{ title: null, headerShown: false }} />
              <Stack.Screen name="Pickup" component={PickupTab} options={{ title: null, headerShown: false }} />
              <Stack.Screen name="Survey" component={SurveyScreen} options={{ title: null, headerShown: false }} />
              <Stack.Screen name="Risk" component={RiskTab} options={{ title: null, headerShown: false }} />
              <Stack.Screen name="Detail" component={DetailScreen} options={{ title: null, headerShown: false }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: null, headerShown: false }} />
            </>
          ) : (
            <Stack.Screen name="Auth" component={AuthScreen} options={{ title: null, headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
