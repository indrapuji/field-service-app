import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacityBase,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('screen');
const CardList = (props) => {
  const { list } = props;
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');
  const navigation = useNavigation();

  const openModal = (data) => {
    setStatus(data.status);
    setShowModal(true);
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
              onLongPress={() => openModal(item)}
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
                    <Text>{item.alamat}</Text>
                    <View style={styles.flexRow}>
                      <Text>TID {item.TID}</Text>
                      <View style={styles.dotted}>
                        <Icon name="circle" size={8} />
                      </View>
                      <Text>MID {item.MID}</Text>
                    </View>
                  </View>
                  <View style={styles.centerJustify}>
                    <View
                      style={[
                        styles.borderStatus,
                        {
                          borderColor: item.type === 'PM' ? 'green' : 'orange',
                          backgroundColor: item.type === 'CM' ? 'orange' : 'white',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.boldText,
                          {
                            color: item.type === 'CM' ? 'white' : 'black',
                          },
                        ]}
                      >
                        {item.type}
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
              <Text style={{ color: 'black' }}>{status}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <View
                  style={{
                    backgroundColor: 'green',
                    borderRadius: 20,
                    height: 50,
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                </View>
              </View>
            </TouchableOpacity>
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
