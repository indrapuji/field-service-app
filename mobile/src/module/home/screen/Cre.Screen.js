import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CardList from '../../../components/utilities/CardList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import host from '../../../utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const CreScreen = () => {
  const isFocused = useIsFocused();
  const [filtered, setFiltered] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);
  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    // getData();
    const getJobOrder = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const { data } = await axios({
          method: 'get',
          url: `${host}/job-orders/all?status=Assign&tipe=CM`,
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
    getJobOrder();
  }, [isFocused]);

  const addMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFiltered(filtered.concat(list));
    }, 2000);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#84ccf7' }}>
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
                <CardList list={filtered} />
              </View>
              {page !== currentPage && (
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
                    {loading ? <ActivityIndicator size="small" color="white" /> : <Text>More</Text>}
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreScreen;
