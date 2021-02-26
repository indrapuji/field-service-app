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
    icon: 'cil-asterisk-circle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Done',
    to: '/workorders/done',
    icon: 'cil-check-circle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Close',
    to: '/workorders/close',
    icon: 'cil-check',
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
];

export { _Supernav, _Clientnav, _Adminnav };
