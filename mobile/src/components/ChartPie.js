import React from 'react';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
import { View, Text, Dimensions } from 'react-native';

const ChartPie = (props) => {
  const { title, data } = props;
  return (
    <View style={{ margin: 10 }}>
      <PieChart
        data={[
          {
            name: 'Kunjungan',
            population: 5,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: 'black',
            legendFontSize: 13,
          },
          {
            name: 'Sales Draft',
            population: 18,
            color: '#F00',
            legendFontColor: 'black',
            legendFontSize: 13,
          },
          {
            name: 'OTS Survey',
            population: 12,
            color: 'blue',
            legendFontColor: 'black',
            legendFontSize: 13,
          },
          {
            name: 'Risk Unit',
            population: 15,
            color: '#ffffff',
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