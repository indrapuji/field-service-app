import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  // CTextarea,
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

const Register = () => {
  const history = useHistory();
  const [teknisiList, setTeknisiList] = useState(null);
  const [formData, setFormData] = useState({
    merchant: '',
    alamat: '',
    no_telp: '',
    kota: '',
    mid: '',
    tid: '',
    edc_connection: '',
    type_edc: '',
    regional: '',
    tipe: '',
    tanggal_impor: new Date(),
  });

  useEffect(() => {
    getTeknisiList();
  }, []);

  const getTeknisiList = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/users/all-users?pagination=false&tipe=Teknisi',
        headers: {
          token,
        },
      });
      setTeknisiList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async () => {
    try {
      const { merchant, alamat, no_telp, kota, mid, tid, edc_connection, type_edc, regional, tipe } = formData;
      if (
        merchant === '' ||
        alamat === '' ||
        no_telp === '' ||
        kota === '' ||
        mid === '' ||
        tid === '' ||
        edc_connection === '' ||
        type_edc === '' ||
        regional === '' ||
        tipe === ''
      ) {
        newAlert({ status: 'error', message: 'Isi Semua Form' });
        return;
      }
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'POST',
        url: HostUrl + '/job-orders',
        data: formData,
        headers: {
          token,
        },
      });
      console.log(data);
      newAlert({ status: 'success', message: 'Berhasil' });
      history.push('/workorders/all');
    } catch (error) {
      const { msg } = error.response.data;
      newAlert({ status: 'error', message: msg });
      console.log(error.response.data);
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Register
              <small> New Merchant</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Nama Teknisi</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect id="select" name="teknisi_id" onChange={onFormChange}>
                      <option value="0">Please select</option>
                      {teknisiList &&
                        teknisiList.data.map((data) => {
                          return <option value={data.id}>{data.nama_lengkap}</option>;
                        })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Nama Merchant</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Nama Merchant..." name="merchant" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Alamat Merchant</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Alamat Merchant..." name="alamat" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">No Telp</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Telepon Merchant..." name="no_telp" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Kota</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Kota..." name="kota" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">MID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Serial Number..." name="mid" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">TID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Serial Number..." name="tid" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">EDC Connection</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan EDC Connection..." name="edc_connection" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Tipe EDC</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan EDC Connection..." name="type_edc" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Regional</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan EDC Connection..." name="regional" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Tipe</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom id="select" name="tipe" onChange={onFormChange}>
                      <option value="0">Please select</option>
                      <option value="Kunjungan">Kunjungan</option>
                      <option value="Pickup">Pickup Sales Draft</option>
                      <option value="Survey">OTS Survey</option>
                      <option value="Risk">Risk Unit</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={onFormSubmit}>
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Register;
