import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '@module/home/screen/Home.Screen';
import ProgressScreen from '@module/progress/screen/Progress.Screen';
import DoneScreen from '@module/done/screen/Done.Screen';
import ProfileScreen from '@module/profile/screen/Profile.Screen';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#84ccf7',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" color={focused ? 'black' : 'white'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="refresh" color={focused ? 'black' : 'white'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Done"
        component={DoneScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="check" color={focused ? 'black' : 'white'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="user-o" color={focused ? 'black' : 'white'} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
