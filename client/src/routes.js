import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/pages/users/Users'));
const Workorders = React.lazy(() => import('./views/pages/workorder/Workorders'));
const Progress = React.lazy(() => import('./views/pages/workorder/Progress'));
const Done = React.lazy(() => import('./views/pages/workorder/Done'));
const WOKunjungan = React.lazy(() => import('./views/pages/workorder/kunjungan/Workorders'));
const WOKunjunganProgress = React.lazy(() => import('./views/pages/workorder/kunjungan/Progress'));
const WOKunjunganDone = React.lazy(() => import('./views/pages/workorder/kunjungan/Done'));
const WOPickup = React.lazy(() => import('./views/pages/workorder/pickup/Workorders'));
const WOPickupProgress = React.lazy(() => import('./views/pages/workorder/pickup/Progress'));
const WOPickupDone = React.lazy(() => import('./views/pages/workorder/pickup/Done'));
const WOSurvey = React.lazy(() => import('./views/pages/workorder/survey/Workorders'));
const WOSurveyProgress = React.lazy(() => import('./views/pages/workorder/survey/Progress'));
const WOSurveyDone = React.lazy(() => import('./views/pages/workorder/survey/Done'));
const WORisk = React.lazy(() => import('./views/pages/workorder/risk/Workorders'));
const WORiskProgress = React.lazy(() => import('./views/pages/workorder/risk/Progress'));
const WORiskDone = React.lazy(() => import('./views/pages/workorder/risk/Done'));
const RegisterUser = React.lazy(() => import('./views/pages/register/RegisterUser'));
const RegisterVendor = React.lazy(() => import('./views/pages/register/RegisterVendor'));
const RegisterMerchant = React.lazy(() => import('./views/pages/register/RegisterMerchant'));
const Vendors = React.lazy(() => import('./views/pages/vendor/Vendors'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/create', exact: true, name: 'Register User', component: RegisterUser },
  { path: '/vendors', exact: true, name: 'Vendors', component: Vendors },
  { path: '/vendors/create', exact: true, name: 'Register Vendor', component: RegisterVendor },
  { path: '/workorders/all', exact: true, name: 'All Workorders', component: Workorders },
  { path: '/workorders/progress', exact: true, name: 'Progress Workorders', component: Progress },
  { path: '/workorders/done', exact: true, name: 'Done Workorders', component: Done },
  { path: '/workorders/kunjungan/all', exact: true, name: 'Kunjungan', component: WOKunjungan },
  { path: '/workorders/kunjungan/progress', exact: true, name: 'Kunjungan Progress', component: WOKunjunganProgress },
  { path: '/workorders/kunjungan/done', exact: true, name: 'Kunjungan Done', component: WOKunjunganDone },
  { path: '/workorders/pickup/all', exact: true, name: 'Pickup', component: WOPickup },
  { path: '/workorders/pickup/progress', exact: true, name: 'Pickup Progress', component: WOPickupProgress },
  { path: '/workorders/pickup/done', exact: true, name: 'Pickup Done', component: WOPickupDone },
  { path: '/workorders/survey/all', exact: true, name: 'Survey', component: WOSurvey },
  { path: '/workorders/survey/progress', exact: true, name: 'Survey Progress', component: WOSurveyProgress },
  { path: '/workorders/survey/done', exact: true, name: 'Survey Done', component: WOSurveyDone },
  { path: '/workorders/risk/all', exact: true, name: 'Risk', component: WORisk },
  { path: '/workorders/risk/progress', exact: true, name: 'Risk Progress', component: WORiskProgress },
  { path: '/workorders/risk/done', exact: true, name: 'Risk Done', component: WORiskDone },
  { path: '/workorders/create', exact: true, name: 'Register Merchant', component: RegisterMerchant },
];

export default routes;
