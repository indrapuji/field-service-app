import React, { useState } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CFormGroup,
  CForm,
  CLabel,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CInputFile,
  CCardFooter,
  CBadge,
  CSpinner,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import newAlert from '../../../components/NewAlert';
import { formatDate } from 'node-format-date';

const ImportCompany = () => {
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    data: '',
  });
  const [show, setShow] = useState(false);
  const [dataWO, setDataWO] = useState({});
  const [loading, setLoading] = useState(false);

  const getBadge = (status) => {
    switch (status) {
      case 0:
        return 'success';
      case 1:
        return 'warning';
      case 2:
        return 'danger';
      default:
        return 'primary';
    }
  };

  const history = useHistory();
  const onFormChange = (event) => {
    const { files, name } = event.target;
    setFileName(event.target.files[0].name);
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  const submitForm = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      if (formData.data === '') {
        setLoading(false);
        newAlert({ status: 'error', message: 'Tidak ada file' });
        return;
      }
      const newFormData = new FormData();
      for (let key in formData) {
        newFormData.append(`${key}`, formData[key]);
      }
      const { data } = await axios({
        method: 'POST',
        url: HostUrl + '/job-orders/check-seed',
        data: newFormData,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setLoading(false);
      setDataWO(data);
      setShow(true);
    } catch (error) {
      setLoading(false);
      newAlert({ status: 'error', message: 'Failed' });
    }
  };

  const submitFile = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      await axios({
        method: 'POST',
        url: HostUrl + '/job-orders/create-seed',
        data: {
          data: dataWO.data,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setLoading(false);
      setShow(false);
      newAlert({ status: 'success', message: 'Berhasil' });
      history.push('/workorders/all');
    } catch (err) {
      setLoading(false);
      newAlert({ status: 'error', message: 'Failed' });
    }
  };
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>Import Workorders</strong>
              {loading && <CSpinner color="success" size="sm" className="float-right" />}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>File input</CLabel>
                  </CCol>
                  <CCol md="7">
                    <CInputFile custom name="data" onChange={onFormChange} />
                    <CLabel variant="custom-file">{!fileName ? 'Choose file...' : fileName}</CLabel>
                  </CCol>
                  <CCol md="2">
                    <CButton type="submit" size="sm" color="primary" disabled={loading ? true : false} onClick={submitForm}>
                      <CIcon name="cil-scrubber" /> upload
                    </CButton>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {show && (
        <CRow className="justify-content-center">
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>File Import</strong>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={submitFile}>
                  <CFormGroup row>
                    <CCol md="1">
                      <CLabel>
                        <small>No</small>
                      </CLabel>
                    </CCol>
                    <CCol md="2">
                      <CLabel>
                        <small>Merchant </small>
                      </CLabel>
                    </CCol>
                    <CCol md="3">
                      <CLabel>
                        <small>Alamat</small>
                      </CLabel>
                    </CCol>
                    <CCol md="3">
                      <CLabel>
                        <small>Tipe</small>
                      </CLabel>
                    </CCol>
                    <CCol md="3">
                      <CLabel>
                        <small>Catatan</small>
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  {dataWO.data &&
                    dataWO.data.map((item) => {
                      return (
                        <CFormGroup row key={item.no}>
                          <CCol md="1">
                            <CLabel>
                              <small>{item.no}</small>
                            </CLabel>
                          </CCol>
                          <CCol md="2">
                            <CLabel>
                              <small>{item.merchant}</small>
                            </CLabel>
                          </CCol>
                          <CCol md="3">
                            <CLabel>
                              <small>{item.alamat}</small>
                            </CLabel>
                          </CCol>
                          <CCol md="3">
                            <CLabel>
                              <small>{item.tipe}</small>
                            </CLabel>
                          </CCol>
                          <CCol md="3">
                            <CLabel>
                              <small>{item.catatan}</small>
                            </CLabel>
                          </CCol>
                        </CFormGroup>
                      );
                    })}

                  <CCardFooter>
                    <CButton type="submit" size="sm" color="success" className="float-right" disabled={loading ? true : false} onClick={submitFile}>
                      {loading ? <CSpinner color="success" size="sm" /> : <CIcon name="cil-scrubber" />}
                      import
                    </CButton>
                  </CCardFooter>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
};

export default ImportCompany;
