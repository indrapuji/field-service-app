import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton } from '@coreui/react';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';

const Vendors = () => {
  const history = useHistory();
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

  const handleEdit = (id) => {
    history.push(`/vendors/edit/${id}`);
  };

  const fields = [
    { key: 'nama', label: 'Vendor Name', _style: { width: '40%' } },
    { key: 'alamat', label: 'Vendor Address', _style: { width: '55%' } },
    { key: 'show_details', label: 'Detail', _style: { width: '5%' } },
  ];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="cardHeader">Vendors</CCardHeader>
          <CCol>
            <div style={{ marginTop: 15, display: 'flex', marginLeft: 5 }}>
              <div>
                <CButton color="primary" to="/vendors/create">
                  Add New
                </CButton>
              </div>
            </div>
          </CCol>
          {vendorsList && (
            <CCardBody>
              <CDataTable
                items={vendorsList.data}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={15}
                pagination
                scopedSlots={{
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
            </CCardBody>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Vendors;
