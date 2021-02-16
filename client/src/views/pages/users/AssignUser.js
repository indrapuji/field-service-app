import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CInput,
  CFormGroup,
  CForm,
  CLabel,
  CCardFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CPagination,
  CBadge,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import ListUser from './ListUser';

const Register = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [edit, setEdit] = useState({});
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [jobOrderData, setJobOrderData] = useState(null);
  const [newAssign, setNewAssign] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${HostUrl}/users/single/${userId}`,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(({ data }) => {
        setEdit(data);
      })
      .catch((err) => {
        console.log(err);
      });
    getWorkOrder(1);
    // eslint-disable-next-line
  }, []);

  const getWorkOrder = async (page, newData = newAssign) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/job-orders/all?page=' + page + `&notIn=${JSON.stringify(newData)}`,
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

  const redoPick = (id) => {
    const newData = newAssign.filter((data) => Number(data.id) !== Number(id));
    setNewAssign(newData);
    const query = newData.map((data) => data.id);
    getWorkOrder(jobOrderData.currentPage, query);
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CForm>
              <CCardHeader>Assign Workorders</CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="1">
                    <CLabel>Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput disabled value={edit.nama_lengkap} />
                  </CCol>
                  <CCol md="1">
                    <CLabel>Tipe</CLabel>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CInput disabled value={edit.tipe} />
                  </CCol>
                  <CCol md="1">
                    <CLabel>Count</CLabel>
                  </CCol>
                  <CCol xs="12" md="2">
                    <CInput disabled value={'299'} />
                  </CCol>
                </CFormGroup>
              </CCardBody>
              <CCardFooter>
                {/* <CButton to="/users" size="sm" color="primary" className="float-right mb-3">
                  <CIcon name="cil-scrubber" /> Back
                </CButton> */}
                {newAssign.map((item, idx) => {
                  return (
                    <CBadge style={{ cursor: 'pointer' }} key={idx} style={{ marginLeft: 5 }} onClick={() => redoPick(item.id)} color="success">
                      {item.merchant}
                    </CBadge>
                  );
                })}
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
      </CRow>

      <ListUser jobOrderData={jobOrderData} getWorkOrder={getWorkOrder} setNewAssign={setNewAssign} newAssign={newAssign} />
    </CContainer>
  );
};

export default Register;
