import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination, CButton } from '@coreui/react';

import axios from 'axios';
import HostUrl from '../../../components/HostUrl';

const getBadge = (status) => {
  switch (status) {
    case 'Done':
      return 'success';
    case 'Assign':
      return 'warning';
    default:
      return 'secondary';
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
        url: HostUrl + '/job-orders/all?status=Assign&page=' + page,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setJobOrderData(data);
      console.log(data);
    } catch (err) {
      console.log('ERROR');
      console.log(err);
    }
  };

  const changePage = (page) => {
    getWorkOrder(page);
  };
  const handleEdit = (id) => {
    console.log(id);
  };

  const fields = [
    { key: 'merchant', label: 'MERCHANT' },
    { key: 'alamat', label: 'ALAMAT' },
    { key: 'no_telp', label: 'TELEPON' },
    { key: 'tipe', label: 'TIPE' },
    { key: 'regional', label: 'REGIONAL' },
    { key: 'mid', label: 'MID' },
    { key: 'tid', label: 'TID' },
    { key: 'status', label: 'Status' },
    { key: 'show_details', label: 'Detail' },
  ];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Assign Workorders</CCardHeader>
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
                    show_details: (item, index) => {
                      return (
                        <td>
                          <CButton
                            color="warning"
                            size="sm"
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                          >
                            Detail
                          </CButton>
                        </td>
                      );
                    },
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
