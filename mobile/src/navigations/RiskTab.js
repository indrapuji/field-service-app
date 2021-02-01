import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '@screens/risk/Home.Screen';
import ProgressScreen from '@screens/risk/Progress.Screen';
import DoneScreen from '@screens/risk/Done.Screen';

const Tab = createBottomTabNavigator();

const KunjunganTab = () => {
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
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" color={focused ? 'black' : 'white'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Progres"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="refresh" color={focused ? 'black' : 'white'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Done"
        component={DoneScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="check" color={focused ? 'black' : 'white'} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default KunjunganTab;
