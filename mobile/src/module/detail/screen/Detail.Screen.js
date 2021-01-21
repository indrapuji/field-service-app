import React, { useState, useRef, useEffect } from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  jenisedc,
  statusedc,
  options,
  optionsBuka,
  optionsTutup,
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
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';
import Signature from 'react-native-signature-canvas';
import GetLocation from 'react-native-get-location';
import ModalLoad from '../../../components/ModalLoad';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('screen');

const DetailScreen = ({ route, navigation }) => {
  const { itemData } = route.params;

  const [tipe, setTipe] = useState(null);
  const [checked, setChecked] = useState(null);
  const [edc, setEdc] = useState(null);
  const [statusEdc, setStatusEdc] = useState(null);
  const [merchantChecked, setMerchantChecked] = useState(null);
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
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mError, setMError] = useState(false);
  const [notComplete, setNotComplete] = useState(false);

  const [value, setValue] = useState({
    kontak_person: '',
    no_telp: '',
    serial_number_2: '',
    sim_card: '',
    kondisi_merchant: '',
    alamat_merchant_2: '',
    jenis_mesin_edc: '',
    status_edc: '',
    manual_book: '',
    sales_draft: '',
    sticker: '',
    status_kertas_termal: '',
    kertas_termal: '',
    edukasi_merchant: '',
    adaptor: '',
    dongle_prepaid: '',
    kabel_power: '',
    kabel_telpon: '',
    materi_promosi: '',
    keterangan: '',
    keluhan: '',
    job_order_id: itemData.id,
    edc_bank: [],
    latitude: '',
    longitude: '',
  });
  const [kelengkapan, setKelengkapan] = useState({
    adaptor: false,
    dongle_prepaid: false,
    kabel_power: false,
    kabel_telpon: false,
    materi_promosi: false,
  });
  const [edukasiMerchant, setEdukasiMerchant] = useState({
    gpn: false,
    gestun: false,
    surcharge: false,
    split: false,
    edctempatlain: false,
  });
  const [edcBanklain, setEdcBanklain] = useState({
    bca: false,
    mandiri: false,
    bri: false,
    bni: false,
    cimb: false,
    lainnya: false,
  });

  // get location
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setValue({ ...value, latitude: location.latitude, longitude: location.longitude });
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code, message);
      });
    setTipe(itemData.tipe);
  }, []);

  const handdleJenisEDC = (JenisEDC) => {
    setEdc(JenisEDC.key);
    setValue({
      ...value,
      jenis_mesin_edc: JenisEDC.key,
    });
  };
  const handdleStatusEDC = (statusEDC) => {
    setStatusEdc(statusEDC.key);
    setValue({
      ...value,
      status_edc: statusEDC.key,
    });
  };
  const handdleOption = (options) => {
    if (options.key === 'tidak ditemukan') {
      setChecked(options.key);
      setValue({ ...value, kondisi_merchant: options.key });
    } else {
      setChecked(options.key);
    }
  };
  const handdleOptionNext = (optionsBuka) => {
    setMerchantChecked(optionsBuka.key);
    setValue({ ...value, kondisi_merchant: optionsBuka.key });
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
    setValue({ ...value, sales_draft: salesDraft.key });
  };
  const handdleSticker = (sticker) => {
    setStickerChecked(sticker.key);
    setValue({ ...value, sticker: sticker.key });
  };
  const handdlePaperRoll = (paperRoll) => {
    setPaperRollChecked(paperRoll.key);
    setValue({ ...value, status_kertas_termal: paperRoll.key });
  };
  const handdleEdukasi = (edukasi) => {
    setEdukasiChecked(edukasi.key);
    setValue({ ...value, edukasi_merchant: edukasi.key });
  };

  const handdleBankLain = (name, newValue) => {
    if (name === 'bca') {
      setEdcBanklain({ ...edcBanklain, bca: newValue });
      if (newValue === true) {
        setValue({
          ...value,
          edc_bank: value.edc_bank.concat(name),
        });
      } else {
        const newLain = value.edc_bank.filter((x) => x !== name);
        setValue({ ...value, edc_bank: newLain });
      }
    }
    if (name === 'mandiri') {
      setEdcBanklain({ ...edcBanklain, mandiri: newValue });
      if (newValue === true) {
        setValue({
          ...value,
          edc_bank: value.edc_bank.concat(name),
        });
      } else {
        const newLain = value.edc_bank.filter((x) => x !== name);
        setValue({ ...value, edc_bank: newLain });
      }
    }
    if (name === 'bri') {
      setEdcBanklain({ ...edcBanklain, bri: newValue });
      if (newValue === true) {
        setValue({
          ...value,
          edc_bank: value.edc_bank.concat(name),
        });
      } else {
        const newLain = value.edc_bank.filter((x) => x !== name);
        setValue({ ...value, edc_bank: newLain });
      }
    }
    if (name === 'bni') {
      setEdcBanklain({ ...edcBanklain, bni: newValue });
      if (newValue === true) {
        setValue({
          ...value,
          edc_bank: value.edc_bank.concat(name),
        });
      } else {
        const newLain = value.edc_bank.filter((x) => x !== name);
        setValue({ ...value, edc_bank: newLain });
      }
    }
    if (name === 'cimb') {
      setEdcBanklain({ ...edcBanklain, cimb: newValue });
      if (newValue === true) {
        setValue({
          ...value,
          edc_bank: value.edc_bank.concat(name),
        });
      } else {
        const newLain = value.edc_bank.filter((x) => x !== name);
        setValue({ ...value, edc_bank: newLain });
      }
    }
    if (name === 'lainnya') {
      setEdcBanklain({ ...edcBanklain, lainnya: newValue });
      if (newValue === true) {
        setValue({
          ...value,
          edc_bank: value.edc_bank.concat(name),
        });
      } else {
        const newLain = value.edc_bank.filter((x) => x !== name);
        setValue({ ...value, edc_bank: newLain });
      }
    }
  };

  const handdleKelengkapan = (part, newValue) => {
    if (part === 'adaptor') {
      setKelengkapan({ ...kelengkapan, adaptor: newValue });
      if (newValue === true) {
        setValue({ ...value, adaptor: 'ada' });
      } else {
        setValue({ ...value, adaptor: 'tidak' });
      }
    }
    if (part === 'dongle_prepaid') {
      setKelengkapan({ ...kelengkapan, dongle_prepaid: newValue });
      if (newValue === true) {
        setValue({ ...value, dongle_prepaid: 'ada' });
      } else {
        setValue({ ...value, dongle_prepaid: 'tidak' });
      }
    }
    if (part === 'kabel_power') {
      setKelengkapan({ ...kelengkapan, kabel_power: newValue });
      if (newValue === true) {
        setValue({ ...value, kabel_power: 'ada' });
      } else {
        setValue({ ...value, kabel_power: 'tidak' });
      }
    }
    if (part === 'kabel_telpon') {
      setKelengkapan({ ...kelengkapan, kabel_telpon: newValue });
      if (newValue === true) {
        setValue({ ...value, kabel_telpon: 'ada' });
      } else {
        setValue({ ...value, kabel_telpon: 'tidak' });
      }
    }
    if (part === 'materi_promosi') {
      setKelengkapan({ ...kelengkapan, materi_promosi: newValue });
      if (newValue === true) {
        setValue({ ...value, materi_promosi: 'ada' });
      } else {
        setValue({ ...value, materi_promosi: 'tidak' });
      }
    }
  };

  const sendData = async () => {
    if (value.keterangan !== '') {
      setLoading(true);
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
          if (key === 'edc_bank') formData.append(`${key}`, JSON.stringify(value[key]));
          else formData.append(`${key}`, value[key]);
        }
        const token = await AsyncStorage.getItem('userToken');
        const { data } = await axios({
          method: 'put',
          url: `${host}/job-orders/done`,
          data: formData,
          headers: { token },
        });
        setLoading(false);
        console.log('berhasil');
        navigation.navigate('Home');
      } catch (err) {
        console.log(err);
        setMError(true);
        setTimeout(() => {
          setMError(false);
        }, 2000);
      }
    } else {
      setNotComplete(true);
      setTimeout(() => {
        setNotComplete(false);
      }, 2000);
    }
  };

  const hanndleDone = () => {
    sendData();
  };

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
        quality: 1,
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
        quality: 1,
        // saveToPhotos: true,
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
          {loading && <ModalLoad title={'sending data'} progres={true} />}
          {mError && <ModalLoad title={'Failed sending'} progres={false} />}
          {notComplete && <ModalLoad title={'Keterangan Tidak Boleh Kosong'} progres={false} />}
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: width,
                  height: 50,
                  backgroundColor: '#64dfdf',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 15,
                    left: 20,
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Icon name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{itemData.nama_merchant}</Text>
                <Text>{itemData.alamat_merchant}</Text>
              </View>
              <ScrollView>
                <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                  {/* Data Merchants */}
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
                    {checked === 'buka' && (
                      <View style={{ marginLeft: 30 }}>
                        <View style={{}}>
                          {optionsBuka.map((item) => {
                            return (
                              <View key={item.key} style={{ marginTop: 15 }}>
                                <TouchableOpacity onPress={() => handdleOptionNext(item)}>
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
                                      {merchantChecked === item.key && (
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
                    )}
                    {checked === 'tutup' && (
                      <View style={{ marginLeft: 30 }}>
                        <View style={{}}>
                          {optionsTutup.map((item) => {
                            return (
                              <View key={item.key} style={{ marginTop: 15 }}>
                                <TouchableOpacity onPress={() => handdleOptionNext(item)}>
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
                                      {merchantChecked === item.key && (
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
                    )}
                    <View style={{ marginTop: 20 }}>
                      <Text>Alamat Merchant</Text>
                      <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                        value={itemData.alamat_merchant}
                        editable={false}
                      />

                      {value.latitude !== '' && (
                        <View
                          style={{
                            marginTop: 20,
                            flexDirection: 'row',
                          }}
                        >
                          <View style={{ marginRight: 40 }}>
                            <Text>latitude</Text>
                            <View
                              style={{ marginTop: 10, padding: 10, backgroundColor: '#F8F8F8' }}
                            >
                              <Text>{value.latitude}</Text>
                            </View>
                          </View>
                          <View>
                            <Text>longitude</Text>
                            <View
                              style={{ marginTop: 10, padding: 10, backgroundColor: '#F8F8F8' }}
                            >
                              <Text>{value.longitude}</Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <Text>Alamat Merchant saat ini</Text>
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
                  </View>
                  {/* Detail EDC */}
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
                      <Text>Jenis Mesin EDC</Text>
                      <View style={{ flexDirection: 'row' }}>
                        {jenisedc.map((item) => {
                          return (
                            <View key={item.key} style={{ marginTop: 15 }}>
                              <TouchableOpacity onPress={() => handdleJenisEDC(item)}>
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
                                    {edc === item.key && (
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
                      <Text>Status Mesin EDC</Text>
                      <View style={{}}>
                        {statusedc.map((item) => {
                          return (
                            <View key={item.key} style={{ marginTop: 15 }}>
                              <TouchableOpacity onPress={() => handdleStatusEDC(item)}>
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
                                    {statusEdc === item.key && (
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
                    {tipe === 'Kunjungan' && (
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
                    )}
                    {tipe === 'Pickup' && (
                      <View style={{ marginTop: 20 }}>
                        <Text>Sales Draft</Text>
                        <View style={{}}>
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
                    )}
                    {tipe === 'Kunjungan' && (
                      <View>
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
                          <Text>Paper Roll</Text>
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
                        {paperRollChecked === 'ada' && (
                          <View style={{ marginTop: 20 }}>
                            <Text>Jumlah</Text>
                            <TextInput
                              style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                              onChangeText={(text) => setValue({ ...value, kertas_termal: text })}
                              value={value.kertas_termal}
                            />
                          </View>
                        )}
                        {paperRollChecked === 'tidak ada' && (
                          <View style={{ marginTop: 20 }}>
                            <Text>Jumlah Penambahan</Text>
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
                        {edukasiChecked === 'iya' && (
                          <View style={{ marginTop: 20 }}>
                            <View style={{}}>
                              <View style={{ marginRight: 20 }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 5,
                                  }}
                                >
                                  <View style={{ marginRight: 5 }}>
                                    <CheckBox
                                      disabled={false}
                                      value={edukasiMerchant.gpn}
                                      onValueChange={(newValue) =>
                                        setEdukasiMerchant({ ...edukasiMerchant, gpn: newValue })
                                      }
                                    />
                                  </View>
                                  <Text>GPN</Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 5,
                                  }}
                                >
                                  <View style={{ marginRight: 5 }}>
                                    <CheckBox
                                      disabled={false}
                                      value={edukasiMerchant.gestun}
                                      onValueChange={(newValue) =>
                                        setEdukasiMerchant({ ...edukasiMerchant, gestun: newValue })
                                      }
                                    />
                                  </View>
                                  <Text>Larangan Gestun</Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 5,
                                  }}
                                >
                                  <View style={{ marginRight: 5 }}>
                                    <CheckBox
                                      disabled={false}
                                      value={edukasiMerchant.surcharge}
                                      onValueChange={(newValue) =>
                                        setEdukasiMerchant({
                                          ...edukasiMerchant,
                                          surcharge: newValue,
                                        })
                                      }
                                    />
                                  </View>
                                  <Text>Larangan Surcharge</Text>
                                </View>
                              </View>
                              <View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 5,
                                  }}
                                >
                                  <View style={{ marginRight: 5 }}>
                                    <CheckBox
                                      disabled={false}
                                      value={edukasiMerchant.split}
                                      onValueChange={(newValue) =>
                                        setEdukasiMerchant({ ...edukasiMerchant, split: newValue })
                                      }
                                    />
                                  </View>
                                  <Text>Larangan Split Transaksi</Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 5,
                                  }}
                                >
                                  <View style={{ marginRight: 5 }}>
                                    <CheckBox
                                      disabled={false}
                                      value={edukasiMerchant.edctempatlain}
                                      onValueChange={(newValue) =>
                                        setEdukasiMerchant({
                                          ...edukasiMerchant,
                                          edctempatlain: newValue,
                                        })
                                      }
                                    />
                                  </View>
                                  <Text>Larangan Mesin EDC di tempat Lain</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        )}
                        <View style={{ marginTop: 20 }}>
                          <Text>Kelengkapan</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 20 }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={kelengkapan.adaptor}
                                    onValueChange={(newValue) =>
                                      handdleKelengkapan('adaptor', newValue)
                                    }
                                  />
                                </View>
                                <Text>Adaptor</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={kelengkapan.dongle_prepaid}
                                    onValueChange={(newValue) =>
                                      handdleKelengkapan('dongle_prepaid', newValue)
                                    }
                                  />
                                </View>
                                <Text>Dongle Prepaid</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={kelengkapan.kabel_power}
                                    onValueChange={(newValue) =>
                                      handdleKelengkapan('kabel_power', newValue)
                                    }
                                  />
                                </View>
                                <Text>Kabel Power</Text>
                              </View>
                            </View>
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={kelengkapan.kabel_telpon}
                                    onValueChange={(newValue) =>
                                      handdleKelengkapan('kabel_telpon', newValue)
                                    }
                                  />
                                </View>
                                <Text>Kabel Telepon</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={kelengkapan.materi_promosi}
                                    onValueChange={(newValue) =>
                                      handdleKelengkapan('materi_promosi', newValue)
                                    }
                                  />
                                </View>
                                <Text>Materi Promosi</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                          <Text>EDC Bank Lain</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 20 }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={edcBanklain.bca}
                                    onValueChange={(newValue) => handdleBankLain('bca', newValue)}
                                  />
                                </View>
                                <Text>BCA</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={edcBanklain.mandiri}
                                    onValueChange={(newValue) =>
                                      handdleBankLain('mandiri', newValue)
                                    }
                                  />
                                </View>
                                <Text>Mandiri</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={edcBanklain.bri}
                                    onValueChange={(newValue) => handdleBankLain('bri', newValue)}
                                  />
                                </View>
                                <Text>BRI</Text>
                              </View>
                            </View>
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={edcBanklain.bni}
                                    onValueChange={(newValue) => handdleBankLain('bni', newValue)}
                                  />
                                </View>
                                <Text>BNI</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={edcBanklain.cimb}
                                    onValueChange={(newValue) => handdleBankLain('cimb', newValue)}
                                  />
                                </View>
                                <Text>CIMB</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}
                              >
                                <View style={{ marginRight: 5 }}>
                                  <CheckBox
                                    disabled={false}
                                    value={edcBanklain.lainnya}
                                    onValueChange={(newValue) =>
                                      handdleBankLain('lainnya', newValue)
                                    }
                                  />
                                </View>
                                <Text>Lainnya</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    <View style={{ marginTop: 20 }}>
                      <Text>Keluhan</Text>
                      <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => setValue({ ...value, keluhan: text })}
                        value={value.keluhan}
                      />
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <Text>Keterangan</Text>
                      <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => setValue({ ...value, keterangan: text })}
                        value={value.keterangan}
                      />
                    </View>
                  </View>
                  {/* Foto Merchant */}
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
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Tanda tangan Merchant</Text>
                    <View
                      style={{
                        width: width - 40,
                        height: 200,
                        backgroundColor: '#F8F8F8',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                      }}
                    >
                      {signature ? (
                        <Image
                          resizeMode={'contain'}
                          style={{ width: width - 40, height: 200 }}
                          source={{ uri: signature }}
                        />
                      ) : null}
                    </View>
                    <Signature
                      onOK={setSignature}
                      onEmpty={() => console.log('onEmpty')}
                      onClear={() => setSignature(null)}
                      autoClear={true}
                      imageType={'image/png+xml'}
                    />
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
