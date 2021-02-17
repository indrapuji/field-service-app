import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton } from '@coreui/react';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import UserCheck from '../../../components/UserCheck';

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [usersList, setUsersList] = useState(null);
  const [tipe, setTipe] = useState(null);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    getUsersList();
    setTipe(localStorage.getItem('tipe'));
  }, []);

  const getUsersList = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/users/all-users',
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setUsersList(UserCheck(data.data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const Adminfields = [
    { key: 'nama_lengkap', label: 'Name' },
    { key: 'tipe', label: 'Type' },
    { key: 'email', label: 'Email' },
    { key: 'gender', label: 'Gender' },
    { key: 'show_details', label: '', _style: { width: '5%' } },
    { key: 'assign', label: '', _style: { width: '5%' } },
  ];
  const fields = [
    { key: 'nama_lengkap', label: 'Name' },
    { key: 'tipe', label: 'Type' },
    { key: 'email', label: 'Email' },
    { key: 'gender', label: 'Gender' },
    { key: 'show_details', label: '', _style: { width: '5%' } },
  ];

  const handleEdit = (id) => {
    history.push(`/users/edit/${id}`);
  };
  const handleAssign = (id) => {
    history.push(`/users/assign/${id}`);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          <CCol>
            <div style={{ marginTop: 15, display: 'flex', marginLeft: 5 }}>
              <div>
                <CButton color="primary" to="/users/create">
                  Add New
                </CButton>
              </div>
            </div>
          </CCol>
          {usersList && (
            <CCardBody>
              <CDataTable
                items={usersList}
                fields={tipe === 'Admin' ? Adminfields : fields}
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
                  assign: (item, index) => {
                    return (
                      <td>
                        <CButton
                          color="success"
                          size="sm"
                          onClick={() => {
                            handleAssign(item.id);
                          }}
                        >
                          Assign
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

export default Users;
