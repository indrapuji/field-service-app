import React from 'react';
import { CCard, CCardBody, CCardFooter, CCol, CProgress, CRow } from '@coreui/react';

import MainChartExample from './MainChartExample.js';

const ChartTrafic = (props) => {
  const {
    trafficData,
    merchantBuka,
    merchantTutup,
    merchantTetap,
    merchantPindah,
  } = props;
  return (
    <>
      {
        trafficData &&
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">
                  Traffic
                </h4>
                <div className="small text-muted">Januari 2021</div>
              </CCol>
            </CRow>
            <MainChartExample trafficData={trafficData} style={{ height: '300px', marginTop: '40px' }} />
          </CCardBody>
          <CCardFooter>
            <CRow className="text-center">
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Merchant Buka</div>
                <strong>{merchantBuka} Merchants ({((merchantBuka / (merchantBuka + merchantTutup))*100).toFixed(2)}%)</strong>
                <CProgress className="progress-xs mt-2" precision={1} color="success" value={30} />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Merchant Tutup</div>
                <strong>{merchantTutup} Merchants ({((merchantTutup / (merchantBuka + merchantTutup))*100).toFixed(2)}%)</strong>
                <CProgress className="progress-xs mt-2" precision={1} color="info" value={40} />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Merchant Tetap</div>
                <strong>{merchantTetap} Merchants ({((merchantTetap / (merchantTetap + merchantPindah))*100).toFixed(2)}%)</strong>
                <CProgress className="progress-xs mt-2" precision={1} color="warning" value={20} />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Merchant Pindah</div>
                <strong>{merchantPindah} Merchants ({((merchantPindah / (merchantTetap + merchantPindah))*100).toFixed(2)}%)</strong>
                <CProgress className="progress-xs mt-2" precision={1} color="danger" value={60} />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      }
    </>
  );
};

export default ChartTrafic;
