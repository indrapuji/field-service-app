import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, View, Text, Dimensions, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalLoad from '@components/ModalLoad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('screen');

const DetailSurveyScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [value, setValue] = useState('');
  const [bagianDepan, setBagianDepan] = useState(null);
  const [bagianDalam, setBagianDalam] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJobOrder = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'get',
        url: `${host}/job-orders/single/${id}`,
        headers: { token },
      });
      setLoading(false);
      console.log(data.latitude);
      setValue(data);
      setBagianDepan(data.foto_toko_1);
      setBagianDalam(data.foto_toko_2);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobOrder();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#e3fdfd" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e3fdfd' }}>
        <View style={{ flex: 1 }}>
          {loading && <ModalLoad title={'loading data'} progres={true} />}
          <View
            style={{
              width: width,
              height: 80,
              backgroundColor: '#64dfdf',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Detail Merchant</Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 30,
              left: 20,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
          <ScrollView>
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <View>
                <View
                  style={{
                    height: 50,
                    backgroundColor: '#64dfdf',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>Data Merchant</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>Nama Merchant</Text>
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.merchant} editable={false} />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>Alamat Merchant</Text>
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.alamat} editable={false} />
                </View>
                {value.latitude !== '' && (
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                    }}
                  >
                    <View style={{ marginRight: 40 }}>
                      <Text>latitude</Text>
                      <View style={{ marginTop: 10, padding: 10, backgroundColor: '#F8F8F8' }}>
                        <Text>{value.latitude}</Text>
                      </View>
                    </View>
                    <View>
                      <Text>longitude</Text>
                      <View style={{ marginTop: 10, padding: 10, backgroundColor: '#F8F8F8' }}>
                        <Text>{value.longitude}</Text>
                      </View>
                    </View>
                  </View>
                )}
                <View style={{ marginTop: 20 }}>
                  <Text>PIC Merchant</Text>
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.pic} editable={false} />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>No Telp</Text>
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.no_telp} editable={false} />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>Kota</Text>
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.kota} editable={false} />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>Regional</Text>
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.regional} editable={false} />
                </View>
                <View>
                  <View
                    style={{
                      marginTop: 20,
                      height: 50,
                      backgroundColor: '#64dfdf',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>Foto Merchant</Text>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Bagian Depan Merchant</Text>
                    {bagianDepan ? (
                      <Image source={{ uri: bagianDepan }} style={{ width: width - 40, height: ((width - 40) / 4) * 3 }} />
                    ) : (
                      <View
                        style={{
                          marginTop: 10,
                          width: width - 40,
                          height: ((width - 40) / 4) * 3,
                          backgroundColor: 'grey',
                        }}
                      />
                    )}
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Bagian Dalam Merchant</Text>
                    {bagianDalam ? (
                      <Image source={{ uri: bagianDalam }} style={{ width: width - 40, height: ((width - 40) / 4) * 3 }} />
                    ) : (
                      <View
                        style={{
                          marginTop: 10,
                          width: width - 40,
                          height: ((width - 40) / 4) * 3,
                          backgroundColor: 'grey',
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DetailSurveyScreen;
