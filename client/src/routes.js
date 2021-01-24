import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/users/Users'));
const Workorders = React.lazy(() => import('./views/workorder/Workorders'));
const Progress = React.lazy(() => import('./views/workorder/Progress'));
const Done = React.lazy(() => import('./views/workorder/Done'));
const RegisterUser = React.lazy(() => import('./views/register/RegisterUser'));
const RegisterVendor = React.lazy(() => import('./views/register/RegisterVendor'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/workorder/all', exact: true, name: 'All Workorders', component: Workorders },
  { path: '/workorder/progress', exact: true, name: 'Progress Workorders', component: Progress },
  { path: '/workorder/done', exact: true, name: 'Done Workorders', component: Done },
  { path: '/users/register', exact: true, name: 'Register User', component: RegisterUser },
  { path: '/register', exact: true, name: 'Register Vendor', component: RegisterVendor },
];

export default routes;
