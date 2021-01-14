import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@module/auth/assets/styles';

const AuthScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const seePass = () => {
    setShow(!show);
  };
  const loginCheck = () => {
    setLoading(true);
    if (value.username === 'indra' && value.password === 'indra') {
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Home');
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 2000);
    }
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
              <View>
                {loading ? (
                  <View style={styles.buttonSize}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                ) : (
                  <TouchableOpacity style={styles.buttonSize} onPress={() => loginCheck()}>
                    <Text style={styles.buttonText}>Get Access</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      <Modal animationType="fade" transparent visible={showModal}>
        <View style={styles.modalPosition}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Username atau Password salah </Text>
            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
              <View style={styles.modalButton}>
                <Text style={styles.textStyle}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AuthScreen;
