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
    _tag: 'CSidebarNavItem',
    name: 'Vendors',
    to: '/vendors',
    icon: <CIcon name="cil-puzzle" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: <CIcon name="cil-star" customClasses="c-sidebar-nav-icon" />,
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
    name: 'Assign',
    to: '/workorders/assign',
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
    name: 'Users',
    to: '/users',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" />,
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
    route: '/workorders/kunjungan',
    // icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All',
        to: '/workorders/kunjungan/all',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/workorders/kunjungan/progress',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Done',
        to: '/workorders/kunjungan/done',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pickup Sales Draft',
    route: '/workorders/pickup',
    // icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All',
        to: '/workorders/pickup/all',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/workorders/pickup/Progress',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Done',
        to: '/workorders/pickup/Done',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'OTS Survey',
    route: '/workorders/survey',
    // icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All',
        to: '/workorders/survey/all',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/workorders/survey/progress',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Done',
        to: '/workorders/survey/done',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Risk Unit',
    route: '/workorders/risk',
    // icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All',
        to: '/workorders/risk/all',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/workorders/risk/progress',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Done',
        to: '/workorders/risk/done',
      },
    ],
  },
];

export { _Supernav, _Clientnav, _Adminnav };
