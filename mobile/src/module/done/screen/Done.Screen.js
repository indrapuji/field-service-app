import React from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const DoneScreen = () => {
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
              <Text>Done</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DoneScreen;
