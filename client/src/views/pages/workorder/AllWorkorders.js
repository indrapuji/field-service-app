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

import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import getColumn from '../../../components/GetColumn';
import ReactExport from 'react-export-excel';

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

  const week = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [jobOrderData, setJobOrderData] = useState(null);
  const [tipe, setTipe] = useState(localStorage.getItem('tipe'));
  const [next, setNext] = useState(month);
  const [queryData, setQueryData] = useState({
    status: '',
    sort: 'status',
    resPerPage: 20,
    search: 'merchant',
    searchQuery: '',
    filter: 'month',
    filterQuery: '',
  });
  const [exData, setExData] = useState([]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    setTipe(localStorage.getItem('tipe'));
    const date = new Date();
    const idx = date.getMonth();
    setQueryData({
      ...queryData,
      filterQuery: idx,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getWorkOrder(1);
    // eslint-disable-next-line
  }, [queryData]);

  const getWorkOrder = async (page) => {
    try {
      let newQuery = [];
      for (let key in queryData) {
        newQuery = newQuery.concat(`${key}=${queryData[key]}`);
      }
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + `/job-orders/all?page=${page}&${newQuery.join('&')}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setExData(getColumn(data.data));
      setJobOrderData(data);
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

  const getWeekOfMonth = () => {
    const date = new Date();
    var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    var offsetDate = date.getDate() + firstWeekday - 1;
    return Math.floor(offsetDate / 7);
  };

  const onTime = (e) => {
    const { value } = e.target;
    if (value === 'month') {
      const date = new Date();
      const idx = date.getMonth();
      setQueryData({
        ...queryData,
        filter: value,
        filterQuery: idx,
      });
      setNext(month);
    } else if (value === 'week') {
      const idx = getWeekOfMonth();
      setQueryData({
        ...queryData,
        filter: value,
        filterQuery: idx - 1,
      });
      setNext(week);
    }
  };

  const onChangeQuery = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setQueryData({
      ...queryData,
      [name]: value,
    });
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
                  <CSelect id="select" name="status" className="mr-sm-2" onChange={onChangeQuery}>
                    <option value="" selected>
                      All
                    </option>
                    <option value="Unassign">Unassign</option>
                    <option value="Assign">Assign</option>
                    <option value="Done">Done</option>
                    <option value="Close">Close</option>
                  </CSelect>
                  <CSelect id="select" name="filter" className="mr-sm-2" onChange={onTime}>
                    <option value="month" selected>
                      Monthly
                    </option>
                    <option value="week">Weekly</option>
                  </CSelect>
                  <CSelect
                    id="select"
                    name="filterQuery"
                    className="mr-sm-2"
                    onChange={onChangeQuery}
                  >
                    {next &&
                      next.map((data, index) => {
                        const date = new Date();
                        let idx = 0;
                        if (queryData.filter === 'month') {
                          idx = date.getMonth();
                        } else {
                          idx = getWeekOfMonth() - 1;
                        }
                        return (
                          <option
                            key={data.id}
                            value={index}
                            selected={index === idx ? true : false}
                          >
                            {data}
                          </option>
                        );
                      })}
                  </CSelect>
                </CForm>
              </CCol>
              <CCol xs="12" md="6" className="float-right">
                <CRow>
                  <CCol>
                    <CForm inline className="float-right">
                      <CLabel className="mr-sm-2">Sort by </CLabel>
                      <CSelect id="select-sort" name="sort" onChange={onChangeQuery}>
                        <option value="status" selected>
                          Status
                        </option>
                        <option value="region">Region</option>
                      </CSelect>
                    </CForm>
                  </CCol>
                  <CCol>
                    <CForm inline className="float-right">
                      <CLabel className="mr-2">Items per page </CLabel>
                      <CSelect id="select-items" name="resPerPage" onChange={onChangeQuery}>
                        <option value="20" selected>
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
                    {jobOrderData && (
                      <ExcelFile
                        element={<CButton color="primary">Download</CButton>}
                        filename="WORK ORDER"
                      >
                        <ExcelSheet data={jobOrderData.data} name="DATA">
                          {exData &&
                            exData.map((item) => {
                              return (
                                <ExcelColumn key={item.id} label={item.header} value={item.field} />
                              );
                            })}
                        </ExcelSheet>
                      </ExcelFile>
                    )}
                  </div>
                </div>
              </CCol>
              <CCol xs="12" md="6">
                <CForm inline className="float-right">
                  <CInput
                    className="mr-sm-2"
                    placeholder="Search"
                    name="searchQuery"
                    onChange={onChangeQuery}
                  />
                  <CSelect id="select" name="search" className="mr-sm-2" onChange={onChangeQuery}>
                    <option value="merchant" selected>
                      Merchant
                    </option>
                    <option value="mid">MID</option>
                    <option value="tid">TID</option>
                  </CSelect>
                  <CButton
                    color="light"
                    className="my-2 my-sm-0"
                    type="submit"
                    onClick={(e) => e.preventDefault()}
                  >
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
