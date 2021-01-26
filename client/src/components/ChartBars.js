import React from 'react'; // useEffect, useState
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';

const ChartBars = () => {
  return (
    <CCard>
      <CCardHeader>Regional</CCardHeader>
      <CCardBody>
        <CChartBar
          datasets={[
            {
              label: 'Jumlah',
              backgroundColor: '#f9b115',
              data: [400, 200, 120, 390, 200, 400, 390],
            },
          ]}
          labels={['Jakarta', 'Jogjakarta', 'Bali', 'Medan', 'Surabaya', 'Semarang', 'Bandung']}
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
