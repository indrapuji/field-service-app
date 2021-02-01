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
    to: '/workorders/all',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Progress',
    to: '/workorders/progress',
    icon: 'cil-circle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Done',
    to: '/workorders/done',
    icon: 'cil-check-circle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create',
    to: '/workorders/create',
    icon: 'cid-folder-special',
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
    to: '/workorders/all',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Progress',
    to: '/workorders/progress',
    icon: 'cil-circle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Done',
    to: '/workorders/done',
    icon: 'cil-check-circle',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Kunjungan Merchants',
    route: '/users',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Done',
        to: '',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pickup Sales Draft',
    route: '/users',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Done',
        to: '',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'OTS Survey',
    route: '/users',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Done',
        to: '',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Risk Unit',
    route: '/users',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Done',
        to: '',
      },
    ],
  },
];

export { _Supernav, _Clientnav, _Adminnav };
