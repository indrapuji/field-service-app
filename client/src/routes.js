import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/pages/users/Users'));
const Workorders = React.lazy(() => import('./views/pages/workorder/Workorders'));
const Progress = React.lazy(() => import('./views/pages/workorder/Progress'));
const Done = React.lazy(() => import('./views/pages/workorder/Done'));
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
  {
    path: '/workorders/create',
    exact: true,
    name: 'Register Merchant',
    component: RegisterMerchant,
  },
];

export default routes;
