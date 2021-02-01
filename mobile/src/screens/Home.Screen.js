import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/images/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '@components/Context';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  // const { signOut } = useContext(AuthContext);
  const [greet, setGreet] = useState(null);
  const [name, setName] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value !== null) {
        setName(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // signOut();
    getData();
    var time = new Date().getHours();
    if (time < 10) {
      setGreet('Good Morning!');
    } else if (time < 20) {
      setGreet('Good Afternoon!');
    } else {
      setGreet('Good Evening!');
    }
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" hidden={false} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#84ccf7' }}>
        <View style={styles.container}>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                height: width / 8,
                justifyContent: 'space-around',
              }}
            >
              <Text>{greet}</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={logo} style={{ width: width / 8, height: width / 8 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Kunjungan')}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: useWidth / 2 - 10,
                    height: useWidth / 2 - 10,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ padding: 20 }}>
                    <Icon name="repeat" size={50} />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginHorizontal: 10,
                    }}
                  >
                    Kunjungan Merchants
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Pickup')}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: useWidth / 2 - 10,
                    height: useWidth / 2 - 10,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ padding: 20 }}>
                    <Icon name="files-o" size={50} />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginHorizontal: 10,
                    }}
                  >
                    Pickup Sales Draft
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Survey')}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: useWidth / 2 - 10,
                    height: useWidth / 2 - 10,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ padding: 20 }}>
                    <Icon name="pencil-square-o" size={50} />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginHorizontal: 10,
                    }}
                  >
                    OTS Survey
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Risk')}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: useWidth / 2 - 10,
                    height: useWidth / 2 - 10,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ padding: 20 }}>
                    <Icon name="check-square-o" size={50} />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginHorizontal: 10,
                    }}
                  >
                    Risk Unit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const { height, width } = Dimensions.get('window');
const useHeight = Dimensions.get('screen').height;
const useWidth = width - 40;

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#84ccf7',
  },
  content: {
    position: 'absolute',
    bottom: 100,
  },
  headerText: {
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
});

export default HomeScreen;
