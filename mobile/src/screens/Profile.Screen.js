import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import host from '@utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { AuthContext } from '@components/Context';

const { width, height } = Dimensions.get('screen');

const ProfileScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { signOut } = useContext(AuthContext);
  const [dataProfile, setDataProfile] = useState({
    jobOrderCount: 0,
    jobOrderDone: 0,
    jobOrderProgres: 0,
    alamat: '',
    email: '',
    foto_profil: null,
    id: '',
    nama_bank: '',
    nama_lengkap: '',
    no_ktp: '',
    no_rekening: '',
    no_telp: '',
    tgl_lahir: '',
    tipe: '',
  });

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'get',
        url: `${host}/users/profile`,
        headers: { token },
      });
      // console.log(data);
      setDataProfile({
        jobOrderCount: data.jobOrderCount,
        jobOrderDone: data.jobOrderDone,
        jobOrderProgres: data.jobOrderProgres,
        alamat: data.userData.alamat,
        email: data.userData.email,
        foto_profil: data.userData.foto_profil,
        id: data.userData.id,
        nama_bank: data.userData.nama_bank,
        nama_lengkap: data.userData.nama_lengkap,
        no_ktp: data.userData.no_ktp,
        no_rekening: data.userData.no_rekening,
        no_telp: data.userData.no_telp,
        tgl_lahir: data.userData.tgl_lahir,
        tipe: data.userData.tipe,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [isFocused]);
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#e3fdfd" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e3fdfd' }}>
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
                  <Image source={{ uri: dataProfile.foto_profil }} style={{ width: 200, height: 200, borderRadius: 100 }} />
                </View>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{dataProfile.nama_lengkap}</Text>
                  <Text style={{ fontSize: 20, fontStyle: 'italic' }}>{dataProfile.tipe}</Text>
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
                        backgroundColor: '#bedcfa',
                        height: 100,
                        width: (width - 60) / 3,
                        marginHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{dataProfile.jobOrderCount}</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Job Order</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Progres')}>
                    <View
                      style={{
                        backgroundColor: '#98acf8',
                        height: 100,
                        width: (width - 60) / 3,
                        marginHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{dataProfile.jobOrderProgres}</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Progress</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Done')}>
                    <View
                      style={{
                        backgroundColor: '#b088f9',
                        height: 100,
                        width: (width - 60) / 3,
                        marginHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{dataProfile.jobOrderDone}</Text>
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
                    <Text style={{ marginTop: 10 }}>{dataProfile.alamat}</Text>
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
                    <Text style={{ marginTop: 10 }}>{dataProfile.no_telp}</Text>
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
                    <Text style={{ marginTop: 10 }}>{dataProfile.email}</Text>
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
                      <Text style={{ marginTop: 10 }}>{dataProfile.nama_bank}</Text>
                      <Text style={{ marginTop: 10, marginLeft: 20 }}>{dataProfile.no_rekening}</Text>
                    </View>
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
                    <Text style={{ fontWeight: 'bold' }}>No KTP</Text>
                    <Text style={{ marginTop: 10 }}>{dataProfile.no_ktp}</Text>
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
                    <Text style={{ fontWeight: 'bold' }}>Tanggal Lahir</Text>
                    <Text style={{ marginTop: 10 }}>{dataProfile.tgl_lahir}</Text>
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
