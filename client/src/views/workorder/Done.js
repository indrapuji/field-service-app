import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';

import usersData from './UsersData';

const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'secondary';
    case 'Pending':
      return 'warning';
    case 'Banned':
      return 'danger';
    default:
      return 'primary';
  }
};

const Progress = () => {
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const fields = ['name', 'email', 'gender', 'role', 'no telp', 'status'];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Done</CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Progress;
