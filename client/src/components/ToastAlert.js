import React from 'react';
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react';

const ToastAlert = (props) => {
  const { item } = props;

  return (
    <CToaster position="bottom-left">
      <CToast show={true} autohide={1000} fade color={item.tipe}>
        <CToastHeader closeButton>{item.merchant}</CToastHeader>
        <CToastBody>{item.alamat}</CToastBody>
      </CToast>
    </CToaster>
  );
};

export default ToastAlert;
