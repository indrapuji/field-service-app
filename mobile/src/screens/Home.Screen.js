import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChartBeziere from '../components/ChartBeziere';
import ChartPie from '../components/ChartPie';
import NavSection from '../components/NavSection';

const HomeScreen = ({ navigation }) => {
  const [greet, setGreet] = useState(null);
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [chartsKunjungan, setChartsKunjungan] = useState({
    title: 'Kunjungan Merchants',
    data: [8, 20, 15, 18, 15, 25],
  });
  const [chartsPickup, setChartsPickup] = useState({
    title: 'Pickup Sales Draft',
    data: [5, 10, 15, 8, 6, 12],
  });
  const [chartsSurvey, setChartsSurvey] = useState({
    title: 'OTS Survey',
    data: [5, 20, 13, 18, 6, 2],
  });
  const [chartsRisk, setChartsRisk] = useState({
    title: 'Risk Unit',
    data: [8, 10, 3, 8, 4, 2],
  });

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
              <View style={styles.sectionPosition}>
                <Text style={styles.sectionTitle}>Services</Text>
              </View>
              <View style={styles.navContainer}>
                <NavSection title={'Kunjungan Merchants'} iconName={'repeat'} color={'#80ffdb'} navto={'Kunjungan'} />
                <NavSection title={'Pickup Sales Draft'} iconName={'files-o'} color={'#e9b0df'} navto={'Pickup'} />
              </View>
              <View style={styles.navContainer}>
                <NavSection title={'OTS Survey'} iconName={'pencil-square-o'} color={'#ff577f'} navto={'Survey'} />
                <NavSection title={'Risk Unit'} iconName={'check-square-o'} color={'#6930c3'} navto={'Risk'} />
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionPosition}>
                <Text style={styles.sectionTitle}>Activity</Text>
              </View>
              <ChartPie />
              <ChartBeziere title={chartsKunjungan.title} data={chartsKunjungan.data} color={'#80ffdb'} />
              <ChartBeziere title={chartsPickup.title} data={chartsPickup.data} color={'#e9b0df'} />
              <ChartBeziere title={chartsSurvey.title} data={chartsSurvey.data} color={'#ff577f'} />
              <ChartBeziere title={chartsRisk.title} data={chartsRisk.data} color={'#6930c3'} />
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
  },
  sectionPosition: {
    marginLeft: 10,
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
