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
  CInputCheckbox,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import newAlert from '../../../components/NewAlert';

const Register = () => {
  const history = useHistory();
  const [vendorsList, setVendorsList] = useState(null);
  const [tipe, setTipe] = useState(localStorage.getItem('tipe'));
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
    tipe: tipe === 'Super Admin' ? '' : 'Teknisi',
    vendor_id: '',
    foto_profil: null,
    privilege: [],
  });

  const [pass, setPass] = useState('');

  useEffect(() => {
    getVendorsList();
    setTipe(localStorage.getItem('tipe'));
  }, []);

  const getVendorsList = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + '/vendors',
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setVendorsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onCheck = (e) => {
    const { checked, value } = e.target;
    if (checked === true) {
      setFormData({ ...formData, privilege: formData.privilege.concat(value) });
    } else {
      const newData = formData.privilege.filter((x) => x !== value);
      setFormData({ ...formData, privilege: newData });
    }
  };

  const onCheckPass = (event) => {
    setPass(event.target.value);
  };

  const onFormChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      if (tipe === 'Super Admin') {
        setFormData((formData.gender = 'Others'));
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const { nama_lengkap, email, gender, alamat, nama_bank, no_rekening, no_telp, tgl_lahir, no_ktp, foto_profil, privilege } = formData;

      if (tipe === 'Super Admin') {
        if (formData.tipe === '' || nama_lengkap === '' || email === '' || privilege.length === 0) {
          console.log(formData.tipe);
          newAlert({ status: 'error', message: 'Isi Semua Form' });
          return;
        }
      } else {
        if (
          formData.tipe === '' ||
          nama_lengkap === '' ||
          email === '' ||
          gender === '' ||
          alamat === '' ||
          nama_bank === '' ||
          no_rekening === '' ||
          no_telp === '' ||
          tgl_lahir === '' ||
          no_ktp === '' ||
          foto_profil === ''
        ) {
          console.log(formData);
          newAlert({ status: 'error', message: 'Isi Semua Form' });
          return;
        }
      }
      const formDataTemp = { ...formData, privilege: JSON.stringify(formData.privilege) };
      console.log(formDataTemp);
      const newFormData = new FormData();
      for (let key in formDataTemp) {
        newFormData.append(key, formDataTemp[key]);
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
      if (error.response) {
        const { msg } = error.response.data;
        newAlert({ status: 'error', message: msg });
        console.log(error.response.data);
      } else {
        newAlert({ status: 'error', message: 'Internal Sever Error' });
      }
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CForm onSubmit={onFormSubmit}>
              <CCardHeader>Register New {tipe === 'Admin' ? 'User' : 'Admin'}</CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Vendor Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect name="vendor_id" onChange={onFormChange}>
                      <option value="0">Please select</option>
                      {vendorsList &&
                        vendorsList.data.map((data) => {
                          return (
                            <option key={data.id} value={data.id}>
                              {data.nama}
                            </option>
                          );
                        })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                {tipe !== 'Admin' ? (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Tipe</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect name="tipe" onChange={onFormChange}>
                        <option value="">Please select</option>
                        <option value="Client">Client</option>
                        <option value="Admin">Admin</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                ) : (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Tipe</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect custom id="select" name="tipe" disabled onChange={onFormChange}>
                        <option value="Teknisi">Teknisi</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                )}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput name="nama_lengkap" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" autoComplete="email" name="email" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="password"
                      autoComplete="new-password"
                      // valid={formData.password === '' ? false : pass === formData.password ? true : false}
                      name="test_password"
                      onChange={onCheckPass}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Repeat Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="password"
                      autoComplete="new-password"
                      valid={formData.password === '' ? false : pass === formData.password ? true : false}
                      name="password"
                      onChange={onFormChange}
                    />
                  </CCol>
                </CFormGroup>
                {tipe === 'Super Admin' && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Privilege</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox custom id="inline-checkbox1" value="Kunjungan" onChange={onCheck} />
                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">
                          Kunjungan
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox custom id="inline-checkbox2" value="Pickup" onChange={onCheck} />
                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">
                          Pickup Sales Draft
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox custom id="inline-checkbox3" value="Survey" onChange={onCheck} />
                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">
                          OTS Survey
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox custom id="inline-checkbox4" value="Risk" onChange={onCheck} />
                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox4">
                          Risk Unit
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                )}
                {tipe === 'Admin' && (
                  <>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Gender</CLabel>
                      </CCol>
                      <CCol md="9">
                        <CFormGroup variant="custom-radio" inline>
                          <CInputRadio custom id="inline-radio1" name="gender" value="Male" onChange={onFormChange} />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                            Male
                          </CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio" inline>
                          <CInputRadio custom id="inline-radio2" name="gender" value="Female" onChange={onFormChange} />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                            Female
                          </CLabel>
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="textarea-input">Address</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CTextarea rows="6" name="alamat" onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Bank Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput name="nama_bank" onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Rekening Number</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput name="no_rekening" onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Phone Number</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput name="no_telp" onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="date-input">Birthdate</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput type="date" id="date-input" name="tgl_lahir" onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">NIK</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput name="no_ktp" onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CLabel col md="3" htmlFor="file-input">
                        Picture
                      </CLabel>
                      <CCol xs="12" md="9">
                        <CInputFile id="file-input" name="foto_profil" onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>
                  </>
                )}
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="submit"
                  size="sm"
                  disabled={!formData.password ? true : pass === formData.password ? false : true}
                  color="primary"
                  className="float-right mb-3"
                >
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Register;
