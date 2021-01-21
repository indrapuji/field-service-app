import React from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const ModalLoad = (props) => {
  const { title, progres } = props;
  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.titlePosition}>
            <Text style={styles.title}>{title}</Text>
            {progres && (
              <View style={styles.loadMargin}>
                <ActivityIndicator size="large" color="black" />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
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
  titlePosition: {
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  loadMargin: {
    marginTop: 20,
  },
});

export default ModalLoad;
