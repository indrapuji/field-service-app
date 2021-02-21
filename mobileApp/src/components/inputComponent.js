import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputComponent = (props) => {
  const { lable, value, onChangeText, editable, multiline } = props;
  return (
    <View style={styles.marginInput}>
      <Text>{lable}</Text>
      <TextInput style={styles.inputSize} onChangeText={onChangeText} value={value} editable={editable} multiline={multiline} />
    </View>
  );
};

const styles = StyleSheet.create({
  marginInput: {
    marginTop: 20,
  },
  inputSize: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default InputComponent;
