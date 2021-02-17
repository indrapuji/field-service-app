import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, View, Text, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import CardList from '@components/CardList';
import axios from 'axios';
import host from '@utilities/host';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import GetLocation from 'react-native-get-location';

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
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setLocation({ ...location, latitude: location.latitude, longitude: location.longitude });
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code, message);
      });
  }, []);

  const getJobOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'get',
        url: `${host}/job-orders/all?status=Progres&tipe=Survey`,
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
        url: `${host}/job-orders/all?tipe=Survey&status=Progres&page=${currentPage + 1}`,
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
        const newList = list.filter((x) => x.merchant.toLowerCase().search(searchQuery) !== -1);
        setFiltered(newList);
      } else {
        setFiltered(list);
      }
    }
  }, [searchQuery]);

  const update = (id) => {
    const newFilter = filtered.filter((x) => x.id !== id);
    setFiltered(newFilter);
    setList(newFilter);
  };

  const renderFooter = () => {
    return (
      <>
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
              {loading ? <ActivityIndicator size="small" color="black" /> : <Text>More</Text>}
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#e3fdfd" />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#e3fdfd' }}>
        <View style={{ flex: 1 }}>
          <View style={{ paddingVertical: 10, marginLeft: 10, marginRight: 15 }}>
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
                  borderColor: '#e3fdfd',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
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
            <FlatList
              data={filtered}
              renderItem={({ item, index }) => <CardList source={'progres'} update={update} item={item} location={location} />}
              keyExtractor={(key, index) => index.toString()}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderFooter}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProgressScreen;
