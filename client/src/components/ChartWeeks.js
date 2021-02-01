import React from 'react';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CProgress, CRow, CCallout } from '@coreui/react';

const ChartWeeks = () => {
  return (
    <CCard>
      <CCardHeader>
        <h4 id="traffic" className="card-title mb-0">
          Progress Work Orders
        </h4>
        <div className="small text-muted">Week 1 / Januari 2021</div>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="3">
            <CCallout color="info">
              <small className="text-muted">Kunjungan</small>
              <br />
              <strong className="h4">9,123</strong>
            </CCallout>
          </CCol>
          <CCol sm="3">
            <CCallout color="danger">
              <small className="text-muted">Pickup Sales Draft</small>
              <br />
              <strong className="h4">22,643</strong>
            </CCallout>
          </CCol>
          <CCol sm="3">
            <CCallout color="primary">
              <small className="text-muted">OTS Survey</small>
              <br />
              <strong className="h4">9,123</strong>
            </CCallout>
          </CCol>
          <CCol sm="3">
            <CCallout color="warning">
              <small className="text-muted">Risk Unit</small>
              <br />
              <strong className="h4">22,643</strong>
            </CCallout>
          </CCol>
        </CRow>

        <hr className="mt-0" />

        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">Monday</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="34" />
            <CProgress className="progress-xs" color="danger" value="78" />
            <CProgress className="progress-xs" color="primary" value="8" />
            <CProgress className="progress-xs" color="warning" value="89" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">Tuesday</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="56" />
            <CProgress className="progress-xs" color="danger" value="94" />
            <CProgress className="progress-xs" color="primary" value="8" />
            <CProgress className="progress-xs" color="warning" value="89" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">Wednesday</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="12" />
            <CProgress className="progress-xs" color="danger" value="67" />
            <CProgress className="progress-xs" color="primary" value="18" />
            <CProgress className="progress-xs" color="warning" value="29" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">Thursday</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="43" />
            <CProgress className="progress-xs" color="danger" value="91" />
            <CProgress className="progress-xs" color="primary" value="82" />
            <CProgress className="progress-xs" color="warning" value="9" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">Friday</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="22" />
            <CProgress className="progress-xs" color="danger" value="73" />
            <CProgress className="progress-xs" color="primary" value="38" />
            <CProgress className="progress-xs" color="warning" value="69" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">Saturday</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="53" />
            <CProgress className="progress-xs" color="danger" value="82" />
            <CProgress className="progress-xs" color="primary" value="87" />
            <CProgress className="progress-xs" color="warning" value="9" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">Sunday</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="9" />
            <CProgress className="progress-xs" color="danger" value="69" />
            <CProgress className="progress-xs" color="primary" value="85" />
            <CProgress className="progress-xs" color="warning" value="76" />
          </div>
        </div>
        <div className="legend text-center">
          <small>
            <sup className="px-1">
              <CBadge shape="pill" color="info">
                &nbsp;
              </CBadge>
            </sup>
            Kunjungan &nbsp;
            <sup className="px-1">
              <CBadge shape="pill" color="danger">
                &nbsp;
              </CBadge>
            </sup>
            Pick Up Sales Draft &nbsp;
            <sup className="px-1">
              <CBadge shape="pill" color="primary">
                &nbsp;
              </CBadge>
            </sup>
            OTS Survey &nbsp;
            <sup className="px-1">
              <CBadge shape="pill" color="warning">
                &nbsp;
              </CBadge>
            </sup>
            Risk Unit
          </small>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default ChartWeeks;
