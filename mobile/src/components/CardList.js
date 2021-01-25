import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import host from '../utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardList = (props) => {
  const { list, source, done } = props;
  const [showModal, setShowModal] = useState(false);
  const [merchantName, setMerchantName] = useState('');
  const [newDataID, setNewDataID] = useState('');
  const navigation = useNavigation();

  const openModal = (dataID, dataName) => {
    setMerchantName(dataName);
    setNewDataID(dataID);
    setShowModal(true);
  };

  const changeStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'put',
        url: `${host}/job-orders/change-status/${newDataID}`,
        data: { status: 'Progres' },
        headers: { token },
      });
      setShowModal(false);
      props.update(newDataID);
    } catch (err) {
      console.log(err);
    }
  };

  const handdleDetail = (itemData) => {
    navigation.navigate('Detail', { itemData });
  };

  return (
    <View>
      {list && list.length > 0 ? (
        list.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => (source !== 'done' ? handdleDetail(item) : null)}
              onLongPress={() =>
                source === 'home' ? openModal(item.id, item.nama_merchant) : null
              }
            >
              <View
                style={{
                  ...styles.cardContainer,
                  borderColor: item.tipe === 'Kunjungan' ? 'green' : 'orange',
                  borderTopWidth: idx === 0 ? 1 : 0,
                }}
              >
                <View style={styles.contentPosition}>
                  <View style={styles.centerJustify}>
                    <View
                      style={{
                        ...styles.borderStatus,
                        borderColor: item.tipe === 'Kunjungan' ? 'green' : 'orange',
                        backgroundColor: item.tipe === 'Pickup' ? 'orange' : 'white',
                      }}
                    >
                      <Text
                        style={{
                          ...styles.boldText,
                          color: item.tipe === 'Pickup' ? 'white' : 'black',
                        }}
                      >
                        {item.tipe === 'Kunjungan' ? 'K' : 'P'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.centerJustify}>
                    <View style={styles.flexRow}>
                      <Text style={styles.boldText}>{item.nama_merchant}</Text>
                    </View>
                    <Text>{item.alamat_merchant}</Text>
                    <Text>{item.nama_bank}</Text>
                    <View style={styles.flexRow}>
                      <Text>TID: {item.serial_number}</Text>
                      <View style={styles.dotted}>
                        <Icon name="circle" size={8} />
                      </View>
                      <Text>MID: {item.mid}</Text>
                    </View>
                    <Text>Keterangan: {item.keterangan}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.noText}>No Data</Text>
      )}
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.merchantTitle}>{merchantName}</Text>
              <Text>Change Status to Progress</Text>
            </View>
            <View style={styles.buttonPosition}>
              <TouchableOpacity onPress={() => changeStatus()}>
                <View
                  style={{
                    ...styles.modalButton,
                    backgroundColor: '#80ffdb',
                  }}
                >
                  <Text>Ya</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <View
                  style={{
                    ...styles.modalButton,
                    backgroundColor: '#64dfdf',
                  }}
                >
                  <Text>Tidak</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardList;

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderLeftWidth: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  contentPosition: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 10,
  },
  centerJustify: {
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: 'bold',
  },
  dotted: {
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  borderStatus: {
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  noText: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 35,
    width: width - 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  merchantTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonPosition: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginHorizontal: 20,
  },
  modalButton: {
    width: 80,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
