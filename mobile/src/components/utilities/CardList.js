import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardList = (props) => {
  const { list } = props;
  const navigation = useNavigation();

  const handdleDetail = (itemData) => {};
  return (
    <View>
      {list && list.length > 0 ? (
        list.map((item, idx) => {
          return (
            <TouchableOpacity key={idx} onPress={() => handdleDetail(item)}>
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
});
