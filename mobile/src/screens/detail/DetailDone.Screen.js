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
  const [EDCCompetitor, setEDCCompetitor] = useState(null);
  const [depanMesin, setDepanMesin] = useState(null);
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
      setValue(data);
      setBagianDepan(data.foto_toko_1);
      setBagianDalam(data.foto_toko_2);
      setDepanMesin(data.foto_edc_1);
      setEDCCompetitor(data.foto_edc_2);
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
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.nama_merchant} editable={false} />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>Alamat Merchant</Text>
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.alamat_merchant} editable={false} />
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
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.pic_merchant} editable={false} />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>No Telp</Text>
                  <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.no_telp_merchant} editable={false} />
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
                    <Text style={{ fontWeight: 'bold' }}>Detail EDC</Text>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>TID</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.tid} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>MID</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.mid} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Serial Number</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.sn_edc} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>ICCID SIM</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.sim_card} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Jenis Mesin EDC</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.type_edc} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Status EDC</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.status_edc} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Distribusi Manual Book</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.manual_book} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Penempelan Sticker</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.sticker} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Paper Roll</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.kertas_termal} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Edukasi Merchant</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.edukasi_merchant} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Edisi Bank Lain</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.edc_kompetitor} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Keluhan</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.keluhan} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Aktifitas</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.aktifitas} editable={false} />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Catatan</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }} value={value.catatan} editable={false} />
                  </View>
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
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Bagian Depan Mesin EDC</Text>
                    {depanMesin ? (
                      <Image source={{ uri: depanMesin }} style={{ width: width - 40, height: ((width - 40) / 4) * 3 }} />
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
                    <Text>Foto EDC Bank Lain</Text>
                    {EDCCompetitor ? (
                      <Image source={{ uri: EDCCompetitor }} style={{ width: width - 40, height: ((width - 40) / 4) * 3 }} />
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
