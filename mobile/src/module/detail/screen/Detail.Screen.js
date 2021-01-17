import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
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
// import Icon from 'react-native-vector-icons/MaterialIcons';

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
    sales_draft: 0,
    sticker: '',
    kertas_termal: 0,
    edukasi_merchant: '',
    adaptor: false,
    dongle_prepaid: false,
    kabel_power: false,
    kabel_telpon: false,
    materi_promosi: false,
    keterangan: '',
    tanggal_selesai: new Date(),
    job_order_id: 0,
  });

  const [checked, setChecked] = useState(null);
  const [locationChecked, setLocationChecked] = useState(null);
  const [manualChecked, setManualChecked] = useState(null);
  const [salesDraftChecked, setSalesDraftChecked] = useState(null);
  const [stickerChecked, setStickerChecked] = useState(null);
  const [paperRollChecked, setPaperRollChecked] = useState(null);
  const [edukasiChecked, setEdukasiChecked] = useState(null);
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

  const simpan = () => {
    console.log(value);
  };

  // console.log('location ==>', locationChecked);
  // console.log('kondisi merchants ==>', checked);
  // console.log('manual book ==>', manualChecked);
  // console.log('sticker ==>', stickerChecked);
  // console.log('paper Roll ==>', paperRollChecked);
  // console.log('edukasi merchant ==>', edukasiChecked);
  console.log(value);
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
                      onChangeText={(text) => setValue({ ...value, serial_number_2: text })}
                      value={value.serial_number_2}
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
                        onChangeText={(text) => setValue({ ...value, sales_draft: Number(text) })}
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
                        onChangeText={(text) => setValue({ ...value, kertas_termal: Number(text) })}
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
                    <Text>Kelengkapan</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ marginRight: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            disabled={false}
                            value={value.adaptor}
                            onValueChange={(newValue) => setValue({ ...value, adaptor: newValue })}
                          />
                          <Text>Adaptor</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            disabled={false}
                            value={value.dongle_prepaid}
                            onValueChange={(newValue) =>
                              setValue({ ...value, dongle_prepaid: newValue })
                            }
                          />
                          <Text>Dongle Prepaid</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            disabled={false}
                            value={value.kabel_power}
                            onValueChange={(newValue) =>
                              setValue({ ...value, kabel_power: newValue })
                            }
                          />
                          <Text>Kabel Power</Text>
                        </View>
                      </View>
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            disabled={false}
                            value={value.kabel_telpon}
                            onValueChange={(newValue) =>
                              setValue({ ...value, kabel_telpon: newValue })
                            }
                          />
                          <Text>Kabel Telepon</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            disabled={false}
                            value={value.materi_promosi}
                            onValueChange={(newValue) =>
                              setValue({ ...value, materi_promosi: newValue })
                            }
                          />
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

                  <TouchableOpacity onPress={() => simpan()}>
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
    </>
  );
};

export default DetailScreen;
