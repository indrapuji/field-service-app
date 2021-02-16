import React from 'react';
import { CRow, CCol, CButton, CCard, CCardBody, CDataTable, CPagination } from '@coreui/react';

const ListUser = (props) => {
  const { jobOrderData, getWorkOrder, setNewAssign, newAssign } = props;
  const fields = [
    { key: 'merchant', label: 'Merchant', _style: { width: '10%' } },
    { key: 'alamat', label: 'Alamat', _style: { width: '10%' } },
    { key: 'no_telp', label: 'Telepon', _style: { width: '10%' } },
    { key: 'regional', label: 'Regional', _style: { width: '10%' } },
    { key: 'mid', label: 'MID', _style: { width: '10%' } },
    { key: 'tipe', label: 'Tipe', _style: { width: '10%' } },
    { key: 'status', label: 'Status', _style: { width: '10%' } },
    { key: 'assign', label: 'Action', _style: { width: '5%' } },
  ];

  const changePage = (page) => {
    getWorkOrder(page);
  };

  const handleAssign = (item) => {
    const newData = newAssign.concat(item);
    setNewAssign(newData);
    getWorkOrder(jobOrderData.currentPage, newData);
  };
  return (
    <>
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
                      status: (item, index) => {
                        return <td>{!item.status ? 'Unassign' : 'assign'}</td>;
                      },
                      assign: (item, index) => {
                        return (
                          <td>
                            <CButton
                              color="success"
                              size="sm"
                              onClick={() => {
                                handleAssign(item);
                              }}
                            >
                              Assign
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
    </>
  );
};

export default ListUser;
