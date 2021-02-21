import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Temperature from '../components/Temperature';
import NavSection from '../components/NavSection';
import GetLocation from 'react-native-get-location';

const HomeScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    latitude: '',
    longitude: '',
  });
  const [greet, setGreet] = useState(null);
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const getData = async () => {
    try {
      const nama = await AsyncStorage.getItem('userName');
      const pic = await AsyncStorage.getItem('userAvatar');
      if (nama !== null && pic !== null) {
        setName(nama);
        setAvatar(pic);
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
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#e3fdfd" />
      <SafeAreaView style={styles.bodyContainer}>
        <View style={styles.container}>
          <View style={styles.headersContainer}>
            <View style={styles.headersText}>
              <Text>{greet}</Text>
              <Text style={styles.headersName}>{name}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={{ uri: avatar }} style={styles.imgStyle} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Temperature longlat={value} />
              <View style={styles.sectionPosition}>
                <Text style={styles.sectionTitle}>Services</Text>
              </View>
              <View>
                <View style={styles.navContainer}>
                  <NavSection title={'Kunjungan Merchants'} iconName={'repeat'} color={'#80ffdb'} navto={'Kunjungan'} />
                  <NavSection title={'Pickup Sales Draft'} iconName={'files-o'} color={'#e9b0df'} navto={'Pickup'} />
                </View>
                <View style={styles.navContainer}>
                  <NavSection title={'OTS Survey'} iconName={'pencil-square-o'} color={'#ff577f'} navto={'Survey'} location={value} />
                  <NavSection title={'Risk Unit'} iconName={'check-square-o'} color={'#6930c3'} navto={'Risk'} />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#e3fdfd',
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#e3fdfd',
  },
  headersContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  headersText: {
    height: width / 8,
    justifyContent: 'space-around',
  },
  headersName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgStyle: {
    width: width / 8,
    height: width / 8,
    borderRadius: 25,
  },
  sectionContainer: {
    margin: 10,
    justifyContent: 'center',
    flex: 1,
  },
  sectionPosition: {
    marginLeft: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default HomeScreen;
