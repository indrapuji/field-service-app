import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardList = (props) => {
  const { item } = props;
  const navigation = useNavigation();

  return (
    <View>
      <TouchableHighlight activeOpacity={0.6} underlayColor="#e3fdfd" onPress={() => navigation.navigate('DetailSurvey', { id: item.id })}>
        <View
          style={{
            ...styles.cardContainer,
            borderColor: '#ff577f',
          }}
        >
          <View style={styles.contentPosition}>
            <View style={styles.centerJustify}>
              <View style={styles.flexRow}>
                <Text style={styles.boldText}>{item.merchant}</Text>
              </View>
              <Text style={styles.alamatText} numberOfLines={3}>
                {item.alamat}
              </Text>
              <View>
                <Text style={styles.boldText}>{item.regional}</Text>
              </View>
              <Text>{item.no_telp}</Text>
              <Text>{item.createdAt}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default CardList;

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderLeftWidth: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 3,
    height: 130,
    width: width - 25,
  },
  contentPosition: {
    marginHorizontal: 15,
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
  alamatText: {
    marginRight: 50,
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
