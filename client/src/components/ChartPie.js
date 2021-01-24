import React from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';

const ChartPie = () => {
  return (
    <CCard>
      <CCardHeader>
        <h4 id="traffic" className="card-title mb-0">
          Total Work Orders
        </h4>
        <div className="small text-muted">Month / Januari 2021</div>
      </CCardHeader>

      <CCardBody>
        <CChartPie
          datasets={[
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: [1000, 500],
            },
          ]}
          labels={['Kunjungan', 'Pickup Sales Draft']}
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

export default ChartPie;
