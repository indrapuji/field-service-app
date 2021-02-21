import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderCategory = (props) => {
  const { title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.weight}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#64dfdf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weight: {
    fontWeight: 'bold',
  },
});

export default HeaderCategory;
