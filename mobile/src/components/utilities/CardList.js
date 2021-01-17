import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import host from '../../utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');
const CardList = (props) => {
  const { list, source } = props;
  const [showModal, setShowModal] = useState(false);
  const [merchantName, setmerchantName] = useState('');
  const navigation = useNavigation();

  const changeStatus = async (dataID, dataName) => {
    // getData();

    try {
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'put',
        url: `${host}/job-orders/change-status/${dataID}`,
        data: { status: 'Progres' },
        headers: { token },
      });
      console.log(data);
      setmerchantName(dataName);
      props.update(dataID);
    } catch (err) {
      console.log(err);
    }
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  const handdleDetail = (itemData) => {};
  return (
    <View>
      {list && list.length > 0 ? (
        list.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handdleDetail(item)}
              onLongPress={() => (source ? changeStatus(item.id, item.nama_merchant) : null)}
            >
              <View
                style={{
                  ...styles.cardContainer,
                  borderColor: item.type === 'PM' ? 'green' : 'orange',
                }}
              >
                <View style={styles.contentPosition}>
                  <View style={styles.centerJustify}>
                    <View style={styles.flexRow}>
                      <Text style={styles.boldText}>{item.nama_merchant}</Text>
                    </View>
                    <Text>{item.alamat_merchant}</Text>
                    <View style={styles.flexRow}>
                      <Text>TID {item.serial_number}</Text>
                      <View style={styles.dotted}>
                        <Icon name="circle" size={8} />
                      </View>
                      <Text>MID {item.mid}</Text>
                    </View>
                  </View>
                  <View style={styles.centerJustify}>
                    <View
                      style={[
                        styles.borderStatus,
                        {
                          borderColor: item.tipe === 'PM' ? 'green' : 'orange',
                          backgroundColor: item.tipe === 'CM' ? 'orange' : 'white',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.boldText,
                          {
                            color: item.tipe === 'CM' ? 'white' : 'black',
                          },
                        ]}
                      >
                        {item.tipe}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.noText}>No Data</Text>
      )}
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'black' }}>{merchantName} Status Change</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderLeftWidth: 10,
  },
  contentPosition: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
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
    padding: 10,
    borderRadius: 10,
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
});
