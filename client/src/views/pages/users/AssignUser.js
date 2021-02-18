import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  CBadge,
} from '@coreui/react';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import ListUser from './ListUser';
import newAlert from '../../../components/NewAlert';
import ToastAlert from '../../../components/ToastAlert';

const Register = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [edit, setEdit] = useState({});
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
      const query = newData.map((data) => data.id);
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/job-orders/all?status=Unassign&page=' + page + `&notIn=${JSON.stringify(query)}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      console.log(data.data);
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

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const arrData = newAssign.map((data) => data.id);
      await axios({
        method: 'POST',
        url: HostUrl + '/job-orders/assign-many/' + userId,
        headers: {
          token: localStorage.getItem('token'),
        },
        data: {
          arrData: JSON.stringify(arrData),
        },
      });
      newAlert({ status: 'success', message: 'Berhasil Menambahkan' });
      history.push('/users');
    } catch (err) {
      console.log(err);
      newAlert({ status: 'error', message: 'Gagal Menambahkan' });
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CForm>
              <CCardHeader>Assign Workorders</CCardHeader>
              <CCardBody className="mb-3">
                <CFormGroup row>
                  <CCol md="1">
                    <CLabel>Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput size="sm" disabled value={edit.nama_lengkap} />
                  </CCol>
                  <CCol md="1">
                    <CLabel>Tipe</CLabel>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CInput size="sm" disabled value={edit.tipe} />
                  </CCol>
                  <CCol md="1">
                    <CLabel>Count</CLabel>
                  </CCol>
                  <CCol xs="12" md="2">
                    <CInput size="sm" disabled value={edit.job_order_count + newAssign.length} />
                  </CCol>
                </CFormGroup>
                <CButton size="sm" color="primary" className="float-right" disabled={newAssign.length > 0 ? false : true} onClick={onFormSubmit}>
                  Assign
                </CButton>
              </CCardBody>
              {newAssign.length > 0 && (
                <>
                  <CCardFooter>
                    {newAssign.map((item, idx) => {
                      return (
                        <>
                          <CBadge
                            key={idx}
                            onClick={() => redoPick(item.id)}
                            style={{
                              margin: 3,
                              padding: 5,
                              cursor: 'pointer',
                            }}
                            color={item.tipe}
                          >
                            {item.merchant}
                          </CBadge>
                          <ToastAlert item={item} />
                        </>
                      );
                    })}
                  </CCardFooter>
                  {/* <CCardFooter>
                    <CButton size="sm" color="primary" className="float-right mb-3" onClick={onFormSubmit}>
                      Assign
                    </CButton>
                  </CCardFooter> */}
                </>
              )}
            </CForm>
          </CCard>
        </CCol>
      </CRow>

      <ListUser jobOrderData={jobOrderData} getWorkOrder={getWorkOrder} setNewAssign={setNewAssign} newAssign={newAssign} />
    </CContainer>
  );
};

export default Register;
