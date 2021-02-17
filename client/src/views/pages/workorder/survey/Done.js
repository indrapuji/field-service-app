import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination } from '@coreui/react';

// import usersData from './UsersData';
// import token from '../../../token';
import axios from 'axios';
import HostUrl from '../../../../components/HostUrl';

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
    getWorkOrder(1);
  }, []);

  const getWorkOrder = async (page) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/job-orders/all?status=Done&tipe=Survey&page=' + page,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setJobOrderData(data);
    } catch (err) {
      console.log('ERROR');
      console.log(err);
    }
  };

  const changePage = (page) => {
    getWorkOrder(page);
  };

  const fields = ['merchant', 'alamat', 'pic', 'no_telp', 'kota', 'regional', 'id', 'status'];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Done</CCardHeader>
          {jobOrderData && (
            <>
              <CCardBody>
                <CDataTable
                  items={jobOrderData.data}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                      </td>
                    ),
                  }}
                />
                <CPagination activePage={jobOrderData.currentPage} pages={jobOrderData.pages} onActivePageChange={changePage} />
              </CCardBody>
            </>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Workorders;
