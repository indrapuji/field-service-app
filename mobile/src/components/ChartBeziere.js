import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, Dimensions } from 'react-native';

const ChartBeziere = (props) => {
  const { title, data, color } = props;
  return (
    <View style={{ margin: 10 }}>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('screen').width - 40} // from react-native
        height={220}
        yAxisLabel=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: color,
          backgroundGradientTo: color,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 20,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '1',
            stroke: 'black',
          },
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
      <Text style={{ textAlign: 'center' }}>{title}</Text>
    </View>
  );
};

export default ChartBeziere;
