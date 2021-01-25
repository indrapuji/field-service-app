import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  CInputRadio,
  CInputFile,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { HostUrl } from '../../reusable';
import newAlert from '../../components/NewAlert';

const Register = () => {
  const history = useHistory();
  const [vendorsList, setVendorsList] = useState(null);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    password: '',
    gender: '',
    alamat: '',
    nama_bank: '',
    no_rekening: '',
    no_telp: '',
    tgl_lahir: '',
    no_ktp: '',
    tipe: '',
    vendor_id: '',
    foto_profil: null,
  });

  useEffect(() => {
    getVendorsList();
  }, []);

  const getVendorsList = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/vendors',
      });
      setVendorsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  console.log(formData);
  const onFormSubmit = async () => {
    try {
      const newFormData = new FormData();
      for (let key in formData) {
        newFormData.append(key, formData[key]);
      }
      await axios({
        method: 'POST',
        url: HostUrl + '/users/register',
        data: newFormData,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      newAlert({ status: 'success', message: 'Berhasil' });
      history.push('/users');
    } catch (error) {
      const { msg } = error.response.data;
      newAlert({ status: 'error', message: msg });
      console.log(error.response.data);
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>
              Register
              <small> New User</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Nama Vendor</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect id="select" name="vendor_id" onChange={onFormChange}>
                      <option value="0">Please select</option>
                      {vendorsList &&
                        vendorsList.data.map((data) => {
                          return <option value={data.id}>{data.nama}</option>;
                        })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Nama Lengkap</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Nama Lengkap..." name="nama_lengkap" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" placeholder="Masukkan Email..." autoComplete="email" name="email" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" placeholder="Masukkan Password..." autoComplete="new-password" name="password" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Jenis Kelamin</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="gender" value="Male" onChange={onFormChange} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                        Laki - laki
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="gender" value="Female" onChange={onFormChange} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                        Perempuan
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Alamat</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea rows="9" placeholder="Masukkan Alamat..." name="alamat" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Nama Bank</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Nama Bank..." name="nama_bank" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">No Rekening</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan No Rekening..." name="no_rekening" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">No Telp</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan No Telp..." name="no_telp" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Tanggal Lahir</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" placeholder="date" name="tgl_lahir" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">No KTP</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan No KTP.." name="no_ktp" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col md="3" htmlFor="file-input">
                    Foto
                  </CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="foto_profil" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Tipe</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom id="select" name="tipe" onChange={onFormChange}>
                      <option value="0">Please select</option>
                      <option value="Client">Client</option>
                      <option value="Admin">Admin</option>
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
