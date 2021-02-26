import React, { useEffect, useState } from 'react';
import { CRow, CCol, CWidgetDropdown } from '@coreui/react';
import ChartWeeks from '../../components/ChartWeeks';
import ChartPie from '../../components/ChartPie';
import ChartTrafic from '../../components/ChartTraffic';
import ChartBars from '../../components/ChartBars';
import axios from 'axios';
import HostUrl from '../../components/HostUrl';

// const WidgetsDropdown = lazy(() => import('../../components/WidgetsDropdown.js'));

const Dashboard = () => {
  const Kunjungan = '#80ffdb';
  const Pickup = '#e9b0df';
  const Survey = '#ff577f';
  const Risk = '#6930c3';
  const [dashboardData, setDashboardData] = useState({});
  const labelStatus = ['Assign', 'Progress', 'Done', 'Unassign'];
  const [status, setStatus] = useState({
    backgroundColor: ['#00D8FF', '#E46651', '#41B883', '#DD1B16'],
    data: [0, 0, 0, 0],
  });

  const labelTipe = ['Kunjungan', 'Pickup Sales Draft', 'OTS Survey', 'Risk Unit'];
  const [tipe, setTipe] = useState({
    backgroundColor: [Kunjungan, Pickup, Survey, Risk],
    data: [],
  });

  useEffect(() => {
    getDashboardData();
    // eslint-disable-next-line
  }, []);

  const getDashboardData = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/dashboard/home',
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setDashboardData(data);
      setTipe({
        ...tipe,
        data: [data.jobOrderKunjunganTipeCount, data.jobOrderPickupTipeCount, data.jobOrderRiskCountTipe, data.jobOrderSurveyCountTipe],
      });
      setStatus({
        ...status,
        data: [data.jobOrderAssignStatusCount, data.jobOrderProgresStatusCount, data.jobOrderDoneStatusCount, data.jobOrderUnassignStatusCount],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderWidget = () => {
    const widgetColor = [
      {
        header: `${dashboardData.jobOrderKunjunganCount ? dashboardData.jobOrderKunjunganCount : 0}`,
        text: 'Kunjungan',
        color: 'Kunjungan',
      },
      {
        header: `${dashboardData.jobOrderPickupCount ? dashboardData.jobOrderPickupCount : 0}`,
        text: 'Pickup Sales Draft',
        color: 'Pickup',
      },
      {
        header: `${dashboardData.jobOrderSurveyCount ? dashboardData.jobOrderSurveyCount : 0}`,
        text: 'OTS Survey',
        color: 'Survey',
      },
      {
        header: `${dashboardData.jobOrderRiskCount ? dashboardData.jobOrderRiskCount : 0}`,
        text: 'Risk Unit',
        color: 'Risk',
      },
    ];
    const result = widgetColor.map((data, idx) => {
      let { header, text, color } = data;
      return (
        <CCol sm="6" lg="3" key={idx}>
          <CWidgetDropdown color={color} header={header} text={text} footerSlot={<div style={{ height: 50 }} />} />
        </CCol>
      );
    });
    return result;
  };

  return (
    <>
      {/* <WidgetsDropdown /> */}
      {dashboardData && (
        <>
          <CRow>{renderWidget()}</CRow>
          <ChartBars data={dashboardData.allRegional} />
          <CRow>
            <CCol sm="6" lg="6">
              <ChartPie title={'Work Orders Tipe'} dataSet={tipe} label={labelTipe} dateData={dashboardData.dateData} />
            </CCol>
            <CCol sm="6" lg="6">
              <ChartPie title={'Work Orders Status'} dataSet={status} label={labelStatus} dateData={dashboardData.dateData} />
            </CCol>
          </CRow>
          <ChartWeeks
            dataChart={dashboardData.dayNames}
            dateData={dashboardData.dateData}
            jobOrderKunjunganCountProgress={dashboardData.jobOrderKunjunganCountProgress}
            jobOrderPickupCountProgress={dashboardData.jobOrderPickupCountProgress}
            jobOrderSurveyCountProgress={dashboardData.jobOrderSurveyCountProgress}
            jobOrderRiskCountProgress={dashboardData.jobOrderRiskCountProgress}
          />
          <ChartTrafic
            trafficData={dashboardData.traffic}
            merchantBuka={dashboardData.merchantBuka}
            merchantTutup={dashboardData.merchantTutup}
            merchantTetap={dashboardData.merchantTetap}
            merchantPindah={dashboardData.merchantPindah}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
