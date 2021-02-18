import React from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';

const brandSuccess = getStyle('success') || '#4dbd74';
const brandInfo = getStyle('info') || '#20a8d8';
const brandDanger = getStyle('danger') || '#f86c6b';

const MainChartExample = (props) => {
  const { trafficData } = props;

  const defaultDatasets = (() => {
    const merchantBuka = trafficData.map(data => {
      return data.merchantBuka;
    });
    const merchantTutup = trafficData.map(data => {
      return data.merchantTutup;
    });
    const merchantTetap = trafficData.map(data => {
      return data.merchantTetap;
    });
    const merchantPindah = trafficData.map(data => {
      return data.merchantPindah;
    });
    return [
      {
        label: 'Merchant Buka',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: merchantBuka,
      },
      {
        label: 'Merchant Tutup',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: merchantTutup,
      },
      {
        label: 'Merchant Tetap',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: merchantTetap,
      },
      {
        label: 'Merchant Pindah',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: merchantPindah,
      },
    ];
  })();

  const labels = () => {
    return trafficData.map(data => data.day);
  }

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 20, // MAX NYA GANTI KLO KEPENDEKAN
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <>
      {
        trafficData &&
        <CChartLine
          style={{ height: '300px', marginTop: '40px' }}
          datasets={defaultDatasets}
          options={defaultOptions}
          labels={trafficData.map(data => data.day)}
        />
      }
    </>
  );
};

export default MainChartExample;
