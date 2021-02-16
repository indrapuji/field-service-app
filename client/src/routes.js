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
const WorkordersAssign = React.lazy(() => import('./views/pages/workorder/WorkordersAssign'));

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
];

export default routes;
