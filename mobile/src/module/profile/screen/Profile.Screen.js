import React from 'react';
import { StatusBar, View, Text, SafeAreaView } from 'react-native';
import BottomTab from '../../../components/utilities/BottomTab';

const ProfileScreen = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        hidden={false}
        backgroundColor="white"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#84ccf7' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Profile</Text>
            </View>
          </View>
          <BottomTab item={'profile'} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;
