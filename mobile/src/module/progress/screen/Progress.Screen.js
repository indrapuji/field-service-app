import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import CardList from '../../../components/utilities/CardList';
import axios from 'axios';
import host from '../../../utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ProgressScreen = () => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);

  useEffect(() => {
    // getData();
    const getJobOrder = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const { data } = await axios({
          method: 'get',
          url: `${host}/job-orders/all?status=Progres`,
          headers: { token },
        });
        setList(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getJobOrder();
  }, [isFocused]);
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
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flex: 1 }}>
                <CardList list={list} />
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProgressScreen;
