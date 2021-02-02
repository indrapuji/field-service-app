import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Signature from 'react-native-signature-canvas';
import ModalLoad from '@components/ModalLoad';
import axios from 'axios';
import host from '@utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignScreen = ({ navigation, route }) => {
  const { bagianDepan, bagianDalam, depanMesin, EDCCompetitor, value, status } = route.params;
  const [mSuccess, setMSuccess] = useState(false);
  const [mError, setMError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignature = (sign) => {
    if (status === 'create') {
      sendCreate(sign);
    }
    if (status === 'update') {
      sendData(sign);
    }
  };

  const sendCreate = async (signature) => {
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
      setMSuccess(true);
      setTimeout(() => {
        setMSuccess(false);
        navigation.navigate(value.tipe);
      }, 2000);
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

  const sendData = async (signature) => {
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
      const foto_edc_1 = {
        uri: depanMesin,
        type: 'image/jpeg',
        name: 'foto_edc_1.jpg',
      };
      const foto_edc_2 = {
        uri: EDCCompetitor,
        type: 'image/jpeg',
        name: 'foto_edc_2.jpg',
      };
      var formData = new FormData();
      formData.append('jam_selesai_kerja', `${new Date()}`);
      if (bagianDepan) formData.append('foto_toko_1', foto_toko_1);
      if (bagianDalam) formData.append('foto_toko_2', foto_toko_2);
      if (depanMesin) formData.append('foto_edc_1', foto_edc_1);
      if (EDCCompetitor) formData.append('foto_edc_2', foto_edc_2);
      if (signature) formData.append('tanda_tangan', signature);
      for (let key in value) {
        if (key === 'edc_kompetitor') formData.append(`${key}`, JSON.stringify(value[key]));
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
      setMSuccess(true);
      setTimeout(() => {
        setMSuccess(false);
        navigation.navigate(value.tipe);
      }, 2000);
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

  const handleEmpty = () => {
    console.log('Empty');
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
  return (
    <View style={{ flex: 1 }}>
      {mError && <ModalLoad title={'Failed sending'} progres={false} />}
      {loading && <ModalLoad title={'sending data'} progres={true} />}
      {mSuccess && <ModalLoad title={'Record Data Success'} progres={false} />}
      <Signature onOK={handleSignature} onEmpty={handleEmpty} descriptionText="Sign" clearText="Clear" confirmText="Save" webStyle={style} />
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    width: 335,
    height: 114,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  previewText: {
    color: '#FFF',
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#69B2FF',
    width: 120,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignScreen;
