import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';

import vendorsData from './VendorsData';

const Vendors = () => {
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const fields = ['name', 'alamat'];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Vendors</CCardHeader>
          <CCardBody>
            <CDataTable items={vendorsData} fields={fields} hover striped bordered size="sm" itemsPerPage={10} pagination />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Vendors;
