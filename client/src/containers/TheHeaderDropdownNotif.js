import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CHeaderNavLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';

const TheHeaderDropdownNotif = () => {
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem>
          <CHeaderNavLink to="/register">
            <CIcon name="cil-user-follow" className="mr-2 text-success" /> Register new Vendor
          </CHeaderNavLink>
        </CDropdownItem>
        <CDropdownItem>
          <CHeaderNavLink to="/users/register">
            <CIcon name="cil-user-follow" className="mr-2 text-success" /> Register new user
          </CHeaderNavLink>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
