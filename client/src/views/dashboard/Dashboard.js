import React, { lazy } from 'react';

import ChartWeeks from '../../components/ChartWeeks';
import ChartPie from '../../components/ChartPie';
import ChartTrafic from '../../components/ChartTraffic';

const WidgetsDropdown = lazy(() => import('../../components/WidgetsDropdown.js'));

const Dashboard = () => {
  console.log(localStorage.getItem('token'));
  return (
    <>
      <WidgetsDropdown />
      <ChartPie />
      <ChartWeeks />
      <ChartTrafic />
    </>
  );
};

export default Dashboard;
