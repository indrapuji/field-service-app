import React, { useContext } from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { AuthContext } from '../../../components/utilities/Context';

const { width, height } = Dimensions.get('screen');

const ProfileScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                // backgroundColor: 'white',
              }}
            >
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../../../assets/images/profile.jpg')}
                    style={{ width: 200, height: 200, borderRadius: 100 }}
                  />
                </View>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Indra Puji Novirwan</Text>
                  <Text style={{ fontSize: 20, fontStyle: 'italic' }}>Technical Support</Text>
                </View>

                <View
                  style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flex: 1,
                  }}
                >
                  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <View
                      style={{
                        backgroundColor: '#ff884b',
                        height: 100,
                        width: (width - 60) / 2,
                        marginHorizontal: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{list.length}</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Job Order</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Done')}>
                    <View
                      style={{
                        backgroundColor: '#cdfffc',
                        height: 100,
                        width: (width - 60) / 2,
                        marginHorizontal: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{list.length - 3}</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Done</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    height: 100,
                    width: width - 40,
                    borderRadius: 20,
                  }}
                >
                  <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Alamat</Text>
                    <Text style={{ marginTop: 10 }}>
                      Jln Puyuh VII Blok F No. 241, Pondok Timur Indah
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 100,
                    width: width - 40,
                    borderRadius: 20,
                    marginTop: 10,
                  }}
                >
                  <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Telepon</Text>
                    <Text style={{ marginTop: 10 }}>081996946467</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 100,
                    width: width - 40,
                    borderRadius: 20,
                    marginTop: 10,
                  }}
                >
                  <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Email</Text>
                    <Text style={{ marginTop: 10 }}>indrapuji@gmail.com</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 100,
                    width: width - 40,
                    borderRadius: 20,
                    marginTop: 10,
                  }}
                >
                  <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>No Rekening</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ marginTop: 10 }}>BCA</Text>
                      <Text style={{ marginTop: 10, marginLeft: 20 }}>8415093230</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={() => signOut()}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      height: 40,
                      width: width - 40,
                      borderRadius: 20,
                      marginVertical: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15 }}>Logout</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;
