import React, { useEffect, useState } from 'react'; // useEffect, useState
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';

const ChartBars = (props) => {
  const { data } = props;
  const [dataChart, setDataChart] = useState({
    data: [],
    labels: []
  });
  useEffect(() => {
    if (data) {
      const labelsTemp = data.map(data => data.regional);
      const dataTemp = data.map(data => data.count);
      setDataChart({
        data: dataTemp,
        labels: labelsTemp
      });
    }
  }, [data]);
  return (
    <CCard>
      <CCardHeader>Regional</CCardHeader>
      <CCardBody>
        <CChartBar
          datasets={[
            {
              label: 'Jumlah',
              backgroundColor: '#f9b115',
              data: dataChart.data,
            },
          ]}
          labels={dataChart.labels}
          options={{
            tooltips: {
              enabled: true,
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};

export default ChartBars;
