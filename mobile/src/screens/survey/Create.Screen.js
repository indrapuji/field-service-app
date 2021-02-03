import React, { useState, useRef, useEffect } from 'react';
import { StatusBar, SafeAreaView, View, Text, Dimensions, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalLoad from '@components/ModalLoad';
import * as ImagePicker from 'react-native-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';

const { width } = Dimensions.get('screen');

const CreateScreen = ({ navigation, route }) => {
  const { location } = route.params;
  const [value, setValue] = useState({
    merchant: '',
    alamat: '',
    kota: '',
    regional: '',
    pic: '',
    no_telp: '',
    latitude: '',
    longitude: '',
    tipe: '',
  });
  const [bagianDepan, setBagianDepan] = useState(null);
  const [bagianDalam, setBagianDalam] = useState(null);
  const [mSuccess, setMSuccess] = useState(false);
  const [mError, setMError] = useState(false);
  const [imageStatus, setImageStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const sheetRef = useRef(null);

  useEffect(() => {
    setValue({ ...value, latitude: location.latitude, longitude: location.longitude, tipe: 'Survey' });
  }, []);

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

  const sendData = () => {
    navigation.navigate('Signature', { bagianDepan, bagianDalam, value, status: 'create' });
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
