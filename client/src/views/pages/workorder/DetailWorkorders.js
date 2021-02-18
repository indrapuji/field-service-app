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

const Register = () => {
  const { woId } = useParams();
  const history = useHistory();
  // const [teknisiList, setTeknisiList] = useState(null);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getDetailWO();
    // eslint-disable-next-line
  }, []);

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

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader color={detail.tipe}>Detail Merchant</CCardHeader>
            <CCardBody>
              <CForm>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Nama Merchant</CLabel>
                  </CCol>
                  <CCol xs="12" md="5">
                    <CLabel>{detail.merchant}</CLabel>
                  </CCol>
                  <CCol xs="12" md="5">
                    <CInput size="sm" value={detail.nama_merchant} />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Alamat Merchant</CLabel>
                  </CCol>
                  <CCol xs="12" md="5">
                    <CTextarea name="alamat" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">No Telp</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Telepon Merchant..." name="no_telp" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Kota</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Kota..." name="kota" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">MID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Serial Number..." name="mid" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">TID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan Serial Number..." name="tid" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">EDC Connection</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan EDC Connection..." name="edc_connection" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Tipe EDC</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan EDC Connection..." name="type_edc" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Regional</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Masukkan EDC Connection..." name="regional" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="select">Tipe</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom id="select" name="tipe">
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
              <CButton type="submit" size="sm" color="warning" onClick={handleDelete}>
                <CIcon name="cil-scrubber" /> Delete
              </CButton>
              <CButton type="submit" size="sm" className="float-right" color="success">
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
