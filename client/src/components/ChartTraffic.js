import React from 'react';
import { CCard, CCardBody, CCardFooter, CCol, CProgress, CRow } from '@coreui/react';

import MainChartExample from './MainChartExample.js';

const ChartTrafic = () => {
  return (
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
        <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
      </CCardBody>
      <CCardFooter>
        <CRow className="text-center">
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-muted">Visits</div>
            <strong>29.703 Users (40%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} color="success" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            <div className="text-muted">Unique</div>
            <strong>24.093 Users (20%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} color="info" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-muted">Pageviews</div>
            <strong>78.706 Views (60%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} color="warning" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-muted">New Users</div>
            <strong>22.123 Users (80%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} color="danger" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            <div className="text-muted">Bounce Rate</div>
            <strong>Average Rate (40.15%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} value={40} />
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
  );
};

export default ChartTrafic;