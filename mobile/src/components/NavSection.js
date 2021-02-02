import React from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const useWidth = width - 40;

const NavSection = (props) => {
  const navigation = useNavigation();
  const { title, color, iconName, navto, location } = props;
  return (
    <TouchableHighlight activeOpacity={0.6} underlayColor="#e3fdfd" onPress={() => navigation.navigate(navto, { location })}>
      <View
        style={{
          backgroundColor: color,
          width: useWidth / 2 - 10,
          height: useWidth / 2 - 10,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ padding: 20 }}>
          <Icon name={iconName} color="white" size={50} />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginHorizontal: 10,
            color: 'white',
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default NavSection;
