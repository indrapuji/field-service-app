import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from '@coreui/react';
import trendcom from '../assets/Images/trendcom-logo.png';
import sygnet from '../assets/Images/logo.png';

// sidebar nav config
import { _Supernav, _Clientnav, _Adminnav } from './_nav';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState(null);
  const show = useSelector((state) => state.sidebarShow);

  useEffect(() => {
    const tipe = localStorage.getItem('tipe');
    if (tipe === 'Super Admin') {
      setNavigation(_Supernav);
    }
    if (tipe === 'Client') {
      setNavigation(_Clientnav);
    }
    if (tipe === 'Admin') {
      setNavigation(_Adminnav);
    }
  }, []);

  return (
    <CSidebar show={show} onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <CImg src={trendcom} height={40} className="c-sidebar-brand-full" />
        <CImg src={sygnet} height={35} className="c-sidebar-brand-minimized" />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
