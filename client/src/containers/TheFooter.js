import React from 'react';
import { CFooter } from '@coreui/react';

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="http://www.trendcom-intl.com" target="_blank" rel="noopener noreferrer">
          TrendCom 2020
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
