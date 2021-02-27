import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CForm,
  CLabel,
  CSelect,
  CInput,
} from '@coreui/react';

// import usersData from './UsersData';
// import token from '../../token';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';

const getBadge = (status) => {
  switch (status) {
    case 'Done':
      return 'success';
    case 'Assign':
      return 'warning';
    case 'Close':
      return 'Primary';
    default:
      return 'secondary';
  }
};

const Workorders = () => {
  const month = [
    'Januari',
    'February',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const week = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [jobOrderData, setJobOrderData] = useState(null);
  const [tipe, setTipe] = useState(localStorage.getItem('tipe'));
  const [next, setNext] = useState(month);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    getWorkOrder(1);
    setTipe(localStorage.getItem('tipe'));
  }, []);

  const getWorkOrder = async (page) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/job-orders/all?page=' + page,
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
    history.push(`/workorders/detail/${id}`);
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

  const onTime = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value === 'monthly') {
      setNext(month);
    } else if (value === 'weekly') {
      setNext(week);
    }
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>All Workorders</CCardHeader>
          <div
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 15,
            }}
          >
            <CRow>
              <CCol xs="12" md="6">
                <CForm inline className="mr-2">
                  <CLabel className="mr-sm-2">Filter by </CLabel>
                  <CSelect id="select" name="searchby" className="mr-sm-2">
                    <option value="monthly" defaultValue>
                      All
                    </option>
                    <option value="monthly" defaultValue>
                      Unassign
                    </option>
                    <option value="weekly">Assign</option>
                    <option value="weekly">Done</option>
                    <option value="weekly">Close</option>
                  </CSelect>
                  <CSelect id="select" name="searchby" className="mr-sm-2" onChange={onTime}>
                    <option value="monthly" defaultValue>
                      Monthly
                    </option>
                    <option value="weekly">Weekly</option>
                  </CSelect>
                  <CSelect id="select" name="searchby" className="mr-sm-2">
                    {next &&
                      next.map((data) => {
                        return <option value={data}>{data}</option>;
                      })}
                  </CSelect>
                </CForm>
              </CCol>
              <CCol xs="12" md="6" className="float-right">
                <CRow>
                  <CCol>
                    <CForm inline className="float-right">
                      <CLabel className="mr-sm-2">Sort by </CLabel>
                      <CSelect id="select-sort" name="sort">
                        <option value="nama" defaultValue>
                          Status
                        </option>
                        <option value="nomor">Region</option>
                      </CSelect>
                    </CForm>
                  </CCol>
                  <CCol>
                    <CForm inline className="float-right">
                      <CLabel className="mr-2">Items per page </CLabel>
                      <CSelect id="select-items" name="resPerPage">
                        <option value="20" defaultValue>
                          20
                        </option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </CSelect>
                    </CForm>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
          <div
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 15,
            }}
          >
            <CRow>
              <CCol xs="12" md="6" className="mb-2">
                <div style={{ display: 'flex' }}>
                  {tipe !== 'Client' && (
                    <div style={{ display: 'flex' }}>
                      <CButton color="success" to="/workorders/create">
                        Add
                      </CButton>
                      <CButton color="warning" className="mx-2" to="/workorders/import">
                        Import
                      </CButton>
                    </div>
                  )}
                  <div>
                    <div>
                      <CButton color="primary" to="/workorders/import">
                        Download
                      </CButton>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol xs="12" md="6">
                <CForm inline className="float-right">
                  <CInput className="mr-sm-2" placeholder="Search" name="val" />
                  <CSelect id="select" name="searchby" className="mr-sm-2">
                    <option value="Merchant" defaultValue>
                      Merchant
                    </option>
                    <option value="MID">MID</option>
                    <option value="TID">TID</option>
                  </CSelect>
                  <CButton color="light" className="my-2 my-sm-0" type="submit">
                    Search
                  </CButton>
                </CForm>
              </CCol>
            </CRow>
          </div>
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
                <CPagination
                  activePage={jobOrderData.currentPage}
                  pages={jobOrderData.pages}
                  onActivePageChange={changePage}
                />
              </CCardBody>
            </>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Workorders;
