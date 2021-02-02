import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Dimensions } from 'react-native';

const ChartPie = (props) => {
  const { title, data } = props;
  return (
    <View style={{ margin: 10 }}>
      <PieChart
        data={[
          {
            name: 'Kunjungan',
            population: 5,
            color: '#80ffdb',
            legendFontColor: 'black',
            legendFontSize: 13,
          },
          {
            name: 'Sales Draft',
            population: 18,
            color: '#e9b0df',
            legendFontColor: 'black',
            legendFontSize: 13,
          },
          {
            name: 'OTS Survey',
            population: 12,
            color: '#ff577f',
            legendFontColor: 'black',
            legendFontSize: 13,
          },
          {
            name: 'Risk Unit',
            population: 15,
            color: '#6930c3',
            legendFontColor: 'black',
            legendFontSize: 13,
          },
        ]}
        width={Dimensions.get('screen').width - 40}
        height={150}
        chartConfig={{
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'10'}
        center={[10, 5]}
        absolute
        style={{
          marginVertical: 10,
          borderRadius: 20,
        }}
      />
    </View>
  );
};

export default ChartPie;
