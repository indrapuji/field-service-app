import React from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import BottomTab from '../../../components/utilities/BottomTab';
import { AccordionList } from 'accordion-collapse-react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const list = [
    {
      id: 1,
      title: 'PM',
      body: [
        {
          jo: 'work 1',
          status: 'assign',
        },
        {
          jo: 'work 2',
          status: 'assign',
        },
      ],
    },
    {
      id: 2,
      title: 'CM',
      body: [
        {
          jo: 'work 3',
          status: 'assign',
        },
        {
          jo: 'work 4',
          status: 'assign',
        },
      ],
    },
    {
      id: 3,
      title: 'Supply',
      body: [
        {
          jo: 'work 5',
          status: 'assign',
        },
        {
          jo: 'work 6',
          status: 'assign',
        },
      ],
    },
  ];

  const head = (item) => {
    return (
      <View
        style={{
          height: 40,
          // justifyContent: 'space-between',
          // flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: '#576528',
          borderTopWidth: 0.5,
        }}
      >
        <Text>{item.title}</Text>
        {/* <Icon name={'chevron-down'} size={20} /> */}
      </View>
    );
  };

  const body = (item) => {
    return (
      <View>
        {item.body.map((data, idx) => {
          return (
            <View key={idx} style={{ padding: 10 }}>
              <TouchableOpacity onPress={() => console.log(data.jo)}>
                <Text>{data.jo}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        hidden={false}
        backgroundColor="white"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#84ccf7' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <AccordionList
                list={list}
                header={head}
                body={body}
                keyExtractor={(item) => `${item.id}`}
              />
            </View>
          </View>
          <BottomTab item={'home'} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
