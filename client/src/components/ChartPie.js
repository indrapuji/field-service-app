import React from 'react'; // useEffect, useState
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
// import axios from 'axios';
// import { HostUrl } from '../reusable';

// import token from '../views/token';

const ChartPie = (props) => {
  // const [countData, setCountData] = useState(null);
  // const [dataSet, setDataSet] = useState({
  //   backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
  //   data: [0, 0],
  // });
  // useEffect(() => {
  //   getCountData();
  //   // eslint-disable-next-line
  // }, []);
  // const getCountData = async () => {
  //   try {
  //     const { data } = await axios({
  //       method: 'GET',
  //       url: HostUrl + '/job-orders/dashboard',
  //       headers: {
  //         token,
  //       },
  //     });
  //     // setCountData(data.chartPie);
  //     setDataSet({
  //       ...dataSet,
  //       data: [data.chartPie.kunjungan_count, data.chartPie.pick_up_count],
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const { title, dataSet, label } = props;
  return (
    <CCard>
      <CCardHeader>
        <h4 id="traffic" className="card-title mb-0">
          {title}
        </h4>
        <div className="small text-muted">Month / Januari 2021</div>
      </CCardHeader>

      <CCardBody>
        <CChartPie
          datasets={[dataSet]}
          labels={label}
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
