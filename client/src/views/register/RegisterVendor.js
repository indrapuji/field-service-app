import React from 'react';
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

const RegisterVendor = () => {
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
                    <CInput id="text-input" name="text-input" placeholder="Text" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Alamat</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea name="textarea-input" id="textarea-input" rows="9" placeholder="Alamat..." />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Kirim
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default RegisterVendor;
