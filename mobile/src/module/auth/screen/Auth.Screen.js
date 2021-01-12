import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@module/auth/assets/styles';

const AuthScreen = () => {
  const [value, setValue] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const seePass = () => {
    setShow(!show);
  };
  const loginCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" hidden={false} />
      <View style={styles.background}>
        {loading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.container}></View>
        )}

        <View style={styles.loginLogo}>
          <Image source={require('@assets/images/trendcom-logo.png')} style={styles.logoSize} />
        </View>

        <View style={styles.textMargin}>
          <Text style={styles.textTitle}>Field Service Application</Text>
        </View>
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
              <TouchableOpacity style={styles.buttonSize} onPress={() => loginCheck()}>
                <Text style={styles.buttonText}>Get Access</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default AuthScreen;
