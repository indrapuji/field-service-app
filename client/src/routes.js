import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Users = React.lazy(() => import('./views/pages/users/Users'));
const RegisterUser = React.lazy(() => import('./views/pages/users/RegisterUser'));
const EditUser = React.lazy(() => import('./views/pages/users/EditUser'));
const AssignUser = React.lazy(() => import('./views/pages/users/AssignUser'));

const Vendors = React.lazy(() => import('./views/pages/vendor/Vendors'));
const RegisterVendor = React.lazy(() => import('./views/pages/vendor/RegisterVendor'));
const EditVendor = React.lazy(() => import('./views/pages/vendor/EditVendor'));
const Workorders = React.lazy(() => import('./views/pages/workorder/Workorders'));
const WorkordersImport = React.lazy(() => import('./views/pages/workorder/ImportWorkorders'));
const WorkordersCreate = React.lazy(() => import('./views/pages/workorder/RegisterWorkorders'));
const WorkordersAssign = React.lazy(() => import('./views/pages/workorder/AssignWorkorders'));
const WorkordersDone = React.lazy(() => import('./views/pages/workorder/Done'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/create', exact: true, name: 'Register User', component: RegisterUser },
  { path: '/users/edit/:userId', exact: true, name: 'Edit User', component: EditUser },
  { path: '/users/assign/:userId', exact: true, name: 'Assign Workorders', component: AssignUser },
  { path: '/vendors', exact: true, name: 'Vendors', component: Vendors },
  { path: '/vendors/create', exact: true, name: 'Register Vendor', component: RegisterVendor },
  { path: '/vendors/edit/:vendorId', exact: true, name: 'Edit Vendor', component: EditVendor },
  { path: '/workorders/all', exact: true, name: 'All Workorders', component: Workorders },
  { path: '/workorders/create', exact: true, name: 'Register Merchant', component: WorkordersCreate },
  { path: '/workorders/import', exact: true, name: 'Import WorkOrder', component: WorkordersImport },
  { path: '/workorders/assign', exact: true, name: 'Assign Workorders', component: WorkordersAssign },
  { path: '/workorders/done', exact: true, name: 'Done Workorders', component: WorkordersDone },
];

export default routes;
