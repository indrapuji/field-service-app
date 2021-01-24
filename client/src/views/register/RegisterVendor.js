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
import axios from "axios";
import { HostUrl } from "../../reusable";

const RegisterVendor = () => {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: ""
  });
  const onFormChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  const submitForm = async () => {
    try {
      const { nama, alamat } = formData;
      if (nama === "" || alamat === "") return;
      await axios({
        method: "POST",
        url: HostUrl + "/vendors/create",
        data: formData
      });
      console.log("BERHASIL");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>
              Register
              <small> Vendor</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Nama Vendor</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Nama Vendor" name="nama" onChange={ onFormChange } />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Alamat</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea rows="9" placeholder="Alamat..." name="alamat" onChange={ onFormChange } />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" onClick={ submitForm } /> Submit
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default RegisterVendor;
