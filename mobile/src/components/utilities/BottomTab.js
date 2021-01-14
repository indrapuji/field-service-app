import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomTab = (props) => {
  const { item } = props;
  const navigation = useNavigation();
  return (
    <View style={{ height: 50, backgroundColor: '#84ccf7', flexDirection: 'row' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" color={item === 'home' ? 'black' : 'white'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
          <Icon name="refresh" color={item === 'progress' ? 'black' : 'white'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Done')}>
          <Icon name="check" color={item === 'done' ? 'black' : 'white'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user-o" color={item === 'profile' ? 'black' : 'white'} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTab;
