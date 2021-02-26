import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
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
  CInputRadio,
  CCollapse,
  CDataTable,
  CBadge,
  CPagination,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import HostUrl from '../../../components/HostUrl';
import newAlert from '../../../components/NewAlert';
import Swal from 'sweetalert2';

const getBadge = (status) => {
  switch (status) {
    case 'Done':
      return 'success';
    case 'Assign':
      return 'warning';
    default:
      return 'secondary';
  }
};

const EditUsers = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [edit, setEdit] = useState({});
  const [vendor, setVendor] = useState('');
  const [tipe, setTipe] = useState(localStorage.getItem('tipe'));
  const [accordion, setAccordion] = useState(tipe === 'Super Admin' ? 0 : 1);
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [jobOrderData, setJobOrderData] = useState(null);

  useEffect(() => {
    setTipe(localStorage.getItem('tipe'));
    getWorkOrder(1);
    axios({
      method: 'GET',
      url: `${HostUrl}/users/single/${userId}`,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(({ data }) => {
        setEdit(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${HostUrl}/vendors/single/${edit.vendor_id}`,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(({ data }) => {
        setVendor(data.nama);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [edit]);

  const handleDelete = () => {
    Swal.fire({
      title: 'Are You Sure?',
      text: `${edit.nama_lengkap}`,
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
            url: `${HostUrl}/users/delete/${userId}`,
            headers: {
              token: localStorage.getItem('token'),
            },
          });
          newAlert({ status: 'success', message: 'Deleted' });
          history.push('/users');
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

  const changePage = (page) => {
    getWorkOrder(page);
  };

  const fields = ['merchant', 'alamat', 'no_telp', 'tipe', 'regional', 'mid', 'tid', 'status', 'remove'];

  const getWorkOrder = async (page) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: HostUrl + `/job-orders/all?teknisi_id=${userId}&page=` + page,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setJobOrderData(data);
      console.log(data);
    } catch (err) {
      console.log('ERROR');
      console.log(err);
    }
  };
  console.log(edit.tipe);

  const handleRemove = async (id) => {
    Swal.fire({
      title: 'Are You Sure?',
      text: `Are You Sure You Want To Remove This?`,
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
            url: HostUrl + `/job-orders/remove/${id}`,
            headers: {
              token: localStorage.getItem('token'),
            },
          });
          newAlert({ status: 'success', message: 'Deleted' });
          getWorkOrder(1);
        } catch (err) {
          console.log(err);
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
            <CForm>
              <CCardHeader>
                <CButton block color="link" className="text-left m-0 p-0" onClick={() => setAccordion(accordion === 0 ? null : 0)}>
                  <h5 style={{ color: 'white' }}>Detail User</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={accordion === 0}>
                <CCardBody>
                  {edit.foto_profil && (
                    <CRow className="justify-content-center">
                      <CImg src={edit.foto_profil} style={{ width: 150, marginBottom: 20, borderRadius: 20 }} />
                    </CRow>
                  )}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Vendor Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput disabled value={vendor} />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Tipe</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput disabled value={edit.tipe} />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput disabled value={edit.nama_lengkap} />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput disabled value={edit.email} />
                    </CCol>
                  </CFormGroup>
                  {edit.user_privileges && edit.user_privileges.length > 0 && (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Privilege</CLabel>
                      </CCol>
                      {edit.user_privileges.map((item, idx) => {
                        return (
                          <CCol xs="12" md="2">
                            <CInput disabled value={item.name} />
                          </CCol>
                        );
                      })}
                    </CFormGroup>
                  )}
                  {edit.tipe === 'Teknisi' && (
                    <>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Gender</CLabel>
                        </CCol>
                        <CCol md="9">
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio custom id="inline-radio1" disabled checked={edit.gender === 'Male' ? true : false} />
                            <CLabel variant="custom-checkbox">Male</CLabel>
                          </CFormGroup>
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio custom id="inline-radio2" disabled checked={edit.gender === 'Female' ? true : false} />
                            <CLabel variant="custom-checkbox">Female</CLabel>
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Address</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea disabled rows="6" value={edit.alamat} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Bank Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput disabled value={edit.nama_bank} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Rekening Number</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput disabled value={edit.no_rekening} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Phone Number</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput disabled value={edit.no_telp} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Birthdate</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput disabled type="date" id="date-input" value={edit.tgl_lahir} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>NIK</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput disabled value={edit.no_ktp} />
                        </CCol>
                      </CFormGroup>
                    </>
                  )}
                </CCardBody>
                <CCardFooter>
                  <CButton size="sm" color="danger" className="float-left" onClick={handleDelete}>
                    <CIcon name="cil-scrubber" /> Hapus
                  </CButton>
                  <CButton to="/users" size="sm" color="primary" className="float-right mb-3">
                    <CIcon name="cil-scrubber" /> Back
                  </CButton>
                </CCardFooter>
              </CCollapse>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
      {tipe !== 'Super Admin' && (
        <CRow className="justify-content-center">
          <CCol xs="12" md="12">
            <CCard>
              {jobOrderData && (
                <>
                  <CCardBody>
                    <CDataTable
                      items={jobOrderData.data}
                      fields={fields}
                      hover
                      striped
                      bordered
                      size="sm"
                      scopedSlots={{
                        status: (item) => (
                          <td>
                            <CBadge color={getBadge(item.status)}>{!item.status ? 'Un-Assign' : item.status}</CBadge>
                          </td>
                        ),
                        remove: (item, index) => {
                          return (
                            <td>
                              <CButton
                                color="danger"
                                size="sm"
                                onClick={() => {
                                  handleRemove(item.id);
                                }}
                              >
                                Remove
                              </CButton>
                            </td>
                          );
                        },
                      }}
                    />
                    <CPagination activePage={jobOrderData.currentPage} pages={jobOrderData.pages} onActivePageChange={changePage} />
                  </CCardBody>
                </>
              )}
            </CCard>
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
};

export default EditUsers;
