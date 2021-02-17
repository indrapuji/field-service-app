import React, { useEffect, useState, lazy } from 'react';
import { CRow, CCol } from '@coreui/react';
import ChartWeeks from '../../components/ChartWeeks';
import ChartPie from '../../components/ChartPie';
import ChartTrafic from '../../components/ChartTraffic';
import ChartBars from '../../components/ChartBars';
import axios from 'axios';
import HostUrl from '../../components/HostUrl';

const WidgetsDropdown = lazy(() => import('../../components/WidgetsDropdown.js'));

const Dashboard = () => {
  const labelStatus = ['Assign', 'Progress', 'Done', 'Unassign'];
  const [status, setStatus] = useState({
    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
    data: [0, 0, 0, 0],
  });

  const labelTipe = ['Kunjungan', 'Pickup Sales Draft'];
  const [tipe, setTipe] = useState({
    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
    data: [0, 0],
  });
  useEffect(() => {
    getCountData();
    // eslint-disable-next-line
  }, []);
  const getCountData = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/job-orders/dashboard',
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      // setCountData(data.chartPie);
      setTipe({
        ...status,
        data: [data.chartPie.kunjungan_count, data.chartPie.pick_up_count],
      });
      setStatus({
        ...status,
        data: [2000, 1000, 500, 1500],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <WidgetsDropdown />
      <ChartBars />
      <CRow>
        <CCol sm="6" lg="6">
          <ChartPie title={'Work Orders Tipe'} dataSet={tipe} label={labelTipe} />
        </CCol>
        <CCol sm="6" lg="6">
          <ChartPie title={'Work Orders Status'} dataSet={status} label={labelStatus} />
        </CCol>
      </CRow>
      <ChartWeeks />
      <ChartTrafic />
    </>
  );
};

export default Dashboard;
