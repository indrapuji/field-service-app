import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';

// import usersData from './UsersData';
import token from '../token';
import axios from 'axios';
import { HostUrl } from '../../reusable';

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

const Workorders = () => {
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [jobOrderData, setJobOrderData] = useState(null);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    getWorkOrder();
  }, []);

  const getWorkOrder = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/job-orders/all',
        headers: {
          token,
        },
      });
      setJobOrderData(data);
      setPage(data.page);
    } catch (err) {
      console.log('ERROR');
      console.log(err);
    }
  };

  const fields = ['nama_merchant', 'alamat_merchant', 'nama_bank', 'tipe', 'serial_number', 'keterangan'];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>All</CCardHeader>
          {jobOrderData && (
            <CCardBody>
              <CDataTable
                items={jobOrderData.data}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={15}
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
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Workorders;
