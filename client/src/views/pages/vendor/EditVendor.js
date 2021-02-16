import React, { useState, useEffect } from 'react';
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
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import newAlert from '../../../components/NewAlert';
import Swal from 'sweetalert2';

const RegisterVendor = () => {
  const { vendorId } = useParams();
  const history = useHistory();
  const [edit, setEdit] = useState({});

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${HostUrl}/vendors/single/${vendorId}`,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(({ data }) => {
        setEdit({
          nama: data.nama,
          alamat: data.alamat,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  const onFormChange = (event) => {
    const { value, name } = event.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };
  const submitForm = async (event) => {
    try {
      event.preventDefault();
      const { nama, alamat } = edit;
      if (nama === '' || alamat === '') {
        newAlert({ status: 'error', message: 'Isi Semua Form' });
        return;
      }
      await axios({
        method: 'PUT',
        url: HostUrl + `/vendors/edit/${vendorId}`,
        data: edit,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      newAlert({ status: 'success', message: 'Berhasil' });
      history.push('/vendors');
    } catch (error) {
      const { msg } = error.response.data;
      newAlert({ status: 'error', message: msg });
      console.log(error.response.data);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are You Sure?',
      text: `${edit.nama}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios({
            method: 'DELETE',
            url: `${HostUrl}/vendors/delete/${vendorId}`,
            headers: {
              token: localStorage.getItem('token'),
            },
          });
          newAlert({ status: 'success', message: 'Deleted' });
          history.push('/vendors');
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
        <CCol xs="12" md="10">
          <CCard>
            <CForm onSubmit={submitForm}>
              <CCardHeader>Edit Vendor</CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Vendor Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="nama" value={edit.nama} onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Vendor Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea rows="6" name="alamat" value={edit.alamat} onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
              </CCardBody>
              <CCardFooter>
                <CButton size="sm" color="danger" className="float-left" onClick={handleDelete}>
                  <CIcon name="cil-scrubber" /> Delete
                </CButton>
                <CButton type="submit" size="sm" color="primary" className="float-right mb-3" onClick={submitForm}>
                  <CIcon name="cil-scrubber" /> Update
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
