import React, { useState, useEffect, useCallback } from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
} from 'react-native';
import CardList from '../../../components/CardList';
import axios from 'axios';
import host from '../../../utilities/host';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ProgressScreen = () => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);
  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getJobOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'get',
        url: `${host}/job-orders/all?status=Progres`,
        headers: { token },
      });
      setList(data.data);
      setFiltered(data.data);
      setPage(data.pages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      console.log(err);
    }
  };

  const getMoreOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'get',
        url: `${host}/job-orders/all?status=Progres&page=${currentPage + 1}`,
        headers: { token },
      });
      setList(list.concat(data.data));
      setFiltered(filtered.concat(data.data));
      setPage(data.pages);
      setCurrentPage(data.currentPage);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getData();
    getJobOrder();
  }, [isFocused, refreshing]);

  const addMore = () => {
    setLoading(true);
    getMoreOrder();
  };

  useEffect(() => {
    if (list !== null && list !== undefined) {
      if (searchQuery !== null) {
        const newList = list.filter(
          (x) => x.nama_merchant.toLowerCase().search(searchQuery) !== -1
        );
        setFiltered(newList);
      } else {
        setFiltered(list);
      }
    }
  }, [searchQuery]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        hidden={false}
        backgroundColor="white"
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
              <View style={{ position: 'relative' }}>
                <TextInput
                  placeholder="Cari Nama Merchants"
                  onChangeText={(query) => setSearchQuery(query)}
                  value={searchQuery}
                  autoCapitalize="none"
                  style={{
                    borderRadius: 10,
                    height: 50,
                    paddingLeft: 50,
                    paddingRight: 100,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#f8f1f1',
                  }}
                />
                <Icon
                  name="search"
                  size={35}
                  color="grey"
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>
                  <CardList list={filtered} source={'progres'} />
                </View>
                {page > currentPage && (
                  <View style={{ alignItems: 'center', marginVertical: 5 }}>
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 40,
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}
                      onPress={() => addMore()}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="black" />
                      ) : (
                        <Text>More</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default ProgressScreen;
