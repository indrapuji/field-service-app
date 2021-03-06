import React from 'react';
import { CWidgetDropdown, CRow, CCol } from '@coreui/react';
import ChartLineSimple from './ChartLineSimple';
import ChartBarSimple from './ChartBarSimple';

const WidgetsDropdown = (props) => {
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header="9.823"
          text="Kunjungan"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header="9.823"
          text="Pickup Sales Draft"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header="9.823"
          text="OTS Survey"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: '70px' }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Risk Unit"
          footerSlot={
            <ChartBarSimple className="mt-3 mx-3" style={{ height: '70px' }} backgroundColor="rgb(250, 152, 152)" label="Members" labels="months" />
          }
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
