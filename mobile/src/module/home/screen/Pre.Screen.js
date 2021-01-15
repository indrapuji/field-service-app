import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import CardList from '../../../components/utilities/CardList';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PreScreen = () => {
  const [filtered, setFiltered] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const list = [
    {
      nama_merchant: 'Polo Pondok Indah',
      alamat: 'Mall Pondok Indah ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'iStore Pondok Indah',
      alamat: 'Mall Pondok Indah ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'Guess Pondok Indah',
      alamat: 'Mall Pondok Indah ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'H&M Pondok Indah',
      alamat: 'Mall Pondok Indah ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'Nike Pondok Indah',
      alamat: 'Mall Pondok Indah ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'Reebok Pondok Indah',
      alamat: 'Mall Pondok Indah ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'Adidas Pondok Indah',
      alamat: 'Mall Pondok Indah ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'Puma Gandaria City',
      alamat: 'Mall Gandaria City ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'Eiger Gandaria City',
      alamat: 'Mall Gandaria City ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
    {
      nama_merchant: 'Cosmos Gandaria City',
      alamat: 'Mall Gandaria City ',
      type: 'PM',
      MID: '0123456789',
      TID: '0123456789',
    },
  ];

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
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PreScreen;
