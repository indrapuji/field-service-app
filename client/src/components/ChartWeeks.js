import React from 'react';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CProgress, CRow, CCallout } from '@coreui/react';

const ChartWeeks = (props) => {
  const {
    dataChart,
    dateData,
    jobOrderKunjunganCountProgress,
    jobOrderPickupCountProgress,
    jobOrderSurveyCountProgress,
    jobOrderRiskCountProgress,
  } = props;

  const renderChart = () => {
    if (dataChart) {
      const result = dataChart.map((data, idx) => {
        return (
          <div className="progress-group mb-4" key={idx}>
            <div className="progress-group-prepend">
              <span className="progress-group-text">{data.hari}</span>
            </div>
            <div className="progress-group-bars">
              <CProgress className="progress-xs" color="Kunjungan" value={data.jobOrderKunjunganCount ? data.jobOrderKunjunganCount : 0} />
              <CProgress className="progress-xs" color="Pickup" value={data.jobOrderPickupCount ? data.jobOrderPickupCount : 0} />
              <CProgress className="progress-xs" color="Survey" value={data.jobOrderSurveyCount ? data.jobOrderSurveyCount : 0} />
              <CProgress className="progress-xs" color="Risk" value={data.jobOrderRiskCount ? data.jobOrderRiskCount : 0} />
            </div>
          </div>
        );
      });
      return result;
    } else {
      return <></>;
    }
  };
  return (
    <>
      {dataChart && dateData && (
        <CCard>
          <CCardHeader>
            <h4 id="traffic" className="card-title mb-0">
              Progress Work Orders
            </h4>
            <div className="small text-muted">
              Week {dateData.dayOfWeek} / {dateData.month} {dateData.year}
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="3">
                <CCallout color="info">
                  <small className="text-muted">Kunjungan</small>
                  <br />
                  <strong className="h4">{jobOrderKunjunganCountProgress}</strong>
                </CCallout>
              </CCol>
              <CCol sm="3">
                <CCallout color="danger">
                  <small className="text-muted">Pickup Sales Draft</small>
                  <br />
                  <strong className="h4">{jobOrderPickupCountProgress}</strong>
                </CCallout>
              </CCol>
              <CCol sm="3">
                <CCallout color="primary">
                  <small className="text-muted">OTS Survey</small>
                  <br />
                  <strong className="h4">{jobOrderSurveyCountProgress}</strong>
                </CCallout>
              </CCol>
              <CCol sm="3">
                <CCallout color="warning">
                  <small className="text-muted">Risk Unit</small>
                  <br />
                  <strong className="h4">{jobOrderRiskCountProgress}</strong>
                </CCallout>
              </CCol>
            </CRow>

            <hr className="mt-0" />

            {renderChart()}
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
      )}
    </>
  );
};

export default ChartWeeks;
