import React, { useState, useContext } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@module/auth/assets/styles';
import axios from 'axios';
import host from '../../../utilities/host';

import { AuthContext } from '../../../components/utilities/Context';

const AuthScreen = () => {
  const [value, setValue] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  const { signIn } = useContext(AuthContext);

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
    // signIn(username, password);
    setLoading(true);
    console.log('Sebelum login');
    axios({
      method: 'post',
      url: `${host}/users/login`,
      data: {
        email: username,
        password: password,
        tipe: 'Teknisi',
      },
    })
      .then(({ data }) => {
        console.log('Setelah Login then');
        setLoading(false);
        signIn(data.access_token);
      })
      .catch((err) => {
        console.log('Setelah Login catch');
        setLoading(false);
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
          </View>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={true}>
          <View style={styles.contentPosition}>
            <View style={styles.inputPosition}>
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
              <View style={{ marginLeft: 10, marginBottom: 10 }}>
                {failed && (
                  <Text style={{ color: 'red', fontSize: 15 }}>Username atau Password Salah</Text>
                )}
              </View>
              <View>
                {loading ? (
                  <View style={styles.buttonSize}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.buttonSize}
                    onPress={() => loginHanddle(value.username, value.password)}
                  >
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

export default AuthScreen;
