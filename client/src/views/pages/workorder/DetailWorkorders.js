import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CTextarea,
  CSelect,
  CInput,
  CFormGroup,
  CForm,
  CLabel,
  CCardFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  // CInputRadio,
  // CInputFile,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import newAlert from '../../../components/NewAlert';
import Swal from 'sweetalert2';
import { formatTime, formatFullDate } from 'node-format-date';

const Register = () => {
  const { woId } = useParams();
  const history = useHistory();
  // const [teknisiList, setTeknisiList] = useState(null);
  const [detail, setDetail] = useState({});
  const [nama, setNama] = useState('');
  const [assignData, setAssignData] = useState(null);
  const [teknisiData, setTeknisiData] = useState([]);

  useEffect(() => {
    getDetailWO();
    getDataTeknisi();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (detail.teknisi_id) getUsers();
    // eslint-disable-next-line
  }, [detail]);

  const getDataTeknisi = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/users/all-users?teknisi=true&pagination=false',
        headers: {
          token,
        },
      });
      console.log(data);
      setTeknisiData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDetailWO = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/job-orders/single/' + woId,
        headers: {
          token,
        },
      });

      console.log(data);
      setDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/users/single/' + detail.teknisi_id,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setNama(data.nama_lengkap);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are You Sure?',
      text: `${detail.merchant}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios({
            method: 'DELETE',
            url: `${HostUrl}/job-orders/delete/${woId}`,
            headers: {
              token: localStorage.getItem('token'),
            },
          });
          newAlert({ status: 'success', message: 'Deleted' });
          history.push('/workorders/all');
        } catch (error) {
          const { msg } = error.response.data;
          newAlert({ status: 'error', message: msg });
          console.log(error.response.data);
        }
      } else {
        newAlert({ status: 'error', message: 'Cancel' });
      }
    });
  };
  const onChangeTeknisi = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setAssignData({
      ...assignData,
      [name]: value,
    });
  };

  const onSubmitAssign = async (e) => {
    try {
      e.preventDefault();
      if (!assignData.teknisi_id) {
        await axios({
          method: 'PUT',
          url: `${HostUrl}/job-orders/assign`,
          data: {
            job_order_id: woId,
            teknisi_id: assignData.teknisi_id,
          },
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        newAlert({ status: 'success', message: 'Success' });
        history.push('/workorders/all');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitReassign = async (e) => {
    try {
      e.preventDefault();
      if (!assignData.teknisi_id) {
        await axios({
          method: 'PUT',
          url: `${HostUrl}/job-orders/reassign`,
          data: {
            job_order_id: woId,
            teknisi_id: assignData.teknisi_id,
          },
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        newAlert({ status: 'success', message: 'Success' });
        history.push('/workorders/all');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader color={detail.tipe}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Detail Merchant</div>
                <div>{detail.tipe}</div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ textAlign: 'right' }}>
                    <bold>Tanggal Import</bold>
                    <p>{formatFullDate(detail.createdAt)}</p>
                  </div>
                </div>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Assign</CLabel>
                  </CCol>
                  {nama && detail.status !== 'Done' && (
                    <>
                      <CCol xs="8" md="7">
                        <CSelect name="teknisi_id" size="sm" onChange={onChangeTeknisi}>
                          <option value="0">Please select</option>
                          {teknisiData.length !== 0
                            ? teknisiData.map((data) => {
                                return <option value={data.id}>{data.nama_lengkap}</option>;
                              })
                            : ''}
                        </CSelect>
                      </CCol>
                      <CCol xs="4" md="1">
                        <CButton color="success" size="sm" className="float-right" onClick={onSubmitReassign}>
                          Re-Assign
                        </CButton>
                      </CCol>
                    </>
                  )}
                  {!nama && (
                    <>
                      <CCol xs="8" md="8">
                        <CSelect name="teknisi_id" size="sm" onChange={onChangeTeknisi}>
                          <option value="0">Please select</option>
                          {teknisiData.length !== 0
                            ? teknisiData.map((data) => {
                                return <option value={data.id}>{data.nama_lengkap}</option>;
                              })
                            : ''}
                        </CSelect>
                      </CCol>
                      <CCol xs="4" md="1">
                        <CButton color="success" size="sm" className="float-right" onClick={onSubmitAssign}>
                          Assign
                        </CButton>
                      </CCol>
                    </>
                  )}
                  {nama && detail.verify && (
                    <CCol xs="8" md="9">
                      <CInput size="sm" style={{ backgroundColor: !nama ? 'red' : null }} value={nama} disabled />
                    </CCol>
                  )}
                  {nama && detail.status === 'Done' && (
                    <CCol xs="8" md="9">
                      <CInput size="sm" style={{ backgroundColor: !nama ? 'red' : null }} value={nama} disabled />
                    </CCol>
                  )}
                </CFormGroup>
                {detail.tanggal_assign && (
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Tanggal Assign</CLabel>
                    </CCol>
                    <CCol xs="12" md="2">
                      <CInput size="sm" value={formatTime(detail.tanggal_assign)} disabled />
                    </CCol>
                    <CCol xs="12" md="4">
                      <CInput size="sm" value={formatFullDate(detail.tanggal_assign)} disabled />
                    </CCol>
                  </CFormGroup>
                )}
                {detail.tanggal_done && (
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Tanggal Done</CLabel>
                    </CCol>
                    <CCol xs="12" md="2">
                      <CInput size="sm" value={formatTime(detail.tanggal_done)} disabled />
                    </CCol>
                    <CCol xs="12" md="4">
                      <CInput size="sm" value={formatFullDate(detail.tanggal_done)} disabled />
                    </CCol>
                  </CFormGroup>
                )}
                {detail.close && (
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Tanggal Close</CLabel>
                    </CCol>
                    <CCol xs="12" md="2">
                      <CInput size="sm" value={formatTime(detail.close)} disabled />
                    </CCol>
                    <CCol xs="12" md="4">
                      <CInput size="sm" value={formatFullDate(detail.close)} disabled />
                    </CCol>
                  </CFormGroup>
                )}
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Nama Merchant</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput size="sm" value={detail.merchant} disabled />
                  </CCol>
                </CFormGroup>
                {/* <CFormGroup row>
                  <CCol md="2" />
                  <CCol xs="12" md="9">
                    <CInput size="sm" value={detail.nama_merchant} />
                  </CCol>
                </CFormGroup> */}
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Alamat Merchant</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea value={detail.alamat} name="alamat" disabled />
                  </CCol>
                </CFormGroup>
                {/* <CFormGroup row>
                  <CCol md="2" />
                  <CCol xs="12" md="9">
                    <CTextarea value={detail.alamat_merchant} name="alamat" />
                  </CCol>
                </CFormGroup> */}
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>No Telp</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={detail.no_telp} name="no_telp" disabled />
                  </CCol>
                </CFormGroup>
                {/* <CFormGroup row>
                  <CCol md="2" />
                  <CCol xs="12" md="9">
                    <CInput name="no_telp_merchant" />
                  </CCol>
                </CFormGroup> */}
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Kota</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={detail.kota} disabled name="kota" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>MID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={detail.mid} name="mid" disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>TID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={detail.tid} name="tid" disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>EDC Connection</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={detail.edc_connection} disabled name="edc_connection" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Tipe EDC</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={detail.type_edc} disabled name="type_edc" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Regional</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={detail.regional} disabled name="regional" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Catatan</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={detail.catatan} disabled />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton size="sm" color="warning" onClick={handleDelete}>
                <CIcon name="cil-scrubber" /> Delete
              </CButton>
              <CButton size="sm" className="float-right" color="success">
                <CIcon name="cil-scrubber" /> Close
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Register;
