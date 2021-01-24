import React from 'react';
import CIcon from '@coreui/icons-react';

const _nav = [
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

export default _nav;
