import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, SafeAreaView, View, Text, Dimensions, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Signature from 'react-native-signature-canvas';
import ModalLoad from '@components/ModalLoad';
import * as ImagePicker from 'react-native-image-picker';
import GetLocation from 'react-native-get-location';
import BottomSheet from 'reanimated-bottom-sheet';
import axios from 'axios';
import host from '@utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen');

const CreateScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    merchant: '',
    alamat: '',
    kota: '',
    regional: '',
    pic: '',
    no_telp: '',
    tanggal_impor: new Date(),
    latitude: '',
    longitude: '',
    tipe: 'Survey',
  });
  const [bagianDepan, setBagianDepan] = useState(null);
  const [bagianDalam, setBagianDalam] = useState(null);
  const [signature, setSignature] = useState(null);
  const [mSuccess, setMSuccess] = useState(false);
  const [mError, setMError] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [imageStatus, setImageStatus] = useState(null);
  const [loading, setLoading] = useState(false);

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
        if (imageStatus === 'bagianDalam') {
          setBagianDalam(response.uri);
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
        if (imageStatus === 'bagianDalam') {
          setBagianDalam(response.uri);
        }
      }
    );
  };

  const changeSignature = (data) => {
    setSignature(data);
    setMSuccess(true);
    setTimeout(() => {
      setMSuccess(false);
    }, 1000);
  };

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
  }, []);

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

  const sendData = async () => {
    setLoading(true);
    try {
      const foto_toko_1 = {
        uri: bagianDepan,
        type: 'image/jpeg',
        name: 'foto_toko_1.jpg',
      };
      const foto_toko_2 = {
        uri: bagianDalam,
        type: 'image/jpeg',
        name: 'foto_toko_2.jpg',
      };
      var formData = new FormData();
      if (bagianDepan) formData.append('foto_toko_1', foto_toko_1);
      if (bagianDalam) formData.append('foto_toko_2', foto_toko_2);
      if (signature) formData.append('tanda_tangan', signature);
      for (let key in value) {
        formData.append(`${key}`, value[key]);
      }
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'POST',
        url: `${host}/job-orders`,
        data: formData,
        headers: { token },
      });
      setLoading(false);
      console.log('berhasil');
      navigation.navigate('Survey');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(JSON.stringify(error.response.data));
        console.log(JSON.stringify(error.response.status));
        console.log(JSON.stringify(error.response.headers));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(JSON.stringify(error.request));
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(JSON.stringify(error.config));
      setLoading(false);
      setMError(true);
      setTimeout(() => {
        setMError(false);
      }, 2000);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#e3fdfd" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e3fdfd' }}>
        <View style={{ flex: 1 }}>
          {loading && <ModalLoad title={'sending data'} progres={true} />}
          {mSuccess && <ModalLoad title={'Signature Save'} progres={false} />}
          {mError && <ModalLoad title={'Failed sending'} progres={false} />}
          <View
            style={{
              width: width,
              height: 80,
              backgroundColor: '#64dfdf',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Add New Merchant</Text>
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
          <ScrollView scrollEnabled={scrollEnabled}>
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
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                    onChangeText={(text) => setValue({ ...value, merchant: text })}
                    value={value.merchant}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>Alamat Merchant</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                    onChangeText={(text) => setValue({ ...value, alamat: text })}
                    value={value.alamat}
                  />
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
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                    onChangeText={(text) => setValue({ ...value, pic: text })}
                    value={value.pic}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>No Telp</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                    onChangeText={(text) => setValue({ ...value, no_telp: text })}
                    value={value.no_telp}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>Kota</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                    onChangeText={(text) => setValue({ ...value, kota: text })}
                    value={value.kota}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text>Regional</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                    onChangeText={(text) => setValue({ ...value, regional: text })}
                    value={value.regional}
                  />
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
                    <TouchableOpacity onPress={() => handdleImage('bagianDepan')}>
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
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>Foto Bagian Dalam Merchant</Text>
                    <TouchableOpacity onPress={() => handdleImage('bagianDalam')}>
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
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Tanda tangan PIC</Text>
                    <View style={{ marginTop: 10, width: width - 40, height: 300 }}>
                      <Signature
                        onOK={changeSignature}
                        onEmpty={() => console.log('onEmpty')}
                        onBegin={() => setScrollEnabled(false)}
                        onEnd={() => setScrollEnabled(true)}
                        descriptionText="Sign"
                        clearText="Clear"
                        confirmText="Save"
                        webStyle={`.m-signature-pad--footer
                      .button {
                        background-color: red;
                        color: #FFF;
                      }`}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity onPress={() => sendData()}>
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
                  <Text>Proses</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomSheet ref={sheetRef} snapPoints={[0, 200]} borderRadius={10} renderContent={renderContent} />
    </>
  );
};

export default CreateScreen;
