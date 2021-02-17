import React, { useState } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CTextarea,
  CInput,
  CFormGroup,
  CForm,
  CLabel,
  CCardFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import newAlert from '../../../components/NewAlert';

const RegisterVendor = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
  });
  const onFormChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitForm = async (event) => {
    try {
      event.preventDefault();
      const { nama, alamat } = formData;
      if (nama === '' || alamat === '') {
        newAlert({ status: 'error', message: 'Fill All Form' });
        return;
      }
      await axios({
        method: 'POST',
        url: HostUrl + '/vendors/create',
        data: formData,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      newAlert({ status: 'success', message: 'Success' });
      history.push('/vendors');
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
            <CForm onSubmit={submitForm}>
              <CCardHeader>Register New Vendor</CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Vendor Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="nama" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Vendor Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea rows="6" name="alamat" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="sm" color="primary" className="float-right mb-3" onClick={submitForm}>
                  <CIcon name="cil-scrubber" /> Create
                </CButton>
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default RegisterVendor;
