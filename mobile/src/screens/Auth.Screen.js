import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import host from '@utilities/host';
import GetLocation from 'react-native-get-location';

import { AuthContext } from '@components/Context';

const AuthScreen = () => {
  const [value, setValue] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);
  const [failText, setFailText] = useState('');

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location.latitude, location.longitude);
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code, message);
      });
  }, []);

  const seePass = () => {
    setShow(!show);
  };

  const failLogin = () => {
    setFailed(true);
    setTimeout(() => {
      setFailed(false);
    }, 2000);
  };

  const loginHanddle = (username, password) => {
    setLoading(true);
    axios({
      method: 'post',
      url: `${host}/users/login`,
      data: {
        email: username,
        password: password,
      },
    })
      .then(({ data }) => {
        setLoading(false);
        if (data.userData.tipe === 'Teknisi') {
          signIn(data.access_token, data.userData.nama_lengkap, data.userData.foto_profil);
        } else {
          setFailText('Not Authorize');
          failLogin();
        }
      })
      .catch((err) => {
        setLoading(false);
        setFailText('Username atau Password Salah');
        failLogin();
        console.log(err);
      })
      .finally(() => {
        console.log('Finally');
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#84ccf7" />
      <ImageBackground style={styles.background} source={require('@assets/images/background.jpg')}>
        <View style={styles.loginLogo}>
          <Image source={require('@assets/images/trendcom-logo.png')} style={styles.logoSize} />
          <View style={styles.textMargin}>
            <Text style={styles.textTitle}>Field Service Application</Text>
            <Text style={styles.textVersi}>Versi 1.0.0</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={true}>
          <View style={styles.contentPosition}>
            <View style={styles.inputPosition}>
              <View style={{ marginLeft: 10, marginBottom: 10 }}>{failed && <Text style={{ color: 'red', fontSize: 15 }}>{failText}</Text>}</View>
              <View>
                <TextInput
                  placeholder="Enter Username"
                  autoCapitalize="none"
                  value={value.username}
                  onChangeText={(text) => setValue({ ...value, username: text })}
                  style={styles.inputSize}
                />
              </View>
              <View style={{ position: 'relative' }}>
                <TextInput
                  placeholder="Enter Password"
                  secureTextEntry={!show ? true : false}
                  autoCapitalize="none"
                  value={value.password}
                  onChangeText={(text) => setValue({ ...value, password: text })}
                  style={{ ...styles.inputSize, paddingRight: 50 }}
                />
                <View style={styles.eyeIcon}>
                  <TouchableOpacity onPress={() => seePass()}>
                    <Icon name={show ? 'eye' : 'eye-slash'} size={25} />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                {loading ? (
                  <View style={styles.buttonSize}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                ) : (
                  <TouchableOpacity style={styles.buttonSize} onPress={() => loginHanddle(value.username, value.password)}>
                    <Text style={styles.buttonText}>Get Access</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  loginLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSize: {
    width: 250,
  },
  contentPosition: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  textMargin: {
    alignItems: 'center',
    marginTop: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textVersi: {
    fontSize: 13,
    color: 'red',
  },
  inputSize: {
    width: width / 1.12,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inputPosition: {
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    top: 13,
    right: 20,
  },
  buttonSize: {
    width: width / 1.12,
    height: 50,
    backgroundColor: '#3528e9',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    justifyContent: 'center',
  },
});

export default AuthScreen;
