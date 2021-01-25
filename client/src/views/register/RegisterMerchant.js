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
import { HostUrl } from '../../reusable';
import newAlert from '../../components/NewAlert';

const Register = () => {
  const history = useHistory();
  const [vendorsList, setVendorsList] = useState(null);
  const [formData, setFormData] = useState({
    nama_merchant: '',
    alamat_merchant: '',
    nama_bank: '',
    tipe_terminal: '',
    serial_number: '',
    tipe: '',
    status: 'Assign',
    tanggal_assign: new Date(),
    mid: '',
    vendor_id: '',
    teknisi_id: 4,
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
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async () => {
    try {
      await axios({
        method: 'POST',
        url: HostUrl + '/job-orders',
        data: formData,
      });
      newAlert({ status: 'success', message: 'Berhasil' });
      history.push('/all');
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
              <small> New Merchant</small>
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
                    <CLabel htmlFor="text-input">Nama Merchant</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Nama Merchant..." name="nama_merchant" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Alamat Merchant</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Alamat Merchant..." name="alamat_merchant" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Nama Bank</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom id="select" name="nama_bank" onChange={onFormChange}>
                      <option value="0">Please select</option>
                      <option value="Bukopin">Bukopin</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Tipe Terminal</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom id="select" name="tipe_terminal" onChange={onFormChange}>
                      <option value="0">Please select</option>
                      <option value="ict">ICT</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Serial Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Serial Number..." name="serial_number" onChange={onFormChange} />
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
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">MID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan MID..." name="mid" onChange={onFormChange} />
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
