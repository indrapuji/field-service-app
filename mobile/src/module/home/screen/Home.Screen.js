import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PreScreen from './Pre.Screen';
import CreScreen from './Cre.Screen';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 20, fontWeight: 'bold' },
        style: { backgroundColor: '#84ccf7' },
      }}
    >
      <Tab.Screen name="PM" component={PreScreen} />
      <Tab.Screen name="CM" component={CreScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
