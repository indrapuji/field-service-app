import React, { useState, useRef } from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  options,
  lokasi,
  manual,
  salesDraft,
  sticker,
  paperRoll,
  edukasi,
} from '../assets/DetailData';
import axios from 'axios';
import host from '../../../utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from 'reanimated-bottom-sheet';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('screen');

const DetailScreen = ({ route, navigation }) => {
  const { itemData } = route.params;
  const [value, setValue] = useState({
    kontak_person: '',
    no_telp: '',
    serial_number_2: '',
    sim_card: '',
    kondisi_merchant: '',
    alamat_merchant_2: '',
    manual_book: '',
    sales_draft: '',
    sticker: '',
    kertas_termal: '',
    edukasi_merchant: '',
    adaptor: false,
    dongle_prepaid: false,
    kabel_power: false,
    kabel_telpon: false,
    materi_promosi: false,
    keterangan: '',
    job_order_id: itemData.id,
  });

  const [checked, setChecked] = useState(null);
  const [locationChecked, setLocationChecked] = useState(null);
  const [manualChecked, setManualChecked] = useState(null);
  const [salesDraftChecked, setSalesDraftChecked] = useState(null);
  const [stickerChecked, setStickerChecked] = useState(null);
  const [paperRollChecked, setPaperRollChecked] = useState(null);
  const [edukasiChecked, setEdukasiChecked] = useState(null);
  const [imageStatus, setImageStatus] = useState(null);
  const [bagianDepan, setBagianDepan] = useState(null);
  const [SNMesin, setSNMesin] = useState(null);
  const [depanMesin, setDepanMesin] = useState(null);
  const [transaksi, setTransaksi] = useState(null);
  // console.log(itemData);

  const handdleOption = (options) => {
    setChecked(options.key);
    setValue({ ...value, kondisi_merchant: options.key });
  };
  const handdleLokasi = (lokasi) => {
    setLocationChecked(lokasi.key);
  };
  const handdleManual = (manual) => {
    setManualChecked(manual.key);
    setValue({ ...value, manual_book: manual.key });
  };
  const handdleSalesDraft = (salesDraft) => {
    setSalesDraftChecked(salesDraft.key);
  };
  const handdleSticker = (sticker) => {
    setStickerChecked(sticker.key);
    setValue({ ...value, sticker: sticker.key });
  };
  const handdlePaperRoll = (paperRoll) => {
    setPaperRollChecked(paperRoll.key);
  };
  const handdleEdukasi = (edukasi) => {
    setEdukasiChecked(edukasi.key);
    setValue({ ...value, edukasi_merchant: edukasi.key });
  };

  const sendData = async () => {
    if (value.keterangan !== '') {
      try {
        const foto_1 = {
          uri: bagianDepan,
          type: 'image/jpeg',
          name: 'foto_1.jpg',
        };
        const foto_2 = {
          uri: SNMesin,
          type: 'image/jpeg',
          name: 'foto_1.jpg',
        };
        const foto_3 = {
          uri: depanMesin,
          type: 'image/jpeg',
          name: 'foto_1.jpg',
        };
        const foto_4 = {
          uri: transaksi,
          type: 'image/jpeg',
          name: 'foto_1.jpg',
        };
        var formData = new FormData();
        formData.append('foto_1', foto_1);
        formData.append('foto_2', foto_2);
        formData.append('foto_3', foto_3);
        formData.append('foto_4', foto_4);

        for (let key in value) {
          formData.append(`${key}`, value[key]);
        }
        const token = await AsyncStorage.getItem('userToken');
        const { data } = await axios({
          method: 'put',
          url: `${host}/job-orders/done`,
          data: formData,
          headers: { token },
        });
        console.log('berhasil');
        navigation.navigate('Home');
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Keterangan tidak boleh kosong');
    }
  };

  const hanndleDone = () => {
    sendData();
  };

  // console.log('location ==>', locationChecked);
  // console.log('kondisi merchants ==>', checked);
  // console.log('manual book ==>', manualChecked);
  // console.log('sticker ==>', stickerChecked);
  // console.log('paper Roll ==>', paperRollChecked);
  // console.log('edukasi merchant ==>', edukasiChecked);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        height: 205,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderColor: '#64dfdf',
      }}
    >
      <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'grey',
            height: 5,
            width: 70,
            borderRadius: 10,
          }}
        />
      </View>
      <TouchableOpacity onPress={() => handdleGalery()}>
        <View
          style={{
            backgroundColor: '#64dfdf',
            height: 50,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Open Galery</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handdleCamera()}>
        <View
          style={{
            backgroundColor: '#64dfdf',
            height: 50,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Open Camera</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const sheetRef = useRef(null);

  const handdleImage = (imagePos) => {
    sheetRef.current.snapTo(1);
    setImageStatus(imagePos);
  };

  const handdleGalery = () => {
    sheetRef.current.snapTo(0);
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: width - 40,
        maxWidth: ((width - 40) / 4) * 3,
      },
      (response) => {
        if (imageStatus === 'bagianDepan') {
          setBagianDepan(response.uri);
        }
        if (imageStatus === 'SNMesin') {
          setSNMesin(response.uri);
        }
        if (imageStatus === 'depanMesin') {
          setDepanMesin(response.uri);
        }
        if (imageStatus === 'transaksi') {
          setTransaksi(response.uri);
        }
      }
    );
  };

  const handdleCamera = () => {
    sheetRef.current.snapTo(0);
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: width - 40,
        maxWidth: ((width - 40) / 4) * 3,
      },
      (response) => {
        if (imageStatus === 'bagianDepan') {
          setBagianDepan(response.uri);
        }
        if (imageStatus === 'SNMesin') {
          setSNMesin(response.uri);
        }
        if (imageStatus === 'depanMesin') {
          setDepanMesin(response.uri);
        }
        if (imageStatus === 'transaksi') {
          setTransaksi(response.uri);
        }
      }
    );
  };
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
              <View
                style={{
                  width: width,
                  height: 50,
                  backgroundColor: '#64dfdf',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{itemData.nama_merchant}</Text>
                <Text>{itemData.alamat_merchant}</Text>
              </View>
              <ScrollView>
                <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
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
                    <Text>Nama PIC</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => setValue({ ...value, kontak_person: text })}
                      value={value.kontak_person}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>No Telp PIC</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => setValue({ ...value, no_telp: text })}
                      value={value.no_telp}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>TID</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      value={itemData.serial_number}
                      editable={false}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>MID</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      value={itemData.mid}
                      editable={false}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Serial Number</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => setValue({ ...value, serial_number_2: text })}
                      value={value.serial_number_2}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>ICCID SIM</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => setValue({ ...value, sim_card: text })}
                      value={value.sim_card}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Kondisi Merchant</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {options.map((item) => {
                        return (
                          <View key={item.key} style={{ marginTop: 15 }}>
                            <TouchableOpacity onPress={() => handdleOption(item)}>
                              <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'orange',
                                    justifyContent: 'flex-start',
                                    marginRight: 10,
                                  }}
                                >
                                  {checked === item.key && (
                                    <View
                                      style={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: 7,
                                        left: 2,
                                        top: 2,
                                        backgroundColor: 'orange',
                                      }}
                                    />
                                  )}
                                </View>
                                <Text>{item.text}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Alamat Merchant</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {lokasi.map((item) => {
                        return (
                          <View key={item.key} style={{ marginTop: 15 }}>
                            <TouchableOpacity onPress={() => handdleLokasi(item)}>
                              <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'orange',
                                    justifyContent: 'flex-start',
                                    marginRight: 10,
                                  }}
                                >
                                  {locationChecked === item.key && (
                                    <View
                                      style={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: 7,
                                        left: 2,
                                        top: 2,
                                        backgroundColor: 'orange',
                                      }}
                                    />
                                  )}
                                </View>
                                <Text>{item.text}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  {locationChecked === 'pindah' && (
                    <View style={{ marginTop: 20 }}>
                      <Text>Alamat Baru</Text>
                      <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => setValue({ ...value, alamat_merchant_2: text })}
                        value={value.alamat_merchant_2}
                      />
                    </View>
                  )}
                  <View style={{ marginTop: 20 }}>
                    <Text>Distribusi Manual Book</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {manual.map((item) => {
                        return (
                          <View key={item.key} style={{ marginTop: 15 }}>
                            <TouchableOpacity onPress={() => handdleManual(item)}>
                              <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'orange',
                                    justifyContent: 'flex-start',
                                    marginRight: 10,
                                  }}
                                >
                                  {manualChecked === item.key && (
                                    <View
                                      style={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: 7,
                                        left: 2,
                                        top: 2,
                                        backgroundColor: 'orange',
                                      }}
                                    />
                                  )}
                                </View>
                                <Text>{item.text}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Pickup Sales Draft</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {salesDraft.map((item) => {
                        return (
                          <View key={item.key} style={{ marginTop: 15 }}>
                            <TouchableOpacity onPress={() => handdleSalesDraft(item)}>
                              <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'orange',
                                    justifyContent: 'flex-start',
                                    marginRight: 10,
                                  }}
                                >
                                  {salesDraftChecked === item.key && (
                                    <View
                                      style={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: 7,
                                        left: 2,
                                        top: 2,
                                        backgroundColor: 'orange',
                                      }}
                                    />
                                  )}
                                </View>
                                <Text>{item.text}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  {salesDraftChecked === 'iya' && (
                    <View style={{ marginTop: 20 }}>
                      <Text>Jumlah</Text>
                      <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => setValue({ ...value, sales_draft: text })}
                        value={value.sales_draft}
                      />
                    </View>
                  )}
                  <View style={{ marginTop: 20 }}>
                    <Text>Penempelan Sticker</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {sticker.map((item) => {
                        return (
                          <View key={item.key} style={{ marginTop: 15 }}>
                            <TouchableOpacity onPress={() => handdleSticker(item)}>
                              <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'orange',
                                    justifyContent: 'flex-start',
                                    marginRight: 10,
                                  }}
                                >
                                  {stickerChecked === item.key && (
                                    <View
                                      style={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: 7,
                                        left: 2,
                                        top: 2,
                                        backgroundColor: 'orange',
                                      }}
                                    />
                                  )}
                                </View>
                                <Text>{item.text}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Tambah Paper Rol</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {paperRoll.map((item) => {
                        return (
                          <View key={item.key} style={{ marginTop: 15 }}>
                            <TouchableOpacity onPress={() => handdlePaperRoll(item)}>
                              <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'orange',
                                    justifyContent: 'flex-start',
                                    marginRight: 10,
                                  }}
                                >
                                  {paperRollChecked === item.key && (
                                    <View
                                      style={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: 7,
                                        left: 2,
                                        top: 2,
                                        backgroundColor: 'orange',
                                      }}
                                    />
                                  )}
                                </View>
                                <Text>{item.text}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  {paperRollChecked === 'iya' && (
                    <View style={{ marginTop: 20 }}>
                      <Text>Jumlah</Text>
                      <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => setValue({ ...value, kertas_termal: text })}
                        value={value.kertas_termal}
                      />
                    </View>
                  )}
                  <View style={{ marginTop: 20 }}>
                    <Text>Edukasi Merchant</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {edukasi.map((item) => {
                        return (
                          <View key={item.key} style={{ marginTop: 15 }}>
                            <TouchableOpacity onPress={() => handdleEdukasi(item)}>
                              <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'orange',
                                    justifyContent: 'flex-start',
                                    marginRight: 10,
                                  }}
                                >
                                  {edukasiChecked === item.key && (
                                    <View
                                      style={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: 7,
                                        left: 2,
                                        top: 2,
                                        backgroundColor: 'orange',
                                      }}
                                    />
                                  )}
                                </View>
                                <Text>{item.text}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Kelengkapan</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ marginRight: 20 }}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
                        >
                          <View style={{ marginRight: 5 }}>
                            <CheckBox
                              disabled={false}
                              value={value.adaptor}
                              onValueChange={(newValue) =>
                                setValue({ ...value, adaptor: newValue })
                              }
                            />
                          </View>
                          <Text>Adaptor</Text>
                        </View>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
                        >
                          <View style={{ marginRight: 5 }}>
                            <CheckBox
                              disabled={false}
                              value={value.dongle_prepaid}
                              onValueChange={(newValue) =>
                                setValue({ ...value, dongle_prepaid: newValue })
                              }
                            />
                          </View>
                          <Text>Dongle Prepaid</Text>
                        </View>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
                        >
                          <View style={{ marginRight: 5 }}>
                            <CheckBox
                              disabled={false}
                              value={value.kabel_power}
                              onValueChange={(newValue) =>
                                setValue({ ...value, kabel_power: newValue })
                              }
                            />
                          </View>
                          <Text>Kabel Power</Text>
                        </View>
                      </View>
                      <View>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
                        >
                          <View style={{ marginRight: 5 }}>
                            <CheckBox
                              disabled={false}
                              value={value.kabel_telpon}
                              onValueChange={(newValue) =>
                                setValue({ ...value, kabel_telpon: newValue })
                              }
                            />
                          </View>
                          <Text>Kabel Telepon</Text>
                        </View>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
                        >
                          <View style={{ marginRight: 5 }}>
                            <CheckBox
                              disabled={false}
                              value={value.materi_promosi}
                              onValueChange={(newValue) =>
                                setValue({ ...value, materi_promosi: newValue })
                              }
                            />
                          </View>
                          <Text>Materi Promosi</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Keterangan</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => setValue({ ...value, keterangan: text })}
                      value={value.keterangan}
                    />
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
                    <TouchableOpacity onPress={() => handdleImage('bagianDepan')}>
                      {bagianDepan ? (
                        <Image
                          source={{ uri: bagianDepan }}
                          style={{ width: width - 40, height: ((width - 40) / 4) * 3 }}
                        />
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
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto SN Mesin EDC</Text>
                    <TouchableOpacity onPress={() => handdleImage('SNMesin')}>
                      {SNMesin ? (
                        <Image
                          source={{ uri: SNMesin }}
                          style={{ width: width - 40, height: ((width - 40) / 4) * 3 }}
                        />
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
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Bagian Depan Mesin EDC</Text>
                    <TouchableOpacity onPress={() => handdleImage('depanMesin')}>
                      {depanMesin ? (
                        <Image
                          source={{ uri: depanMesin }}
                          style={{ width: width - 40, height: ((width - 40) / 4) * 3 }}
                        />
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
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Transaksi</Text>
                    <TouchableOpacity onPress={() => handdleImage('transaksi')}>
                      {transaksi ? (
                        <Image
                          source={{ uri: transaksi }}
                          style={{ width: width - 40, height: ((width - 40) / 4) * 3 }}
                        />
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
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => hanndleDone()}>
                    <View
                      style={{
                        marginTop: 20,
                        width: width - 40,
                        height: 50,
                        backgroundColor: '#64dfdf',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}
                    >
                      <Text>Simpan</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 200]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
};

export default DetailScreen;
