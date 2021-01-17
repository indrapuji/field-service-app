import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('screen');

const DetailScreen = ({ route, navigation }) => {
  const { itemData } = route.params;
  const [value, onChangeText] = useState('');
  const [checked, setChecked] = useState('buka');
  const [locationChecked, setLocationChecked] = useState('tetap');
  const [manualChecked, setManualChecked] = useState('tidak');
  const [salesDraftChecked, setSalesDraftChecked] = useState('tidak');
  const [stickerChecked, setStickerChecked] = useState('tidak');
  const [paperRollChecked, setPaperRollChecked] = useState('tidak');
  const [edukasiChecked, setEdukasiChecked] = useState('tidak');
  const [statusChecked, setStatusChecked] = useState('Assign');
  const [showModal, setShowModal] = useState(false);
  const [edukasiText, setEdukasiText] = useState('Assign');
  // console.log(itemData);
  const options = [
    {
      key: 'buka',
      text: 'Buka',
    },
    {
      key: 'tutup',
      text: 'Tutup',
    },
  ];
  const lokasi = [
    {
      key: 'tetap',
      text: 'Tetap',
    },
    {
      key: 'pindah',
      text: 'Pindah',
    },
  ];
  const manual = [
    {
      key: 'iya',
      text: 'Iya',
    },
    {
      key: 'tidak',
      text: 'Tidak',
    },
  ];
  const salesDraft = [
    {
      key: 'iya',
      text: 'Iya',
    },
    {
      key: 'tidak',
      text: 'Tidak',
    },
  ];
  const sticker = [
    {
      key: 'iya',
      text: 'Iya',
    },
    {
      key: 'tidak',
      text: 'Tidak',
    },
  ];
  const paperRoll = [
    {
      key: 'iya',
      text: 'Iya',
    },
    {
      key: 'tidak',
      text: 'Tidak',
    },
  ];
  const edukasi = [
    {
      key: 'iya',
      text: 'Iya',
    },
    {
      key: 'tidak',
      text: 'Tidak',
    },
  ];
  const status = [
    {
      key: 'Assign',
      text: 'Assign',
    },
    {
      key: 'Progres',
      text: 'Progres',
    },
    {
      key: 'Done',
      text: 'Done',
    },
  ];

  const handdleOption = (options) => {
    setChecked(options.key);
  };
  const handdleLokasi = (lokasi) => {
    setLocationChecked(lokasi.key);
  };
  const handdleManual = (manual) => {
    setManualChecked(manual.key);
  };
  const handdleSalesDraft = (salesDraft) => {
    setSalesDraftChecked(salesDraft.key);
  };
  const handdleSticker = (sticker) => {
    setStickerChecked(sticker.key);
  };
  const handdlePaperRoll = (paperRoll) => {
    setPaperRollChecked(paperRoll.key);
  };
  const handdleEdukasi = (edukasi) => {
    setEdukasiChecked(edukasi.key);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const handdleStatus = (status) => {
    setStatusChecked(status.key);
    setEdukasiText(status.text);
    setShowModal(false);
  };

  // console.log(locationChecked);
  // console.log(checked);
  // console.log(manualChecked);
  // console.log(stickerChecked);
  // console.log(paperRollChecked);
  // console.log(edukasiChecked);
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
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>No Telp PIC</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>TID</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>MID</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>ICCID SIM</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
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
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
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
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
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
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
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
                    <Text>Keterangan</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
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
                    <View
                      style={{
                        marginTop: 10,
                        width: width - 40,
                        height: 250,
                        backgroundColor: 'grey',
                      }}
                    ></View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Bagian Belakang Mesin EDC</Text>
                    <View
                      style={{
                        marginTop: 10,
                        width: width - 40,
                        height: 250,
                        backgroundColor: 'grey',
                      }}
                    ></View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Bagian Depan Mesin EDC</Text>
                    <View
                      style={{
                        marginTop: 10,
                        width: width - 40,
                        height: 250,
                        backgroundColor: 'grey',
                      }}
                    ></View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Transaksi</Text>
                    <View
                      style={{
                        marginTop: 10,
                        width: width - 40,
                        height: 250,
                        backgroundColor: 'grey',
                      }}
                    ></View>
                  </View>
                  {/* <View style={{ position: 'relative' }}>
                    <View style={{ marginTop: 20, marginBottom: 50 }}>
                      <Text>Status</Text>
                      <View
                        style={{
                          position: 'absolute',
                          top: 15,
                          width: width - 40,
                          borderWidth: 1,
                          marginTop: 10,
                        }}
                      >
                        <TouchableOpacity onPress={() => openModal()}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Text style={{ color: 'orange', fontWeight: 'bold', paddingLeft: 10 }}>
                              {edukasiText}
                            </Text>
                            <View>
                              <Icon name="keyboard-arrow-down" size={40} color="orange" />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View> */}
                  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <View
                      style={{
                        marginTop: 20,
                        width: width - 40,
                        height: 50,
                        backgroundColor: '#64dfdf',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text>Simpan</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
          <Modal animationType="slide" transparent={true} visible={showModal}>
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingVertical: 35,
                  paddingLeft: 20,
                  width: width - 80,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                {status.map((item) => {
                  return (
                    <View key={item.key} style={{ marginBottom: 20 }}>
                      <TouchableOpacity onPress={() => handdleStatus(item)}>
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              height: 20,
                              width: 20,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'orange',
                              justifyContent: 'flex-start',
                              marginRight: 20,
                            }}
                          >
                            {statusChecked === item.key && (
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
          </Modal>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DetailScreen;
