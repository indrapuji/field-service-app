import React, { useState } from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

const DetailScreen = ({ route }) => {
  const { itemData } = route.params;
  const [value, onChangeText] = React.useState('Useless Placeholder');
  console.log(itemData);
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
            <View style={{ flex: 1 }}>
              <Text>{itemData.nama_merchant}</Text>
              <Text>{itemData.alamat_merchant}</Text>
              <Text>{itemData.nama_bank}</Text>
              <Text>{itemData.serial_number}</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DetailScreen;
