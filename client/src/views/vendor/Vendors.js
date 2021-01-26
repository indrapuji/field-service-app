import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';
import axios from 'axios';
import { HostUrl } from '../../reusable';

// import vendorsData from './VendorsData';

const Vendors = () => {
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [vendorsList, setVendorsList] = useState(null);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    getVendorsList();
  }, []);

  const getVendorsList = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/vendors',
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setVendorsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fields = ['nama', 'alamat'];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Vendors</CCardHeader>
          {vendorsList && (
            <CCardBody>
              <CDataTable items={vendorsList.data} fields={fields} hover striped bordered size="sm" itemsPerPage={15} pagination />
            </CCardBody>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Vendors;
