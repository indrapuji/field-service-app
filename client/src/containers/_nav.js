import React from 'react';
import CIcon from '@coreui/icons-react';

const _Supernav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Vendors',
    route: '/vendors',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Vendors',
        to: '/vendors',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Create New Vendor',
        to: '/vendors/create',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Users',
    route: '/users',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/users',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Create New User',
        to: '/users/create',
      },
    ],
  },
];

const _Clientnav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Work Order'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All',
    to: '/workorder/all',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Progress',
    to: '/workorder/progress',
    icon: 'cil-circle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Done',
    to: '/workorder/done',
    icon: 'cil-check-circle',
  },
];
const _Adminnav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Work Order'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All',
    to: '/workorder/all',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Progress',
    to: '/workorder/progress',
    icon: 'cil-circle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Done',
    to: '/workorder/done',
    icon: 'cil-check-circle',
  },
];

export { _Supernav, _Clientnav, _Adminnav };
