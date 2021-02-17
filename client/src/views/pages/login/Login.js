import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
  // CFormGroup,
  // CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import newAlert from '../../../components/NewAlert';
import Trendcom from '../../../assets/Images/trendcom-logo.png';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showInvalid, setShowInvalid] = useState(false);

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios({
        method: 'POST',
        url: HostUrl + '/users/login',
        data: formData,
      });
      if (data.tipe !== 'Teknisi') {
        console.log(data);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('tipe', data.tipe);
        localStorage.setItem('image', data.userData.foto_profil);
        newAlert({ status: 'success', message: 'Berhasil' });
        history.push('/');
      } else {
        newAlert({ status: 'error', message: 'Not Authorize' });
      }
    } catch (error) {
      setShowInvalid(true);
      const { msg } = error.response.data;
      newAlert({ status: 'error', message: msg });
      console.log(error.response.data);
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4 loginCard">
                <p></p>
                <CImg src={Trendcom} align="center" height={50} />
                <p></p>
                <CCardBody>
                  <CForm action="" method="post" onSubmit={onFormSubmit}>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        invalid={showInvalid && formData.email === '' ? true : false}
                        placeholder="email"
                        autoComplete="email"
                        name="email"
                        onChange={onFormChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        invalid={showInvalid && formData.password === '' ? true : false}
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={onFormChange}
                      />
                    </CInputGroup>
                    <CButton color="primary" size="lg" block type="submit">
                      Login
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
