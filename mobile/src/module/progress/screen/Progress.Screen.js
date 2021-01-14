import React from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import BottomTab from '../../../components/utilities/BottomTab';
import { AccordionList } from 'accordion-collapse-react-native';

const ProgressScreen = () => {
  const list = [
    {
      id: 1,
      title: 'IN PROGRESS',
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
  ];

  const head = (item) => {
    return (
      <View
        style={{
          height: 40,
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: '#576528',
          borderTopWidth: 0.5,
        }}
      >
        <Text>{item.title}</Text>
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
            <AccordionList
              list={list}
              header={head}
              body={body}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
          <BottomTab item={'progress'} />
        </View>
      </SafeAreaView>
      {/* AIzaSyCs_bB-2udMHh_61slOxc-EhPe9uc3DxSA */}
    </>
  );
};

export default ProgressScreen;
