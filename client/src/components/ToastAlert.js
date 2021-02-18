import React from 'react';
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react';

const ToastAlert = (props) => {
  const { item } = props;
  const color = ['#80ffdb', '#e9b0df', '#ff577f', '#6930c3'];
  return (
    <CToaster position="top-right">
      <CToast
        show={true}
        autohide={1000}
        fade
        style={{
          backgroundColor: item.tipe === 'Kunjungan' ? color[0] : item.tipe === 'Pickup' ? color[1] : item.tipe === 'Survey' ? color[2] : color[3],
        }}
      >
        <CToastHeader closeButton>{item.merchant}</CToastHeader>
        <CToastBody>{item.alamat}</CToastBody>
      </CToast>
    </CToaster>
  );
};

export default ToastAlert;
