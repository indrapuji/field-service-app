import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';
import axios from 'axios';
import { HostUrl } from '../../../reusable';

// import usersData from './UsersData';

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

const Users = () => {
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    getUsersList();
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
      setUsersList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fields = ['nama_lengkap', 'tipe', 'email', 'gender', 'no_telp', 'status'];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          {usersList && (
            <CCardBody>
              <CDataTable
                items={usersList.data}
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

export default Users;
